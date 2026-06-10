const puppeteer = require("puppeteer");

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://kyonet.kyoritsu-wu.ac.jp/", {
        waitUntil: "networkidle2"
    });

    console.log("ページ開けた");

    await browser.close();

})();
