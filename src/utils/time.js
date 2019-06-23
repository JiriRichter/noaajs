import moment from 'moment';
import 'moment-timezone';

export class Time {
    constructor(t) {
        if (t instanceof Date) {
            this.milliseconds = t.getTime();
        }
        else if (typeof t === 'string') {
            this.milliseconds = Date.parse(t);
        }
        else if (typeof t === 'number') {
            this.milliseconds = t;
        }
        else {
            throw new Error('Invalid time argument (' + t + ')');
        }
    }

    toTimezone(timezone) {
        return moment(this.milliseconds).tz(timezone).toDate();
    }

    toString() {
        return this.toDate().toISOString();
    }

    toDate() {
        return new Date(this.milliseconds);
    }
}

export function toTime(a) {
    if (a === undefined || a === null) {
        return a;
    }
    return new Time(a);
}