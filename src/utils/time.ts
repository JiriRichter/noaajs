export class Time {

    public milliseconds: number;

    constructor(t: any) {
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