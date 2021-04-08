/* eslint-disable no-param-reassign */
import updateTopicStatus from './update-topic-status';

const plusses = document.querySelectorAll('.feather-plus');

plusses.forEach((plus) => {
    plus.addEventListener('click', () => {
        updateTopicStatus.apply(plus, ['/addTopic']);
        [...plus.parentElement.children].forEach((icon) => {
            const clonedIcon = icon.cloneNode(true);
            icon.parentElement.parentElement.parentElement.style.background = '#a09f9fde';
            clonedIcon.style.cursor = 'not-allowed';
            icon.replaceWith(clonedIcon);
        });
    });
});
