#!/bin/bash
set -e

# Villiotech Backend Deployment Script
# This script deploys the Lambda function and API Gateway for the contact form

PROFILE="nntech-developer"
REGION="eu-central-1"
FUNCTION_NAME="villiotech-contact-handler"
ROLE_NAME="villiotech-contact-lambda-role"
API_NAME="villiotech-contact-api"

echo "🚀 Deploying Villiotech Backend..."
echo ""

# Step 1: Create IAM Role
echo "📋 Step 1: Creating IAM role..."
ROLE_ARN=$(aws iam create-role \
  --role-name $ROLE_NAME \
  --assume-role-policy-document file://backend/deploy/lambda-trust-policy.json \
  --tags Key=app,Value=villiotech \
  --profile $PROFILE \
  --query 'Role.Arn' \
  --output text 2>/dev/null || aws iam get-role --role-name $ROLE_NAME --profile $PROFILE --query 'Role.Arn' --output text)

echo "✅ Role ARN: $ROLE_ARN"

# Step 2: Attach permissions policy
echo ""
echo "📋 Step 2: Attaching permissions policy..."
aws iam put-role-policy \
  --role-name $ROLE_NAME \
  --policy-name villiotech-contact-permissions \
  --policy-document file://backend/deploy/lambda-permissions-policy.json \
  --profile $PROFILE

echo "✅ Permissions attached"

# Wait for IAM role to propagate
echo ""
echo "⏳ Waiting 10 seconds for IAM role to propagate..."
sleep 10

# Step 3: Build and package Lambda function
echo ""
echo "📦 Step 3: Building and packaging Lambda function..."
cd backend
npm install
npm run build
cd dist/contact
npm install --omit=dev --production
rm -f ../../../function.zip
zip -r ../../../function.zip .
cd ../../..

echo "✅ Lambda package created: function.zip"

# Step 4: Create/Update Lambda function
echo ""
echo "📋 Step 4: Deploying Lambda function..."

# Check if function exists
if aws lambda get-function --function-name $FUNCTION_NAME --profile $PROFILE --region $REGION &>/dev/null; then
  echo "Function exists, updating code..."
  aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --profile $PROFILE \
    --region $REGION
  
  echo "Updating configuration..."
  aws lambda update-function-configuration \
    --function-name $FUNCTION_NAME \
    --runtime nodejs24.x \
    --handler index.handler \
    --timeout 10 \
    --memory-size 256 \
    --environment "Variables={RECIPIENT_EMAIL=info@villiotech.hu,SENDER_EMAIL=noreply@villiotech.hu,ALLOWED_ORIGIN=https://d1wsqe7tpbsupy.cloudfront.net}" \
    --profile $PROFILE \
    --region $REGION
else
  echo "Creating new function..."
  aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime nodejs24.x \
    --role $ROLE_ARN \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --timeout 10 \
    --memory-size 256 \
    --environment "Variables={RECIPIENT_EMAIL=info@villiotech.hu,SENDER_EMAIL=noreply@villiotech.hu,ALLOWED_ORIGIN=https://d1wsqe7tpbsupy.cloudfront.net}" \
    --tags app=villiotech \
    --profile $PROFILE \
    --region $REGION
fi

FUNCTION_ARN=$(aws lambda get-function --function-name $FUNCTION_NAME --profile $PROFILE --region $REGION --query 'Configuration.FunctionArn' --output text)
echo "✅ Lambda deployed: $FUNCTION_ARN"

# Clean up
rm function.zip

# Step 5: Create API Gateway HTTP API
echo ""
echo "📋 Step 5: Creating API Gateway..."

# Check if API exists
API_ID=$(aws apigatewayv2 get-apis --profile $PROFILE --region $REGION --query "Items[?Name=='$API_NAME'].ApiId" --output text)

if [ -z "$API_ID" ]; then
  echo "Creating new API..."
  API_ID=$(aws apigatewayv2 create-api \
    --name $API_NAME \
    --protocol-type HTTP \
    --cors-configuration "AllowOrigins=https://d1wsqe7tpbsupy.cloudfront.net,AllowMethods=POST,OPTIONS,AllowHeaders=Content-Type" \
    --tags app=villiotech \
    --profile $PROFILE \
    --region $REGION \
    --query 'ApiId' \
    --output text)
  echo "✅ API created: $API_ID"
else
  echo "✅ API already exists: $API_ID"
fi

# Create integration
echo "Creating Lambda integration..."
INTEGRATION_ID=$(aws apigatewayv2 create-integration \
  --api-id $API_ID \
  --integration-type AWS_PROXY \
  --integration-uri $FUNCTION_ARN \
  --payload-format-version 2.0 \
  --profile $PROFILE \
  --region $REGION \
  --query 'IntegrationId' \
  --output text 2>/dev/null || aws apigatewayv2 get-integrations --api-id $API_ID --profile $PROFILE --region $REGION --query 'Items[0].IntegrationId' --output text)

echo "✅ Integration created: $INTEGRATION_ID"

# Create route
echo "Creating POST /contact route..."
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key "POST /contact" \
  --target "integrations/$INTEGRATION_ID" \
  --profile $PROFILE \
  --region $REGION 2>/dev/null || echo "Route already exists"

# Create $default stage
echo "Creating $default stage..."
aws apigatewayv2 create-stage \
  --api-id $API_ID \
  --stage-name '$default' \
  --auto-deploy \
  --tags app=villiotech \
  --profile $PROFILE \
  --region $REGION 2>/dev/null || echo "Stage already exists"

# Grant API Gateway permission to invoke Lambda
echo "Granting API Gateway invoke permission..."
aws lambda add-permission \
  --function-name $FUNCTION_NAME \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$REGION:335716056515:$API_ID/*/*/contact" \
  --profile $PROFILE \
  --region $REGION 2>/dev/null || echo "Permission already exists"

# Get API endpoint
API_ENDPOINT=$(aws apigatewayv2 get-api --api-id $API_ID --profile $PROFILE --region $REGION --query 'ApiEndpoint' --output text)

echo ""
echo "✅ API Gateway deployed!"
echo "📍 API Endpoint: $API_ENDPOINT/contact"

# Step 6: Create .env.production
echo ""
echo "📋 Step 6: Creating frontend/.env.production..."
cat > frontend/.env.production << EOF
VITE_CONTACT_API_URL=$API_ENDPOINT/contact
EOF

echo "✅ .env.production created"

echo ""
echo "🎉 Backend deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Verify email addresses in SES (sandbox mode):"
echo "   aws ses verify-email-identity --email-address info@villiotech.hu --profile $PROFILE --region $REGION"
echo "   aws ses verify-email-identity --email-address noreply@villiotech.hu --profile $PROFILE --region $REGION"
echo ""
echo "2. Rebuild and redeploy frontend:"
echo "   cd frontend && npx vite build"
echo "   aws s3 sync dist/ s3://villiotech-website/ --delete --profile $PROFILE"
echo "   aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths '/*' --profile $PROFILE"
echo ""
echo "3. Test the contact form on: https://d1wsqe7tpbsupy.cloudfront.net/kapcsolat"
