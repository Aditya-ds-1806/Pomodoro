fetch('/revisedTopic')
    .then((res) => res.json())
    .then(({ revisionCycle, topics }) => {
        topics.forEach(({ topic, date }) => {
            const ms = revisionCycle * 24 * 60 * 60 * 1000;
            const percentage = ((Date.now() - Date.parse(date)) / ms) * 200;
            document.querySelector(`[data-topic='${topic}']`).parentElement.parentElement.style.background = `linear-gradient(270deg, #82FFBC 0%, #E09D8C ${200 - percentage}%, #FF7C7C 100%)`;
        });
    });
