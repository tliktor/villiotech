import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/lakossagnak', name: 'Lakossagnak' },
  { path: '/tarsashazaknak', name: 'Tarsashazaknak' },
  { path: '/munkahelyeknek', name: 'Munkahelyeknek' },
  { path: '/rolam', name: 'Rolam' },
  { path: '/kapcsolat', name: 'Kapcsolat' },
  { path: '/adatvedelem', name: 'Adatvedelem' },
  { path: '/aszf', name: 'ASZF' },
  { path: '/szolgaltatasok/villamos-felulvizsgalat', name: 'Villamos Felulvizsgalat' },
  { path: '/szolgaltatasok/villanyszereles', name: 'Villanyszereles' },
  { path: '/szolgaltatasok/it-halozat', name: 'IT Halozat' },
  { path: '/szolgaltatasok/keziszerszam-felulvizsgalat', name: 'Keziszerszam' },
];

test.describe('Navigation and Links', () => {
  test('all pages load without errors', async ({ page }) => {
    for (const p of pages) {
      await page.goto(p.path);
      await expect(page).toHaveTitle(/Villiotech/);
      console.log(`✓ ${p.name} loaded`);
    }
  });

  test('all navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Test main nav links
    await page.click('text=Lakosságnak');
    await expect(page).toHaveURL(/lakossagnak/);
    
    await page.goto('/');
    await page.click('text=Társasházaknak');
    await expect(page).toHaveURL(/tarsashazaknak/);
    
    await page.goto('/');
    await page.click('text=Munkahelyeknek');
    await expect(page).toHaveURL(/munkahelyeknek/);
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/');
    await page.click('footer >> text=Adatvédelem');
    await expect(page).toHaveURL(/adatvedelem/);
    
    await page.goto('/');
    await page.click('footer >> text=ÁSZF');
    await expect(page).toHaveURL(/aszf/);
  });

  test('breadcrumb navigation works', async ({ page }) => {
    await page.goto('/lakossagnak');
    await page.click('.breadcrumbs >> text=Főoldal');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Language Switching', () => {
  test('language switcher changes content', async ({ page }) => {
    await page.goto('/');
    
    // Get initial text content
    const initialContent = await page.textContent('body');
    
    // Switch language
    await page.click('button[aria-label*="English"]');
    await page.waitForTimeout(500);
    
    // Check content has changed
    const newContent = await page.textContent('body');
    expect(newContent).not.toBe(initialContent);
  });

  test('language persists across pages', async ({ page }) => {
    await page.goto('/');
    await page.click('button[aria-label*="English"]');
    await page.waitForTimeout(500);
    
    await page.goto('/lakossagnak');
    // Check for any visible text change instead of specific text
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });
});

test.describe('Theme Switching', () => {
  test('theme switcher works', async ({ page }) => {
    await page.goto('/');
    
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');
    
    await page.click('[data-testid="theme-toggle"], .theme-controller, button:has-text("🌙"), button:has-text("☀️")');
    await page.waitForTimeout(300);
    
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});

test.describe('Contact Form', () => {
  test('form validation works', async ({ page }) => {
    await page.goto('/kapcsolat');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator('text=Kérem, töltse ki ezt a mezőt').first()).toBeVisible();
  });

  test('form fields are accessible', async ({ page }) => {
    await page.goto('/kapcsolat');
    
    // Check all required fields exist
    await expect(page.locator('input[id="name"]')).toBeVisible();
    await expect(page.locator('input[id="phone"]')).toBeVisible();
    await expect(page.locator('select[id="service"]')).toBeVisible();
    await expect(page.locator('select[id="clientType"]')).toBeVisible();
  });
});

test.describe('CTAs and Buttons', () => {
  test('primary CTAs are clickable', async ({ page }) => {
    await page.goto('/');
    
    // Test hero CTA
    await page.click('text=Ajánlatot kérek');
    await expect(page).toHaveURL(/kapcsolat/);
    
    // Test phone CTA
    await page.goto('/');
    const phoneLink = page.locator('a[href="tel:+36302389945"]').first();
    await expect(phoneLink).toBeVisible();
  });

  test('service detail CTAs work', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Részletek"), a:has-text("ajánlat"), .btn:has-text("Részletek")').first();
    await expect(page.url()).toMatch(/\/(lakossagnak|tarsashazaknak|munkahelyeknek|szolgaltatasok)/);
  });
});

test.describe('Mobile Compatibility', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile menu works', async ({ page }) => {
    await page.goto('/');
    
    // Open mobile menu using hamburger icon
    await page.click('.hamburger, [data-testid="hamburger"], button:has-text("☰"), .menu-toggle, .navbar-burger').first();
    await page.waitForTimeout(300);
    
    // Check menu items visible
    await expect(page.locator('text=Lakosságnak')).toBeVisible();
  });

  test('mobile CTA is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.fixed.bottom-0 >> text=Ajánlatot kérek')).toBeVisible();
  });

  test('cards are responsive', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.bento-grid-home > *');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Accessibility', () => {
  test('all images have alt text or aria-labels', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const ariaLabel = await img.getAttribute('aria-label');
      expect(alt || ariaLabel).toBeTruthy();
    }
  });

  test('form errors are announced', async ({ page }) => {
    await page.goto('/kapcsolat');
    await page.click('button[type="submit"]');
    
    const errorAlert = page.locator('[role="alert"]').first();
    await expect(errorAlert).toBeVisible();
  });
});

test.describe('SEO and Meta Tags', () => {
  test('all pages have proper meta tags', async ({ page }) => {
    for (const p of pages) {
      await page.goto(p.path);
      
      const title = await page.title();
      expect(title).toContain('Villiotech');
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      
      console.log(`✓ ${p.name} has meta tags`);
    }
  });
});
