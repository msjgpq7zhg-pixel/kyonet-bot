const puppeteer = require("puppeteer");

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);

    console.log("開始");

    await page.goto("https://kyonet.kyoritsu-wu.ac.jp/", {
        waitUntil: "domcontentloaded",
        timeout: 30000
    });

    console.log("ページ読み込み完了");

    await page.waitForTimeout(2000);

    console.log("ここまでOK");

    await browser.close();

})();
