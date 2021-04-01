fetch('/revisedTopic')
    .then((res) => res.json())
    .then((revisedTopics) => {
        revisedTopics.forEach(({ topic, date }) => {
            const percentage = ((Date.now() - Date.parse(date)) / (14 * 24 * 60 * 60 * 1000)) * 200;
            document.querySelector(`[data-topic='${topic}']`).parentElement.parentElement.style.background = `linear-gradient(270deg, #82FFBC 0%, #E09D8C ${100 - percentage}%, #FF7C7C 100%)`;
        });
    });
