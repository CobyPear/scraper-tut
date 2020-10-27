const puppeteer = require('puppeteer');
const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
const MOVIE_ID = `tt6763664`;

(async () => {
    // initiate puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // go to the IMBD movie page and wait for it to load
    await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });

    // run JS inside the page
    let data = await page.evaluate(() => {

        let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
        let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

        return {
            title, 
            rating, 
            ratingCount
        }
    });

    console.log(data)

    await browser.close();
})();