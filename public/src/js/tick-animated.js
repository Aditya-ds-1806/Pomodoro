/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import animateCSS from './animate';
import updateTopicStatus from './update-topic-status';

const ticks = document.querySelectorAll('.feather-check');

ticks.forEach((tick) => {
    tick.addEventListener('click', async function () {
        await updateTopicStatus.apply(tick, ['/revisedTopic']);
        await animateCSS(this.parentElement.parentElement.parentElement, 'fadeOutLeft');
    });
});
