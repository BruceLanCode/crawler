const puppeteer = require('puppeteer');
const srcToImg = require('./src/helper/srcToImg');
const { mn } = require('./src/config/default');

puppeteer.launch()
    .then(async (brower) => {
        const page = await brower.newPage();
        await page.goto('https://image.baidu.com/');
        console.info('go to https://image.baidu.com/');

        await page.setViewport({
            width: 1920,
            height: 1080
        });

        await page.focus('#kw');
        await page.keyboard.sendCharacter('火影忍者');
        await page.click('.s_search');

        page.on('load', async () => {
            console.log('page loading done,start fetch...');

            const srcs = await page.evaluate(() => {
                const images = document.querySelectorAll('#imgid img');
                // console.info(images)
                return Array.prototype.map.call(images, img => img.src);
            });
            console.log(`get ${srcs.length} images,start download`);

            srcs.forEach(async (src) => {
                await page.waitFor(200);
                await srcToImg(src, mn);
            });

            // await brower.close();
        })
    })