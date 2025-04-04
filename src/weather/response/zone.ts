import { Geometry } from "./geometry";
import { getProperty, getStringValue } from "./utils";

export class Zone {
    type: any;
    id: any;
    name: any;
    state: any;
    geometry: Geometry;
    forecastOffices: any[];
    timeZones: any[];

    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.id = getStringValue('id', properties);
        this.type = getStringValue('type', properties);
        this.name = getStringValue('name', properties, true);
        this.state = getStringValue('state', properties, true);
    }
}
