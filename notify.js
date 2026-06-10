const puppeteer = require("puppeteer");

const ID = process.env.KYONET_ID;
const PASS = process.env.KYONET_PASS;

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://kyonet.kyoritsu-wu.ac.jp/", {
        waitUntil: "networkidle2"
    });

    console.log("ログインページ開いた");

    // ↓ここは後で調整する可能性あり
    await page.type("input[type='text']", ID);
    await page.type("input[type='password']", PASS);

    await page.click("button[type='submit']");

    await page.waitForNavigation();

    console.log("ログイン成功");

    await browser.close();

})();
