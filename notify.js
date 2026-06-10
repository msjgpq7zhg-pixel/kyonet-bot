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
    waitUntil: "networkidle2",
    timeout: 60000
});

await new Promise(resolve => setTimeout(resolve, 3000));
    
console.log("ページ読み込み完了");

console.log("URL:", page.url());

const html = await page.content();
console.log("HTML長さ:", html.length);

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

await page.screenshot({ path: "after-login.png", fullPage: true });

console.log("スクショ保存");
    
const moreButtonHtml = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("*")]
        .find(el => el.textContent?.trim() === "もっと見る");

    return btn ? btn.outerHTML : "見つからない";
});

console.log("=====もっと見るHTML=====");
console.log(moreButtonHtml);
console.log("=======================");;

await page.evaluate(() => {
    const btn = document.querySelector("#funcForm\\:j_idt176\\:j_idt280");

    if (btn) {
        btn.click();
    }
});

console.log("もっと見る実行");

await new Promise(resolve => setTimeout(resolve, 5000));
    
const deadlineTab = await page.evaluate(() => {
    const el = document.querySelector('#funcForm\\:j_idt176\\:j_idt229');
    return el ? el.innerText : "見つからない";
});

console.log("=====期限あり=====");
console.log(deadlineTab);
const lines = deadlineTab
    .split("\n")
    .map(x => x.trim())
    .filter(x => x);

const targets = lines.filter(x =>
    x.startsWith("課題") ||
    x.startsWith("テスト")
);

console.log("=====抽出結果=====");
console.log("=====通知用=====");

const today = new Date();
today.setHours(0,0,0,0);

const deadlineDate = new Date(deadline);
deadlineDate.setHours(0,0,0,0);

for (const item of targets) {
    const deadline = item.match(/期限：(\d{4}\/\d{2}\/\d{2})/)?.[1] || "不明";

    const title = item
        .replace(/^課題\d{4}\/\d{2}\/\d{2}/, "")
        .replace(/^テスト\d{4}\/\d{2}\/\d{2}/, "")
        .replace(/\[.*?\]/, "")
        .replace(/期限：.*/, "")
        .trim();

    const deadlineDate = new Date(deadline);

    const diffDays = Math.ceil(
        (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );

   const type = item.startsWith("テスト")
    ? "テスト📝"
    : "課題📄";

console.log(`${type} ${title}`);
    console.log(`【期限】 ${deadline}（あと${diffDays}日）`);
    console.log("");
}
console.log("=================");
console.log("=================");


await browser.close();

})();
