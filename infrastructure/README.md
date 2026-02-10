# Villiotech Infrastructure

AWS CDK infrastructure-as-code for the Villiotech serverless React application.

## Prerequisites

- Node.js 20+
- AWS CLI configured with `nntech-developer` profile
- AWS CDK CLI: `npm install -g aws-cdk`

## Setup

```bash
npm install
```

## Environment Variables

Pass environment variables using CDK context:

```bash
# Deploy with environment variables
cdk deploy --all --profile nntech-developer \
  -c recipientEmail="your-email@example.com" \
  -c senderEmail="noreply@yourdomain.com" \
  -c allowedOrigin="https://your-cloudfront-domain.com"
```

## Deployment

### Bootstrap CDK (first time only)

```bash
cdk bootstrap --profile nntech-developer
```

### Deploy Infrastructure

```bash
# Deploy both stacks
cdk deploy --all --profile nntech-developer

# Deploy specific stack
cdk deploy VilliotechStaticSite --profile nntech-developer
cdk deploy VilliotechApi --profile nntech-developer
```

### Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile
- `cdk diff --profile nntech-developer` - Compare deployed stack with current state
- `cdk synth` - Emit synthesized CloudFormation template
- `cdk destroy --all --profile nntech-developer` - Destroy all stacks

## Stacks

### VilliotechStaticSite
- S3 bucket for static website hosting
- CloudFront distribution with Origin Access Control
- Custom error responses for SPA routing

### VilliotechApi
- Lambda function for contact form handling
- HTTP API Gateway with CORS
- IAM role with SES permissions

## Outputs

After deployment, the stacks will output:
- CloudFront distribution domain name
- S3 bucket name
- API Gateway endpoint URL