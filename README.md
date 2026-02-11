# Villiotech

![Deploy Status](https://github.com/tliktor/villiotech/actions/workflows/deploy.yml/badge.svg)

Serverless React application built on AWS infrastructure.

## Tech Stack

- **Frontend**: React 19 + Vite 7 + TypeScript + DaisyUI 5
- **Backend**: AWS Lambda + API Gateway
- **Hosting**: S3 + CloudFront
- **AWS Account**: nntech-developer (335716056515)

## Project Structure

```
villiotech/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   └── SEO.tsx           # Enhanced SEO component
│   │   ├── config/
│   │   │   └── seo.ts            # SEO configuration (HU/EN)
│   │   ├── hooks/
│   │   │   └── useSEO.ts         # SEO hook
│   │   └── pages/                # All pages with SEO
│   ├── public/
│   │   ├── robots.txt            # Search engine rules
│   │   └── sitemap.xml           # Site structure
│   ├── SEO.md                    # SEO documentation
│   └── SEO_COMPLETE.md           # Implementation report
├── backend/           # Lambda functions
├── infrastructure/    # AWS CDK code (planned)
├── content/          # Website content (markdown)
├── memory-bank/      # Project documentation
└── check-seo.sh      # SEO status checker
```

## Getting Started

### Prerequisites

- Node.js 20+
- AWS CLI configured with `nntech-developer` profile

### Installation

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### Development

```bash
# Start frontend dev server
cd frontend && npm run dev
```

## Deployment

### Manual Deployment

```bash
# Build frontend
cd frontend && npx vite build

# Deploy to S3
aws s3 sync dist/ s3://villiotech-website/ --delete --profile nntech-developer

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E3NYUDMA72TSET --paths "/*" --profile nntech-developer
```

### Automated Deployment (CI/CD)

Push to `main` branch triggers automatic deployment via GitHub Actions.

**Required GitHub Secrets:**
- `AWS_ACCESS_KEY_ID` - AWS access key for deployment
- `AWS_SECRET_ACCESS_KEY` - AWS secret key for deployment

## Live URLs

- **Production**: https://d1wsqe7tpbsupy.cloudfront.net
- **API**: https://qqpmxpz0kf.execute-api.eu-central-1.amazonaws.com/contact

## SEO

Full bilingual SEO implementation (Hungarian/English) with:
- Optimized meta tags, Open Graph, Twitter Cards
- Structured data (LocalBusiness schema)
- Sitemap and robots.txt
- 10/10 pages complete

**Documentation**: See `frontend/SEO.md` for details
**Status Check**: Run `./check-seo.sh`
