/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
fetch('/revisedTopic')
    .then((res) => res.json())
    .then(({ revisionCycle, topics }) => {
        topics.forEach(({ topic, date }) => {
            const ms = revisionCycle * 24 * 60 * 60 * 1000;
            const percentage = ((Date.now() - Date.parse(date)) / ms) * 200;
            document.querySelector(`[data-topic='${topic}']`).parentElement.parentElement.style.background = `linear-gradient(270deg, #82FFBC 0%, #E09D8C ${200 - percentage}%, #FF7C7C 100%)`;
        });
    });

fetch('/revisingTopic')
    .then((res) => res.json())
    .then(({ topics }) => {
        topics.forEach(({ topic }) => {
            document.querySelector(`[data-topic='${topic}']`).parentElement.parentElement.style.background = '#a09f9fde';
            document.querySelectorAll(`[data-topic='${topic}'] svg`).forEach((icon) => {
                const clonedIcon = icon.cloneNode(true);
                clonedIcon.style.cursor = 'not-allowed';
                icon.replaceWith(clonedIcon);
            });
        });
    });

fetch('/newTopic')
    .then((res) => res.json())
    .then(({ topics }) => {
        topics.forEach(({ topic }) => {
            document.querySelector(`[data-topic='${topic}']`).parentElement.parentElement.style.background = '#a09f9fde';
            document.querySelectorAll(`[data-topic='${topic}'] svg`).forEach((icon) => {
                const clonedIcon = icon.cloneNode(true);
                clonedIcon.style.cursor = 'not-allowed';
                icon.replaceWith(clonedIcon);
            });
        });
    });
