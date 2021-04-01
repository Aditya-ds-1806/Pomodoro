/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import updateTopicStatus from './update-topic-status';

const ticks = document.querySelectorAll('.feather-check');

ticks.forEach((tick) => {
    tick.addEventListener('click', function () {
        this.parentElement.parentElement.parentElement.style.backgroundColor = '#82FFBC';
        updateTopicStatus.apply(tick, ['/revisedTopic']);
    });
});
