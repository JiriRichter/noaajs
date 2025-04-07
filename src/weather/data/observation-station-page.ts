import { DataPage } from "./data-page";
import { ObservationStation } from "./observation-station";
import { getProperty } from "../../utils/json";

export class ObservationStationPage extends DataPage {
    data: ObservationStation[];

    constructor(data: any) {
        super(data);

        const features = getProperty('features', data) as any[];

        this.data = features.map(feature => new ObservationStation(feature));
    }
}