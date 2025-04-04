import { Coordinate } from "./coordinate";
import { Geometry } from "./geometry";
import { getProperty } from "./utils";

export class GeometryPolygon extends Geometry {
    public path: Coordinate[];

    constructor(data: any) {
        super(data)
        const coordinates = getProperty('coordinates', data) as [number, number][][];
        const ring0 = coordinates[0];

        this.path = ring0.map((point) => new Coordinate(point[1], point[0]))
    }
}