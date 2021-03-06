import plot from './plot';

const subject = window.location.pathname.split('/').pop();
const { grade } = document.querySelector('nav img').dataset;
fetch(`/markDistribution/${grade}/${subject}`)
    .then((res) => res.json())
    .then((data) => plot('distribution', data));
