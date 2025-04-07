import { parseDate } from "../../utils/json";

export const millisecondsPerHour = 3600000;

export class Interval {
    
    public startTime: Date;
    public duration: string;
    public hours: number;
    public days: number;
    public totalHours: number;

    constructor(s: string) {

        const parts = s.split('/');
        if (parts.length !== 2) {
            throw new Error('Invalid time duration value (' + s + ')');
        } 

        this.startTime = parseDate(parts[0]);
        this.hours = 0;
        this.days = 0;

        //duration parsing
        this.duration = parts[1];
        let num = 0;
        if (this.duration[0] !== 'P') {
            throw new Error('Invalid time duration value (' + parts[1] + ')');
        }

        for (let i = 1; i < this.duration.length; i++) {
            if (this.duration.charAt(i) >= '0' && this.duration.charAt(i) <= '9') {
                num = num * 10 + (this.duration.charCodeAt(i) - '0'.charCodeAt(0));
                continue;
            }
            if (this.duration.charAt(i) === 'T') {
                num = 0;
                continue;
            }
            if (this.duration.charAt(i) === 'D') {
                this.days = num;
                num = 0;
                continue;
            }
            if (this.duration.charAt(i) === 'H') {
                this.hours = num;
                num = 0;
                continue;
            }
        }

        if (this.days === 0 && this.hours === 0) {
            throw new Error('Invalid time duration (' + this.duration + ')');
        }

        this.totalHours = (this.days * 24) + this.hours;
    }

    toDates() {
        const dates: Date[] = [ this.startTime ],
            startTime = this.startTime.getTime();

        for (let i = 1; i < this.totalHours; i++) {
            dates.push(new Date(startTime + (i * millisecondsPerHour)));
        }

        return dates;
    }
}