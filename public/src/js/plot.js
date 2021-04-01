import Chart from 'chart.js/dist/Chart.bundle.min';

export default function plot(id, { x, y }) {
    const ctx = document.getElementById(id).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);

    gradient.addColorStop(0, '#FF66DB');
    gradient.addColorStop(0.7, '#FFB0EC');
    gradient.addColorStop(1, '#FFB5EB');
    gradient.addColorStop(1, '#FFF');

    // eslint-disable-next-line no-new
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: x,
            datasets: [{
                label: 'Average Mark Distributon (2016-2020)',
                barPercentage: 0.5,
                barThickness: 'flex',
                data: y,
                backgroundColor: gradient,
            }],
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display: false,
                    },
                    gridLines: {
                        display: false,
                    },
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#000',
                    },
                    gridLines: {
                        display: false,
                    },
                }],
            },
        },
    });
}
