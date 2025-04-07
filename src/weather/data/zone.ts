import { Feature } from "./feature";
import { NWSForecastOfficeId } from "./office-id";
import { getProperty, getStringValue } from "../../utils/json";

export class Zone {
    type: string;
    id: string;
    name?: string;
    state?: string;
    geometry: Feature;
    forecastOffices: NWSForecastOfficeId[];
    timeZones: string[];

    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.id = getStringValue('id', properties);
        this.type = getStringValue('type', properties);

        if ('name' in properties) {
            this.name = getStringValue('name', properties);
        }
        if ('state' in properties) {
            this.state = getStringValue('state', properties);
        }
    }
}
