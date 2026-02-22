// Dashboard Real-Time Data Simulation

let temperatureData = [];
let soundData = [];
let crowdData = [];
let alertsList = [];

const CONFIG = {
    updateInterval: 2000,
    historyLength: 20,
    temperature: {
        min: 20, max: 40, unit: '°C',
        warning: 35, critical: 40
    },
    sound: {
        min: 50, max: 85, unit: 'dB',
        warning: 90, critical: 100
    },
    crowd: {
        min: 30, max: 75, unit: '%',
        warning: 80, critical: 90
    }
};

function generateRealisticValue(min, max, lastValue = null) {
    if (lastValue === null) {
        return Math.random() * (max - min) + min;
    }
    const change = (Math.random() - 0.5) * 3;
    const newValue = lastValue + change;
    return Math.max(min, Math.min(max, newValue));
}

function generateSensorData() {
    const now = new Date().toLocaleTimeString();

    temperatureData.push({
        time: now,
        value: generateRealisticValue(CONFIG.temperature.min, CONFIG.temperature.max, 
            temperatureData.length > 0 ? temperatureData[temperatureData.length - 1].value : null)
    });

    soundData.push({
        time: now,
        value: generateRealisticValue(CONFIG.sound.min, CONFIG.sound.max,
            soundData.length > 0 ? soundData[soundData.length - 1].value : null)
    });

    crowdData.push({
        time: now,
        value: generateRealisticValue(CONFIG.crowd.min, CONFIG.crowd.max,
            crowdData.length > 0 ? crowdData[crowdData.length - 1].value : null)
    });

    if (temperatureData.length > CONFIG.historyLength) temperatureData.shift();
    if (soundData.length > CONFIG.historyLength) soundData.shift();
    if (crowdData.length > CONFIG.historyLength) crowdData.shift();

    checkThresholds();
}

function checkThresholds() {
    const tempValue = temperatureData[temperatureData.length - 1].value;
    const soundValue = soundData[soundData.length - 1].value;
    const crowdValue = crowdData[crowdData.length - 1].value;

    if (tempValue > CONFIG.temperature.critical) {
        addAlert(`Temperature CRITICAL: ${tempValue.toFixed(1)}°C`, 'danger');
    } else if (tempValue > CONFIG.temperature.warning) {
        addAlert(`Temperature Warning: ${tempValue.toFixed(1)}°C`, 'warning');
    }

    if (soundValue > CONFIG.sound.critical) {
        addAlert(`Sound Level CRITICAL: ${soundValue.toFixed(1)}dB`, 'danger');
    } else if (soundValue > CONFIG.sound.warning) {
        addAlert(`Sound Level Warning: ${soundValue.toFixed(1)}dB`, 'warning');
    }

    if (crowdValue > CONFIG.crowd.critical) {
        addAlert(`Crowd Density CRITICAL: ${crowdValue.toFixed(1)}%`, 'danger');
    } else if (crowdValue > CONFIG.crowd.warning) {
        addAlert(`Crowd Density Warning: ${crowdValue.toFixed(1)}%`, 'warning');
    }
}

function addAlert(message, type = 'info') {
    const alert = {
        message: message,
        type: type,
        time: new Date().toLocaleTimeString()
    };

    alertsList.unshift(alert);
    if (alertsList.length > 10) alertsList.pop();

    updateAlertPanel();
}

function updateAlertPanel() {
    const alertPanel = document.getElementById('alertPanel');
    if (!alertPanel) return;

    alertPanel.innerHTML = alertsList.map(alert => `
        <div class="alert-item ${alert.type}">
            <div class="alert-sensor">${alert.message}</div>
            <div class="alert-time">${alert.time}</div>
        </div>
    `).join('');
}

function updateGauges() {
    updateGauge('temperatureGauge', temperatureData[temperatureData.length - 1].value, 
        'temperatureValue', CONFIG.temperature);
    updateGauge('soundGauge', soundData[soundData.length - 1].value,
        'soundValue', CONFIG.sound);
    updateGauge('crowdGauge', crowdData[crowdData.length - 1].value,
        'crowdValue', CONFIG.crowd);
}

function updateGauge(canvasId, value, valueId, config) {
    const canvas = document.getElementById(canvasId);
    const valueEl = document.getElementById(valueId);

    if (!canvas || !valueEl) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    ctx.clearRect(0, 0, width, height);

    // Draw gauge background
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.stroke();

    // Determine color based on value
    let color = '#10B981'; // green
    if (value > config.critical * 0.8) {
        color = '#EF4444'; // red
    } else if (value > config.warning * 0.8) {
        color = '#F59E0B'; // orange
    }

    // Draw gauge value
    const percentage = (value - config.min) / (config.max - config.min);
    const angle = Math.PI + (percentage * Math.PI);

    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, angle);
    ctx.stroke();

    // Draw needle
    const needleX = centerX + Math.cos(angle - Math.PI / 2) * 70;
    const needleY = centerY + Math.sin(angle - Math.PI / 2) * 70;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.stroke();

    // Draw center circle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Update value display
    valueEl.textContent = value.toFixed(1);
}

function updateCharts() {
    updateChart('temperatureChart', temperatureData, '#06B6D4');
    updateChart('soundChart', soundData, '#A78BFA');
    updateChart('crowdChart', crowdData, '#10B981');
}

function updateChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (data.length < 2) return;

    // Get min and max values
    const values = data.map(d => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    const padding = 30;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Draw grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw line chart
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((point, index) => {
        const x = padding + (graphWidth / (data.length - 1 || 1)) * index;
        const y = height - padding - ((point.value - minVal) / range) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = color;
    data.forEach((point, index) => {
        const x = padding + (graphWidth / (data.length - 1 || 1)) * index;
        const y = height - padding - ((point.value - minVal) / range) * graphHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function updateStats() {
    const statsData = {
        avgTemp: (temperatureData.reduce((a, b) => a + b.value, 0) / temperatureData.length).toFixed(1),
        maxSound: Math.max(...soundData.map(d => d.value)).toFixed(1),
        maxCrowd: Math.max(...crowdData.map(d => d.value)).toFixed(1),
        totalAlerts: alertsList.length
    };

    document.getElementById('avgTemp').textContent = statsData.avgTemp + '°C';
    document.getElementById('maxSound').textContent = statsData.maxSound + ' dB';
    document.getElementById('maxCrowd').textContent = statsData.maxCrowd + '%';
    document.getElementById('totalAlerts').textContent = statsData.totalAlerts;
}

function updateClock() {
    const clockEl = document.getElementById('currentTime');
    if (clockEl) {
        clockEl.textContent = new Date().toLocaleString();
    }
}

function startDashboard() {
    // Initialize data
    for (let i = 0; i < 10; i++) {
        generateSensorData();
    }

    updateGauges();
    updateCharts();
    updateStats();
    updateClock();

    // Update every 2 seconds
    setInterval(() => {
        generateSensorData();
        updateGauges();
        updateCharts();
        updateStats();
        updateClock();
    }, CONFIG.updateInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('temperatureGauge')) {
        startDashboard();
    }
});
