import updateTopicStatus from './update-topic-status';

const ticks = document.querySelectorAll('.feather-check');

ticks.forEach((tick) => {
    tick.addEventListener('click', () => updateTopicStatus.apply(tick, ['/revisedTopic']));
});
