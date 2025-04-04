import { parseDate } from "./utils";

export const millisecondsPerHour = 3600000;

export class ValidTimePeriod {
    
    time: any;
    hours: number;
    days: number;
    totalHours: any;
    _array: any;

    constructor(s: string) {
        let parts = s.split('/');
        if (parts.length !== 2) {
            throw new Error('Invalid valid time value (' + s + ')');
        } 

        this.time = parseDate(parts[0]);
        this.hours = 0;
        this.days = 0;

        //period parsing
        let period = parts[1], num = 0;
        if (period[0] !== 'P') {
            throw new Error('Invalid valid time period value (' + parts[1] + ')');
        }

        for (let i = 1; i < period.length; i++) {
            if (period.charAt(i) >= '0' && period.charAt(i) <= '9') {
                num = num * 10 + (period.charCodeAt(i) - '0'.charCodeAt(0));
                continue;
            }
            if (period.charAt(i) === 'T') {
                num = 0;
                continue;
            }
            if (period.charAt(i) === 'D') {
                this.days = num;
                num = 0;
                continue;
            }
            if (period.charAt(i) === 'H') {
                this.hours = num;
                num = 0;
                continue;
            }
        }

        if (this.days === 0 && this.hours === 0) {
            throw new Error('Invalid valid time period (' + period + ')');
        }

        this.totalHours = this.days * 24 + this.hours;
    }

    toArray() {
        if (this._array) {
            return this._array;
        }
        this._array = [];
        for (let i = 0; i < this.totalHours; i++) {
            this._array.push(new Date(this.time.milliseconds + (i * millisecondsPerHour)));
        }
        return this._array;
    }
}