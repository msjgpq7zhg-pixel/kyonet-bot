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

await page.waitForSelector("#loginForm\\:userId");
console.log("ログインフォーム発見");

await page.type("#loginForm\\:userId", ID);
await page.type("#loginForm\\:password", PASS);

console.log("入力完了");

await page.click("#loginForm\\:loginButton");

console.log("ログインボタン押下");

await new Promise(resolve => setTimeout(resolve, 5000));

console.log("現在URL:", page.url());
console.log("タイトル:", await page.title());

const bodyText = await page.evaluate(() => document.body.innerText);

console.log("-----画面内容-----");
console.log(bodyText);
console.log("------------------");

await browser.close();
    await browser.close();

})();
