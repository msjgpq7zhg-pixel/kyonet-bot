const ID = process.env.KYONET_ID;
const PASS = process.env.KYONET_PASS;

console.log("ID exists:", !!ID);
console.log("PASS exists:", !!PASS);

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

await new Promise(resolve => setTimeout(resolve, 2000));

console.log("ここまでOK");

    await browser.close();

})();
