import { getStringValue } from "./utils";

export class Feature {
    public type?: string;

    constructor(data: any) {

        if ('type' in data) {
            this.type = getStringValue('type', data);
        }
    }
}