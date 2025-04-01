import { toTime } from "../utils/time";
import { toValueUnits } from "../utils/value-units";

// returns date formatted as YYYYMMDD HH:mm in UTC
export function formatDate(date) {

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function createQueryString(params) {
    
    if (params) {
        return Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    }

    return '';
}

export function appendQueryString(uri: string, params) {

    const query = createQueryString(params);

    if (query) {
        return `${uri}?${query}`;
    }

    return uri;
}

export function parseTime(s) {
    //2019-06-20 03:30
    //2019-06-22T23:58:22+00:00
    return toTime(s.replace(' ', 'T') + ':00+00:00');
}

export function parseFloatValue(value: string, units: string) {
    return toValueUnits(parseFloat(value), units);
}