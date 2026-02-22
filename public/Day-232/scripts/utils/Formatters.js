export const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(val);
};

export const formatPercentage = (val) => {
    return (val * 100).toFixed(2) + '%';
};
