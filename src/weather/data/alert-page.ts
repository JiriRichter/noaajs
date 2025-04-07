import { Alert } from "./alert";
import { DataPage } from "./data-page";
import { getProperty } from "../../utils/json";

export class AlertPage extends DataPage {
    data: Alert[];

    constructor(data: any) {
        super(data);

        const features = getProperty('features', data) as any[];

        this.data = features.map(feature => new Alert(feature));
    }
}