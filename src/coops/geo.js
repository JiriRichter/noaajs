import { stations } from './stations';
import { toLatLon, LatLon } from '../utils/latlon';
import { haversineDistance } from '../utils/distance';

/**
 * Converts feature to latLon
 * @param {any} f
 */
const stationToLatLon = f => toLatLon(f['geometry']['coordinates'].reverse());

/**
 * Finds closest tidal stations to a point
 * @param {LatLon} latlon
 */
export function findClosestStation(latlon) {
    let minDistance = -1,
        distance,
        closestStation;

    stations['features'].forEach(function (station) {
        distance = haversineDistance(latlon, stationToLatLon(station));
        if (minDistance < 0 || distance < minDistance) {
            minDistance = distance;
            closestStation = station['properties'];
        }
    });

    closestStation['distance'] = minDistance;

    return closestStation;
}