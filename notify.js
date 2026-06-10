const WEBHOOK = process.env.WEBHOOK;

function getTasks() {

    const items = [...document.querySelectorAll(".signPortal")];

    return items
        .map(el => {
            const parent = el.closest("li") || el.parentElement;
            const text = parent?.innerText || "";

            // 課題・テストだけ抽出
            if (!text.includes("課題") && !text.includes("テスト")) return null;

            return {
                title: text.trim()
            };
        })
        .filter(Boolean);
}
async function send(content) {
    await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    });
}

(async () => {

    let msg = "📅 課題一覧\n\n";

    const tasks = getTasks();

    if (tasks.length === 0) {
        msg += "課題なし";
    } else {
        tasks.forEach(t => {
            msg += `【課題】${t.title}\n【期限】${t.deadline}\n\n`;
        });
    }

    await send(msg);

})();
