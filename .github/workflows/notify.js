const fetch = require("node-fetch");

const WEBHOOK = process.env.WEBHOOK;

function getTasks() {
    return [
        { title: "第6回レポート", deadline: "2026/06/10" },
        { title: "第7回RP", deadline: "2026/06/15" }
    ];
}

function buildMessage(label) {

    const tasks = getTasks();

    let msg = `📅 ${label}の課題一覧\n\n`;

    tasks.forEach(t => {
        msg += `【課題】${t.title}\n【期限】${t.deadline}\n\n`;
    });

    return msg;
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

    if (hour === 8) {
        await send(buildMessage("朝"));
    }

    if (hour === 20) {
        await send(buildMessage("夜"));
    }

})();
