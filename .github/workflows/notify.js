const puppeteer = require("puppeteer");

const WEBHOOK = process.env.WEBHOOK;
const ID = process.env.KYONET_ID;
const PASS = process.env.KYONET_PASS;

async function sendDiscord(content) {
    await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    });
}

(async () => {

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    // 👉 Kyonetログインページ
    await page.goto("https://kyonet.kyoritsu-wu.ac.jp/", {
        waitUntil: "networkidle2"
    });

    // 👉 ログイン（※ここは実際のIDフィールドに合わせる必要あり）
    await page.type("input[name='username']", ID);
    await page.type("input[name='password']", PASS);

    await page.click("button[type='submit']");
    await page.waitForNavigation();

    // 👉 課題ページへ（ここは環境で変わる）
    await page.goto("https://kyonet.kyoritsu-wu.ac.jp/uprx/up/pk/pky001/Pky00101.xhtml", {
        waitUntil: "networkidle2"
    });

    // 👉 課題取得
    const tasks = await page.evaluate(() => {

        const items = [...document.querySelectorAll(".signPortal")];

        return items.map(el => {
            const parent = el.closest("li");
            return {
                title: parent?.innerText?.trim() || "不明",
            };
        });

    });

    let msg = "📅 Kyonet課題一覧\n\n";

    if (!tasks.length) {
        msg += "課題なし";
    } else {
        tasks.forEach(t => {
            msg += `【課題】${t.title}\n\n`;
        });
    }

    await sendDiscord(msg);

    await browser.close();

})();
