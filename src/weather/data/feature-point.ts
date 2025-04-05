import { Feature } from "./feature";
import { getProperty } from "./utils";

export class FeaturePoint extends Feature {
    public longitude: number;
    public latitude: number;

    constructor(data: any) {
        super(data)
        const geometry = getProperty('geometry', data);
        const coordinates = getProperty('coordinates', geometry) as [number, number];
        this.latitude = coordinates[1];
        this.longitude = coordinates[0];
    }
}