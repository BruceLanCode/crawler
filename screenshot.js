const puppeteer = require('puppeteer');
const { screenshot } = require('./src/config/default');

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.jpg`
    });
    await browser.close();
});