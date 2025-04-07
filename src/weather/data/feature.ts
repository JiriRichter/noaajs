import { getStringValue } from "../../utils/json";

export class Feature {
    public type?: string;

    constructor(data: any) {

        if ('type' in data) {
            this.type = getStringValue('type', data);
        }
    }
}