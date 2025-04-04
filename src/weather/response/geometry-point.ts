import { Geometry } from "./geometry";
import { getProperty } from "./utils";

export class GeometryPoint extends Geometry {
    public longitude: number;
    public latitude: number;

    constructor(data: any) {
        super(data)
        const coordinates = getProperty('coordinates', data) as [number, number];
        this.latitude = coordinates[1];
        this.longitude = coordinates[0];
    }
}