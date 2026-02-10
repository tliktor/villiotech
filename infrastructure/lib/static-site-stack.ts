import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class StaticSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for static website
    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'villiotech-website',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Origin Access Control
    const oac = new cloudfront.S3OriginAccessControl(this, 'OAC', {
      originAccessControlName: 'villiotech-oac',
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket, { originAccessControl: oac }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    });

    // Add tags
    cdk.Tags.of(this).add('app', 'villiotech');

    // Outputs
    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value: distribution.distributionDomainName,
      description: 'CloudFront distribution domain name',
    });

    new cdk.CfnOutput(this, 'S3BucketName', {
      value: bucket.bucketName,
      description: 'S3 bucket name for static website',
    });
  }
}