let dataChart;

const chartColors = {
    vibrant: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'],
    mono: ['#6C757D', '#ADB5BD', '#CED4DA'],
    earth: ['#795548', '#A1887F', '#BCAAA4']
};

const datasets = {
    sales: {
        labels: ['Jan','Feb','Mar','Apr'],
        data: [450,620,750,430],
        description: 'Monthly sales data'
    },
    expenses: {
        labels: ['Rent','Salaries','Marketing'],
        data: [12000,45000,8500],
        description: 'Company expenses'
    },
    population: {
        labels: ['New York','LA','Chicago'],
        data: [8398748,3990456,2705994],
        description: 'City population'
    },
    performance: {
        labels: ['Alex','Jamie','Taylor'],
        data: [85,92,78],
        description: 'Team performance'
    },
    custom: {
        labels: [],
        data: [],
        description: 'Custom data'
    },
    uploaded: {
        labels: [],
        data: [],
        description: 'Uploaded CSV dataset'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    setupEventListeners();
    updateDataTable();

    document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode"));
});

if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark-mode");
}
});


function initializeChart() {
    const ctx = document.getElementById('data-chart').getContext('2d');
    let chartType = document.getElementById('chart-type').value;
    const datasetKey = document.getElementById('dataset').value;
    const scheme = document.getElementById('color-scheme').value;


    const sort = document.getElementById("sort-data")?.value;

    if (sort !== "none") {
    const combined = labels.map((l, i) => ({ l, v: data[i] }));
    combined.sort((a, b) => sort === "asc" ? a.v - b.v : b.v - a.v);

    labels.length = 0;
    data.length = 0;

    combined.forEach(x => {
        labels.push(x.l);
        data.push(x.v);
    });
}

    const currentData = datasets[datasetKey];

    const MAX_VISIBLE = 200;

    const labels =
        currentData.labels.length > MAX_VISIBLE
            ? currentData.labels.slice(0, MAX_VISIBLE)
            : currentData.labels;

    const data =
        currentData.data.length > MAX_VISIBLE
            ? currentData.data.slice(0, MAX_VISIBLE)
            : currentData.data;

    if (dataChart) dataChart.destroy();


    dataChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,       
            datasets: [{
                label: 'Values',
                data: data,        
                backgroundColor: chartColors[scheme],
                borderWidth: 2
            }]
        },
        options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: document.getElementById("chart-title").value
        }
    }
}
        

    });


    generateInsights();
        
}



function setupEventListeners() {
    document.getElementById('update-chart').addEventListener('click', () => {
        initializeChart();
        updateDataTable();
    });

    document.getElementById('export-chart').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = document.getElementById('data-chart').toDataURL();
        link.click();
    });

    document.getElementById('random-data').addEventListener('click', () => {
        const key = document.getElementById('dataset').value;
        datasets[key].data = datasets[key].data.map(
            () => Math.floor(Math.random() * 1000)
        );
        initializeChart();
        updateDataTable();
    });

    document.getElementById('apply-custom-data').addEventListener('click', () => {
        const labels = document.getElementById('custom-labels').value.split(',').map(s => s.trim());
        const values = document.getElementById('custom-values').value.split(',').map(Number);

        datasets.custom.labels = labels;
        datasets.custom.data = values;

        document.getElementById('dataset').value = 'custom';
        initializeChart();
        updateDataTable();
    });

    document.getElementById('file-upload').addEventListener('change', handleUpload);

    document.querySelectorAll("select, input").forEach(el => {
    el.addEventListener("change", () => {
        initializeChart();
        updateDataTable();
    });


    document.getElementById("reset-data").addEventListener("click", () => {
    location.reload();
    });
});


document.getElementById("export-csv").addEventListener("click", () => {
    const key = document.getElementById("dataset").value;
    const data = datasets[key];

    let csv = "Label,Value\n";
    data.labels.forEach((l, i) => {
        csv += `${l},${data.data[i]}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
});
}


function handleUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.csv')) {
        alert('Only CSV files allowed');
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        const rows = reader.result.trim().split('\n');

        if (rows.length > 4000) {
            alert('Max 4000 rows allowed');
            return;
        }

        const labels = [];
        const values = [];

        let startIndex = 0;
        const firstRowCols = rows[0].split(',');

        if (isNaN(firstRowCols[1])) {
            startIndex = 1;
        }

        for (let i = startIndex; i < rows.length; i++) {
            const cols = rows[i].split(',');

            if (cols.length < 2) {
                alert('Each row must have at least 2 columns');
                return;
            }

            const col1 = cols[0].trim();
            const col2 = cols[1].trim();

            const num2 = Number(col2);

            if (isNaN(num2)) {
                alert('Second column must be numeric');
                return;
            }

            labels.push(col1);
            values.push(num2);
        }

        if (labels.length === 0) {
            alert('No valid data rows found');
            return;
        }

        datasets.uploaded.labels = labels;
        datasets.uploaded.data = values;

        const datasetSelect = document.getElementById('dataset');
        if (![...datasetSelect.options].some(o => o.value === 'uploaded')) {
            datasetSelect.add(new Option('Uploaded Dataset', 'uploaded'));
        }

        datasetSelect.value = 'uploaded';

        initializeChart();
        updateDataTable();
    };

    reader.readAsText(file);
}


function updateDataTable() {
    const tbody = document.querySelector('#data-table tbody');
    const key = document.getElementById('dataset').value;
    const data = datasets[key];

    tbody.innerHTML = '';

    data.labels.forEach((label, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${label}</td>
            <td>${data.data[i]}</td>
            <td>-</td>
        `;
        tbody.appendChild(row);
    });
}



function generateInsights() {
    const key = document.getElementById("dataset").value;
    const data = datasets[key].data;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const avg = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);

    document.getElementById("insights").innerHTML =
        `📊 Max: ${max} | Min: ${min} | Avg: ${avg}`;
}