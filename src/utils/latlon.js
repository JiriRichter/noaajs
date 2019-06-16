/* @class LatLon
 * @aka NOAA.LatLon
 *
 * Represents a geographical point with a certain latitude and longitude.
 *
 * @example
 *
 * ```
 * let latlon = NOAA.latLon(50.5, 30.5);
 * ```
 */
export class LatLon {
    constructor(lat, lon) {
        if (isNaN(lat) || isNaN(lon)) {
            throw new Error('Invalid LatLon object: (' + lat + ', ' + lon + ')');
        }

        // @property lat: Number
        // Latitude in degrees
        this.lat = +lat;

        // @property lng: Number
        // Longitude in degrees
        this.lon = +lon;
    }

    toString() {
        return `${this.lat},${this.lon}`;
    }
}

// @factory NOAA.latLon(latitude: Number, longitude: Number, altitude?: Number): LatLon
// Creates an object representing a geographical point with the given latitude and longitude.

// @alternative
// @factory NOAA.latLon(coords: Array): LatLon
// Expects an array of the form `[Number, Number]` instead.

// @alternative
// @factory NOAA.latLon(coords: Object): LatLon
// Expects an plain object of the form `{lat: Number, lon: Number}` or `{lat: Number, lon: Number}` instead.
export function toLatLon(a, b) {
    if (a instanceof LatLon) {
        return a;
    }
    if (Array.isArray(a) && typeof a[0] !== 'object') {
        if (a.length === 2) {
            return new LatLon(a[0], a[1]);
        }
        return null;
    }
    if (a === undefined || a === null) {
        return a;
    }
    if (typeof a === 'object' && 'lat' in a) {
        return new LatLon(a.lat, 'lng' in a ? a.lng : a.lon);
    }
    if (b === undefined) {
        return null;
    }
    return new LatLon(a, b);
}