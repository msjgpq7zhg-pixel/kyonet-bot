const WEBHOOK = process.env.WEBHOOK;

function getTasks() {
    return [
        { title: "第6回レポート", deadline: "2026/06/10" },
        { title: "第7回RP", deadline: "2026/06/15" }
    ];
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
