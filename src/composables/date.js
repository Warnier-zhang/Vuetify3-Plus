import {differenceInDays, format} from "date-fns";

export function useDate() {
    const period = (startDate, endDate) => {
        let period = '';
        let days = differenceInDays(new Date(endDate), new Date(startDate));
        while (days > 0) {
            if (days > 365) {
                period += `${parseInt(days / 365)}年`;
                days = days % 365;
            } else if (days > 30) {
                period += `${parseInt(days / 30)}月`;
                days = days % 30;
            } else {
                period += `${days}天`;
                days = 0;
            }
        }
        return period;
    };

    const formatDate = (date, pattern) => {
        return format(date instanceof Date ? date : new Date(date), pattern);
    };
    return {period, formatDate};
}
