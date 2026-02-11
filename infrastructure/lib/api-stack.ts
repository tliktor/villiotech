import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

export interface ApiStackProps extends cdk.StackProps {
  recipientEmail?: string;
  senderEmail?: string;
  allowedOrigin?: string;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: ApiStackProps) {
    super(scope, id, props);

    // DynamoDB table for rate limiting
    const rateLimitTable = new dynamodb.Table(this, 'ContactRateLimit', {
      tableName: 'ContactRateLimit',
      partitionKey: { name: 'ip', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'ttl',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // IAM role for Lambda with SES permissions
    const lambdaRole = new iam.Role(this, 'ContactLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
      inlinePolicies: {
        SESPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['ses:SendEmail', 'ses:SendRawEmail'],
              resources: ['*'],
            }),
          ],
        }),
        DynamoDBPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['dynamodb:GetItem', 'dynamodb:PutItem'],
              resources: [rateLimitTable.tableArn],
            }),
          ],
        }),
      },
    });

    // Lambda function
    const contactFunction = new lambda.Function(this, 'ContactFunction', {
      functionName: 'villiotech-contact-handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../backend/dist/contact'),
      role: lambdaRole,
      environment: {
        RECIPIENT_EMAIL: props?.recipientEmail || '',
        SENDER_EMAIL: props?.senderEmail || '',
        ALLOWED_ORIGIN: props?.allowedOrigin || '',
      },
    });

    // HTTP API Gateway
    const api = new apigateway.HttpApi(this, 'ContactApi', {
      corsPreflight: {
        allowOrigins: [props?.allowedOrigin || '*'],
        allowMethods: [apigateway.CorsHttpMethod.POST],
        allowHeaders: ['Content-Type'],
      },
    });

    // Lambda integration
    const lambdaIntegration = new integrations.HttpLambdaIntegration('ContactIntegration', contactFunction);

    // Add route
    api.addRoutes({
      path: '/contact',
      methods: [apigateway.HttpMethod.POST],
      integration: lambdaIntegration,
    });

    // CloudWatch Alarms for Lambda
    new cloudwatch.Alarm(this, 'ContactLambdaErrorAlarm', {
      alarmName: 'villiotech-contact-lambda-errors',
      metric: contactFunction.metricErrors({
        period: cdk.Duration.minutes(5),
      }),
      threshold: 5,
      evaluationPeriods: 1,
    });

    new cloudwatch.Alarm(this, 'ContactLambdaDurationAlarm', {
      alarmName: 'villiotech-contact-lambda-duration',
      metric: contactFunction.metricDuration({
        period: cdk.Duration.minutes(5),
      }),
      threshold: 3000,
      evaluationPeriods: 1,
    });

    // Add tags
    cdk.Tags.of(this).add('app', 'villiotech');

    // Output
    new cdk.CfnOutput(this, 'ApiGatewayUrl', {
      value: api.apiEndpoint,
      description: 'API Gateway endpoint URL',
    });
  }
}