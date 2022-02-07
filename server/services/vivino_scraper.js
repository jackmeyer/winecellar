const puppeteer = require('puppeteer');
const wine = require('../models/wine-model');


const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0
            let distance = 500
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight
                window.scrollBy(0, distance)
                totalHeight += distance
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer)
                    resolve()
                }
            }, 100)
        })
    })
}

async function getVivinoWine(url) {

    const newbottle = new wine();

    try {
        const browser = await puppeteer.launch({
            headless: true,
            //executablePath: '/usr/bin/chromium-browser',
            args: [
                '--no-sandbox',
                '--disable-gpu',
              ]
        }); // for test disable the headlels mode,
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9'
        });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
          });
        await page.goto(url, {
            waitUntil: 'load'
        });
    
        await page.waitForFunction('document.querySelector("body")');
        await autoScroll(page);

        try {
            const element = await page.$x('/html/body/div[2]/div[5]/div/div/div[2]/div[1]/div/h1/span[1]/a');
            const textObject = await element[0].getProperty('textContent');
            newbottle.winery = textObject._remoteObject.value.replace(/(\r\n|\n|\r)/gm, " ").trim();
        } catch (error) {
            console.log(error);
        }

        try {
            const element = await page.$x('/html/body/div[2]/div[5]/div/div/div[2]/div[1]/div/h1/span[2]/a');
            const textObject = await element[0].getProperty('textContent');
            newbottle.wine_name = textObject._remoteObject.value.replace(/(\r\n|\n|\r)/gm, " ").trim();
        } catch (error) {
            console.log(error);
        }

        try {
            const element = await page.$x('/html/body/div[2]/div[5]/div/div/div[2]/div[1]/div/h1/span[2]');
            const textObject = await element[0].getProperty('textContent');
            const str = textObject._remoteObject.value;
            const matches = str.match(/(\d+)/);
            newbottle.vintage = parseInt(matches[0]);
        } catch (error) {
            console.log(error);
        }

        try {
            const element = await page.$x('//*[@id="wine-location-header"]/div/div/div/div[1]/div/span[1]/a');
            const textObject = await element[0].getProperty('textContent');
            newbottle.country = textObject._remoteObject.value;
        } catch (error) {
            console.log(error);
        }

        try {
            const element = await page.$x('//*[@id="wine-location-header"]/div/div/div/div[2]/a/div/div[1]');
            const textObject = await element[0].getProperty('textContent');
            newbottle.vivino_rating = textObject._remoteObject.value;
        } catch (error) {
            console.log(error);
        }

        try {
            const element = await page.$x('//*[@id="purchase-availability"]/div/div/div[1]/div[1]/span');
            const textObject = await element[0].getProperty('textContent');
            newbottle.price = textObject._remoteObject.value;
        } catch (error) {
            console.log(error);
        }

        try { //get table of wine facts (ABV, grapes, style, etc.)
            //const table = await page.$$("..wineFacts__headerLabel--14doB")
            const labels = await page.evaluate(() => Array.from(document.querySelectorAll('.wineFacts__headerLabel--14doB'), element => element.textContent));
            const values = await page.evaluate(() => Array.from(document.querySelectorAll('.wineFacts__wineFacts--2Ih8B td'), element => element.textContent));

            for(var i = 0; i < labels.length; i++) {
                switch(labels[i]) {
                    case 'Grapes':
                        newbottle.grapes.push(values[i]);
                        break;
                    case 'Wine style':
                        newbottle.wine_style = values[i];
                        break;
                    case 'Alcohol content':
                        newbottle.alcohol_content = values[i];
                        break;
                    case 'Region':
                        newbottle.region = values[i];
                }
            }
        
            
        } catch (error) {
            console.log(error)
        }

        await browser.close();
        return newbottle;


        // const wineryelement = await page.waitForSelector('body > div.wrap > div.grid.topSection > div > div > div.mobile-column-1.tablet-column-8.desktop-column-6 > div.row.header.breadCrumbs > div > h1 > span.headline > a');
        // const winery = await wineryelement.evaluate(el => el.textContent);
        // return winery;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getVivinoWine };

