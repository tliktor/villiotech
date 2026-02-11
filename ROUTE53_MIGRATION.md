# Route53 DNS Migration Guide

## ✅ Completed Steps

### 1. Route53 Hosted Zones Created
- ✅ villiotech.hu (Zone ID: Z01881602NU4LB8KPUMK0)
- ✅ iglcoatings.hu (Zone ID: Z08373073MRTIOYGCGLBS)

### 2. All DNS Records Migrated

#### villiotech.hu Records:
- ✅ A record (apex) → CloudFront ALIAS (d1wsqe7tpbsupy.cloudfront.net)
- ✅ A record (www) → CloudFront ALIAS (d1wsqe7tpbsupy.cloudfront.net)
- ✅ MX record → Microsoft 365 (villiotech-hu.mail.protection.outlook.com)
- ✅ TXT records → SPF, Microsoft verification
- ✅ CNAME autodiscover → autodiscover.outlook.com
- ✅ CNAME selector1._domainkey → Microsoft DKIM
- ✅ CNAME selector2._domainkey → Microsoft DKIM

#### iglcoatings.hu Records:
- ✅ A record (apex) → CloudFront ALIAS (drun5w101i773.cloudfront.net)
- ✅ A record (www) → CloudFront ALIAS (drun5w101i773.cloudfront.net)
- ✅ MX records → Google Workspace (5 servers)
- ✅ TXT records → SPF, DKIM, Facebook, Pinterest, Google verification
- ✅ TXT _dmarc → DMARC policy

## 🔄 Next Steps - Nameserver Update

### villiotech.hu
Update nameservers at your domain registrar to:
```
ns-1340.awsdns-39.org
ns-716.awsdns-25.net
ns-1846.awsdns-38.co.uk
ns-343.awsdns-42.com
```

### iglcoatings.hu
Update nameservers at your domain registrar to:
```
ns-1393.awsdns-46.org
ns-1966.awsdns-53.co.uk
ns-933.awsdns-52.net
ns-193.awsdns-24.com
```

## ⏱️ Propagation Time
- DNS propagation typically takes 24-48 hours
- Email and other services will continue working during transition
- No downtime expected

## 💰 Costs
- $0.50/month per hosted zone = $1.00/month total
- First 1 million queries/month included (more than enough for these sites)

## ✨ Benefits
- ALIAS records automatically follow CloudFront IP changes
- No manual IP updates needed
- Professional DNS management
- Better reliability and performance
- Integrated with AWS infrastructure

## 🔍 Verification After Migration

After updating nameservers, verify with:
```bash
# Check villiotech.hu
dig villiotech.hu NS +short
dig villiotech.hu A +short
dig www.villiotech.hu A +short
dig villiotech.hu MX +short

# Check iglcoatings.hu
dig iglcoatings.hu NS +short
dig iglcoatings.hu A +short
dig www.iglcoatings.hu A +short
dig iglcoatings.hu MX +short
```

## 📧 Email Services Protected
- ✅ villiotech.hu → Microsoft 365 (MX, SPF, DKIM, autodiscover)
- ✅ iglcoatings.hu → Google Workspace (MX, SPF, DKIM, DMARC)

All email-related DNS records have been migrated and will continue working.
