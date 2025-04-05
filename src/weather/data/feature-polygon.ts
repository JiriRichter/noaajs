import { Coordinate } from "./coordinate";
import { Feature } from "./feature";
import { getProperty } from "./utils";

export class FeaturePolygon extends Feature {
    public path: Coordinate[];

    constructor(data: any) {
        super(data)

        const geometry = getProperty('geometry', data);
        const coordinates = getProperty('coordinates', geometry) as [number, number][][];
        const ring0 = coordinates[0];

        this.path = ring0.map((point) => new Coordinate(point[1], point[0]))
    }
}