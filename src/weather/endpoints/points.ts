import { Endpoint } from './endpoint';
import { Point } from '../response/point';
import { stationsToArray } from '../response/station';

/* class Points implements /points interface
 * */
export class Points extends Endpoint {
    latlon: any;
    /**
     * 
     * @param {LatLon} latlon
     */
    constructor(latlon: any) {
        super('/points');
        this.latlon = latlon;
    }

    async get(): Promise<Point> {
        const data = await super.get([this.latlon]);
        return new Point(data);
    }

    async getStations() {
        const data = await super.get([this.latlon, 'stations']);
        return stationsToArray(data);
    }
}

// @factory NOAA.points(latlon: LatLon): Points
// Creates an object representing /points endpoint

// @alternative
// @factory NOAA.points(coords: Array): Points

// @alternative
// @factory NOAA.points(coords: Object): Points
export function toPoints(a): Points {
    return new Points(a);
}