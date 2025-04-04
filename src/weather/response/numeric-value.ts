import { getNumberValue, getStringValue, parseUnits } from "./utils";

export class NumericValue {

    public value: number;
    public unit: string;

    constructor(data: any) {
        this.value = getNumberValue('value', data);
        this.unit = parseUnits(getStringValue('unitCode', data));
    }
}
