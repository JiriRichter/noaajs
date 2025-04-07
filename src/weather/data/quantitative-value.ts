import { getFloatValue, getStringValue } from "../../utils/json";
import { parseUnits } from "./utils";

export class QuantitativeValue {

    public value: number;
    public minValue?: number;
    public maxValue?: number;
    public unit: string;
    public qualityControl?: string;

    constructor(data: any) {
        this.value = getFloatValue('value', data);
        this.unit = parseUnits(getStringValue('unitCode', data));
        if ('minValue' in data) {
            this.minValue = getFloatValue('minValue', data);
        }
        if ('maxValue' in data) {
            this.minValue = getFloatValue('maxValue', data);
        }
        if ('qualityControl' in data) {
            this.minValue = getFloatValue('qualityControl', data);
        }
    }
}
