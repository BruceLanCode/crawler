const puppeteer = require('puppeteer');

puppeteer.launch({devtools: true}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    // other actions...
});