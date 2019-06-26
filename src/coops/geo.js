import { stations } from './stations';
import { toLatLon, LatLon } from '../utils/latlon';
import { haversineDistance } from '../utils/distance';
import { toValueUnits } from '../response/value-units';

/**
 * Converts feature to latLon
 * @param {any} f
 */
const getStationLatLon = station => toLatLon(station['geometry']['coordinates'][1], station['geometry']['coordinates'][0]);

/**
 * Finds closest tidal stations to a point
 * @param {LatLon} latlon
 */
export function findClosestStation(latlon) {
    let minDistance = -1,
        distance,
        closestStation,
        stationLatLon;

    stations['features'].forEach(function (station) {
        stationLatLon = getStationLatLon(station);
        distance = haversineDistance(latlon, stationLatLon);
        if (minDistance < 0 || distance < minDistance) {
            minDistance = distance;
            closestStation = station['properties'];
            closestStation['latlon'] = stationLatLon;
        }
    });

    closestStation['distance'] = toValueUnits(minDistance, 'm');

    return closestStation;
}