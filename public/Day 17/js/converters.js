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
    try {
        // Check online status
        if (!navigator.onLine) {
            throw new Error("You are offline. Currency conversion requires internet connection.");
        }

        // Validate input
        if (!from || !to) {
            throw new Error("Invalid currency codes provided");
        }

        const res = await fetch(
            `https://api.exchangerate.host/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`
        );
        
        // Check response status
        if (!res.ok) {
            throw new Error(`Exchange rate API error: ${res.status}`);
        }

        // Validate response format
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response format from currency API');
        }

        const data = await res.json();
        
        // Validate data structure
        if (!data || !data.rates || !data.rates[to]) {
            throw new Error(`Invalid currency data or unsupported currency pair: ${from} to ${to}`);
        }

        return (val * data.rates[to]).toFixed(2);
    } catch (error) {
        console.error('Currency conversion error:', error);
        // Re-throw with user-friendly message
        if (error.message.includes("offline")) {
            throw error;
        } else if (error.message.includes("Invalid currency")) {
            throw new Error("Invalid currency codes. Please check your selection.");
        } else if (error.message.includes("API")) {
            throw new Error("Failed to fetch exchange rates. Please try again later.");
        }
        throw new Error("Currency conversion failed. Please try again.");
    }
}
