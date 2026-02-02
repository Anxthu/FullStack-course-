const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Enable CDPSession for advanced metrics if needed, but standard APIs might suffice for this level.
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Performance.enable');

  console.log('Navigating to amazon.in...');
  await page.goto('https://www.amazon.in', { waitUntil: 'networkidle0' });

  // Part 1: Network
  const resources = await page.evaluate(() => {
    return performance.getEntriesByType('resource').map(r => ({
      name: r.name,
      transferSize: r.transferSize,
      duration: r.duration,
      initiatorType: r.initiatorType
    }));
  });

  // Part 2: Performance Interaction (Scroll and Click)
  console.log('Performing interaction...');
  await page.evaluate(() => window.scrollBy(0, 500));
  // Try to click a nav link if possible, or just wait regarding user flow
  // We'll just scroll for now to simulate "work"
  await new Promise(r => setTimeout(r, 1000));
  
  const perfEntries = await page.evaluate(() => JSON.stringify(performance.getEntries()));
  
  // Part 3: Memory
  const memory = await page.evaluate(() => {
    return window.performance.memory ? {
      jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
      totalJSHeapSize: window.performance.memory.totalJSHeapSize,
      usedJSHeapSize: window.performance.memory.usedJSHeapSize
    } : 'Memory API not available';
  });

  const data = {
    resources,
    perfEntries: JSON.parse(perfEntries),
    memory
  };

  fs.writeFileSync('audit_data.json', JSON.stringify(data, null, 2));
  console.log('Data saved to audit_data.json');

  await browser.close();
})();
