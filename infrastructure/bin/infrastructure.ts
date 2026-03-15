#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { StaticSiteStack } from '../lib/static-site-stack';
import { ApiStack } from '../lib/api-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'eu-central-1',
};

new StaticSiteStack(app, 'VilliotechStaticSite', { env });
new ApiStack(app, 'VilliotechApi', { 
  env,
  recipientEmail: app.node.tryGetContext('recipientEmail'),
  senderEmail: app.node.tryGetContext('senderEmail'),
  allowedOrigin: app.node.tryGetContext('allowedOrigin'),
});
