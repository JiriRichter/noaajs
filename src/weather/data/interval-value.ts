import { getFloatValue, getStringValue } from "./utils";
import { Interval } from "./interval";

export class IntervalValue {

    public validTime: Interval;
    public value: number;

    constructor(data: any) {
        this.value = getFloatValue('value', data);
        this.validTime = new Interval(getStringValue('validTime', data));
    }
}