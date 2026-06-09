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

    const hour = new Date().getHours();

    let msg = "📅 課題一覧\n\n";

    getTasks().forEach(t => {
        msg += `【課題】${t.title}\n【期限】${t.deadline}\n\n`;
    });

    if (hour === 8 || hour === 20) {
        await send(msg);
    }

})();
