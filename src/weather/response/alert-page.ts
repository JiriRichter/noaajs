import { Alert } from "./alert";
import { Page } from "./page";
import { getProperty } from "./utils";

export class AlertPage extends Page {
    data: Alert[];

    constructor(data: any) {
        super(data);

        const features = getProperty('features', data) as any[];

        this.data = features.map(feature => new Alert(feature));
    }
}