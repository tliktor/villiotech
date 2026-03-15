# Villiotech

![Deploy Status](https://github.com/tliktor/villiotech/actions/workflows/deploy.yml/badge.svg)

Serverless React application built on AWS infrastructure.

## Tech Stack

- **Frontend**: React 19 + Vite 7 + TypeScript + DaisyUI 5
- **Backend**: AWS Lambda (Node.js 22) + API Gateway
- **Hosting**: S3 + CloudFront
- **Infrastructure**: AWS CDK

## Project Structure

```
villiotech/
├── frontend/          # React application
├── backend/           # Lambda functions
├── infrastructure/    # AWS CDK stacks
├── content/           # Website content (markdown)
└── memory-bank/       # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 22+
- AWS CLI configured

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

## Deployment

Push to `main` branch triggers automatic deployment via GitHub Actions.

### Infrastructure (CDK)

```bash
cd infrastructure && npx cdk deploy --all
```

## Live URLs

- **Production**: https://villiotech.hu
