/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import animateCSS from './animate';
import updateTopicStatus from './update-topic-status';

const minusses = document.querySelectorAll('.feather-minus');

minusses.forEach((minus) => {
    minus.addEventListener('click', async function () {
        await updateTopicStatus.apply(minus, ['/removeTopic']);
        await animateCSS(this.parentElement.parentElement.parentElement, 'fadeOutLeft');
    });
});
