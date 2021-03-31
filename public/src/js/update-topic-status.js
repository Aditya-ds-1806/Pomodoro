export default async function updateTopicStatus(route) {
    const { topic, chapter } = this.parentElement.dataset;
    const res = await (await fetch(route, {
        method: 'POST',
        body: JSON.stringify({ topic, chapter }),
        headers: {
            'Content-Type': 'application/json',
        },
    })).json();
    return res;
}
