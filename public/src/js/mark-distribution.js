import plot from './plot';

const subject = window.location.pathname.split('/').pop();
fetch(`/markDistribution/10/${subject}`)
    .then((res) => res.json())
    .then((data) => plot('distribution', data));
