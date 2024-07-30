export function useMath() {
    const round = (value, n) => {
        if (value !== null && typeof value !== "undefined") {
            if (n === null || typeof n === "undefined") {
                n = 2;
            }
            return isNaN(value) ? value : parseFloat(value).toFixed(n);
        } else {
            return '——';
        }
    };

    const percentage = (value, n) => {
        if (value !== null && typeof value !== "undefined") {
            if (n === null || typeof n === "undefined") {
                n = 2;
            }
            return isNaN(value) ? '——%' : `${round(value * 100, n)}%`;
        } else {
            return '——%';
        }
    };

    const currency = (value) => {
        if (value <= -1e8 || value >= 1e8) {
            return `${round(value / 1e8)}亿`;
        } else if ((value > -1e8 && value <= -1e4) || (value >= 1e4 && value < 1e8)) {
            return `${round(value / 1e4)}万`;
        } else if ((value > -1e4 && value <= -1e3) || (value >= 1e3 && value < 1e4)) {
            return `${round(value / 1e3)}千`;
        } else {
            return round(value);
        }
    };
    return {round, percentage, currency};
}
