import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`));
  page.on('pageerror', error => console.log(`BROWSER ERROR: ${error.message}`));
  
  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  const eventsHtml = await page.evaluate(() => {
    const el = document.getElementById('events');
    return el ? el.outerHTML.substring(0, 800) : "Events section not found";
  });
  console.log("Events Section HTML:", eventsHtml);
  console.log("Done waiting for network idle.");
  
  await browser.close();
})().catch(err => {
  console.error("Script error:", err);
  process.exit(1);
});
