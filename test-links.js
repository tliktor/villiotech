const https = require('https');

const baseUrl = 'https://d1wsqe7tpbsupy.cloudfront.net';

// Expected navigation structure based on the project
const expectedLinks = {
  // Navigation links
  '/': 'Home',
  '/#services': 'Services section',
  '/#about': 'About section',
  '/#contact': 'Contact section',
  '/services': 'Services page',
  '/about': 'About page',
  '/contact': 'Contact page',
  '/privacy': 'Privacy page',
  '/terms': 'Terms page',
};

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        ok: false,
        error: err.message
      });
    });
  });
}

async function testAllLinks() {
  console.log('🔍 Testing English Landing Page Links\n');
  console.log('Base URL:', baseUrl);
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const [path, description] of Object.entries(expectedLinks)) {
    const fullUrl = path.startsWith('/#') ? baseUrl + '/' : baseUrl + path;
    const result = await testUrl(fullUrl);
    results.push({ ...result, description, path });
    
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${description.padEnd(25)} ${result.status} ${path}`);
  }
  
  console.log('=' .repeat(60));
  
  const failed = results.filter(r => !r.ok);
  if (failed.length === 0) {
    console.log('\n✅ All links are working!');
  } else {
    console.log(`\n❌ ${failed.length} link(s) failed:`);
    failed.forEach(f => {
      console.log(`   - ${f.description}: ${f.error || f.status}`);
    });
  }
}

testAllLinks();
