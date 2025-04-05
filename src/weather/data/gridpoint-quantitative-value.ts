import { IntervalValue } from "./interval-value";
import { getProperty, getStringValue, parseUnits } from "./utils";

export class GridpointQuantitativeValue {

    public unit?: string;
    public values: IntervalValue []

    constructor(data: any) {
        if ('uom' in data) {
            this.unit = parseUnits(getStringValue('uom', data));
        }

        this.values = (getProperty('values', data) as any[]).map(x => new IntervalValue(x));
    }
}