import { getStringValue } from "./utils";

export class Geometry {
    public type: string;

    constructor(data: any) {
        this.type = getStringValue('type', data);
    }
}