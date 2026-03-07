export default class ChartManager {
    constructor() {
        this.ctx = document.getElementById('marketChart').getContext('2d');
        this.chart = null;
        this.initChart();
    }

    initChart() {
        const config = {
            type: 'line',
            data: {
                labels: Array.from({ length: 30 }, (_, i) => i),
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 0 },
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#8b8e9f' }
                    },
                    x: { display: false }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: { color: '#ffffff', font: { family: 'JetBrains Mono', size: 10 } }
                    }
                }
            }
        };

        this.chart = new Chart(this.ctx, config);
    }

    update(history) {
        const colors = ['#00d2ff', '#9d50bb', '#00f291', '#ff3e3e', '#ffd700'];
        let i = 0;

        this.chart.data.datasets = Object.keys(history).map(symbol => ({
            label: symbol,
            data: history[symbol],
            borderColor: colors[i++ % colors.length],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0.1
        }));

        this.chart.update();
    }
}
