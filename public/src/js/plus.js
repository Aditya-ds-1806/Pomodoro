import updateTopicStatus from './update-topic-status';

const plusses = document.querySelectorAll('.feather-plus');

plusses.forEach((plus) => {
    plus.addEventListener('click', () => updateTopicStatus.apply(plus, ['/addTopic']));
});
