import { Endpoint } from './endpoint';
import { LatLon, toLatLon } from '../../utils/latlon';
import { Point } from '../response/point';
import { stationsToArray } from '../response/station';

/* class Points implements /points interface
 * */
export class Points extends Endpoint {
    /**
     * 
     * @param {LatLon} latlon
     */
    constructor(latlon) {
        super('/points');
        this.latlon = toLatLon(latlon);
    }

    get() {
        return super.get([this.latlon], function (data) {
            return new Point(data);
        });
    }

    getStations() {
        return super.get([this.latlon, 'stations'], function (data) {
            return stationsToArray(data);
        });
    }
}

// @factory NOAA.points(latlon: LatLon): Points
// Creates an object representing /points endpoint

// @alternative
// @factory NOAA.points(coords: Array): Points

// @alternative
// @factory NOAA.points(coords: Object): Points
export function toPoints(a) {
    return new Points(a);
}