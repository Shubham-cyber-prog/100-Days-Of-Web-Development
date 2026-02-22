async function convertValue(value, category, from, to) {
    if (category === "temperature") return convertTemperature(value, from, to);
    if (category === "currency") return await convertCurrency(value, from, to);

    const map = UNIT_DATA[category].units;
    return ((value * map[from]) / map[to]).toFixed(2);
}

function convertTemperature(val, from, to) {
    if (from === to) return val.toFixed(1);
    if (from === "celsius") return ((val * 9) / 5 + 32).toFixed(1);
    return ((val - 32) * 5 / 9).toFixed(1);
}

async function convertCurrency(val, from, to) {
    const res = await fetch(
        `https://api.exchangerate.host/latest?base=${from}&symbols=${to}`
    );
    const data = await res.json();
    return (val * data.rates[to]).toFixed(2);
}
