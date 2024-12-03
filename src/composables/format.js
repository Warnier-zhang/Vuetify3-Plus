// Utilities
import {format, formatDuration, intervalToDuration} from "date-fns";
import {zhCN} from "date-fns/locale";
import round from "lodash/round";

export function useFormat() {
    function formatNumber(value, options) {
        const {
            precision = 2,
            thousand = '',
            prefix = '',
            suffix = '',
            fixed = false,
        } = options || {};

        let number;
        if (value === null || typeof value === "undefined" || isNaN(value)) {
            number = '——';
        } else {
            number = fixed ? round(value, precision).toFixed(precision) : round(value, precision);
        }

        if (!(!thousand || isNaN(number))) {
            let isNegative = number < 0;
            let length = parseInt(Math.abs(number)).toString().length;
            number = number.toString();
            for (let i = 0; i < length / 3 - 1; i++) {
                let j = length + i - (4 * i + 3);
                if (isNegative) {
                    j += 1;
                }
                number = number.substring(0, j) + thousand + number.substring(j);
            }
        }

        if (prefix || suffix) {
            number = `${prefix}${number}${suffix}`;
        }
        return number;
    }

    function formatInteger(value) {
        return formatNumber(value, {precision: 0});
    }

    function formatDecimal(value, precision) {
        return formatNumber(value, {precision});
    }

    function formatPercent(value, precision) {
        return formatNumber(value * 100, {precision, suffix: '%'});
    }

    function formatCurrency(value, options) {
        const {
            symbol = '￥',
            precision = 2,
            thousand = ',',
        } = options || {};

        let currency;
        if (value <= -1e8 || value >= 1e8) {
            currency = formatNumber(value / 1e8, {prefix: symbol, precision, thousand, suffix: '亿'});
        } else if ((value > -1e8 && value <= -1e4) || (value >= 1e4 && value < 1e8)) {
            currency = formatNumber(value / 1e4, {prefix: symbol, precision, thousand, suffix: '万'});
        } else if ((value > -1e4 && value <= -1e3) || (value >= 1e3 && value < 1e4)) {
            currency = formatNumber(value / 1e3, {prefix: symbol, precision, thousand, suffix: '千'});
        } else {
            currency = formatNumber(value, {prefix: symbol, precision, thousand, suffix: '元'});
        }
        return currency;
    }

    function formatDateTime(date, pattern) {
        if (date) {
            return format(
                date instanceof Date ? date : new Date(date),
                pattern !== null && typeof pattern !== "undefined" ? pattern : 'yyyy-MM-dd HH:mm:ss',
                {
                    locale: zhCN,
                }
            );
        } else {
            return '——';
        }
    }

    function formatInterval(startDate, endDate) {
        if (startDate && endDate) {
            return formatDuration(
                intervalToDuration({
                    start: startDate instanceof Date ? startDate : new Date(startDate),
                    end: endDate instanceof Date ? endDate : new Date(endDate),
                }),
                {
                    format: [
                        'years',
                        'months',
                        'weeks',
                        'days',
                        // 'hours',
                        // 'minutes',
                        // 'seconds'
                    ],
                    delimiter: '',
                    zero: false,
                    locale: zhCN,
                }
            ).replace(/( )/g, '');
        } else {
            return '——';
        }
    }

    return {
        formatNumber,
        formatInteger,
        formatDecimal,
        formatPercent,
        formatCurrency,
        formatDateTime,
        formatInterval,
    };
}
