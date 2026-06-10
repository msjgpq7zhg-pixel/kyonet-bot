const puppeteer = require("puppeteer");

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    // ★ここを追加（重要）
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);

    console.log("開始");

const ID = process.env.KYONET_ID;
const PASS = process.env.KYONET_PASS;

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

   await page.goto("https://kyonet.kyoritsu-wu.ac.jp/", {
    waitUntil: "domcontentloaded",
    timeout: 30000
});

console.log("ページ読み込み完了");
await page.waitForTimeout(2000);
    
    console.log("ログインページ開いた");

    console.log("ID:", process.env.KYONET_ID);
console.log("PASS:", process.env.KYONET_PASS);
    // ↓ここは後で調整する可能性あり
    await page.type("input[type='text']", ID);
    await page.type("input[type='password']", PASS);

    await page.click("button[type='submit']");

    await page.waitForNavigation();

    console.log("ログイン成功");

    await browser.close();

})();
