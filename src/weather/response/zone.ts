import { featureCollectionToArray } from './feature-collection';
import { toZones } from '../endpoints/zones';
import { getUrlPart, getFeatureProperty } from './utils';
import { Geometry, toGeometry } from './geometry';

/* @class Zone
 * @aka NOAA.Zone
 *
 * Represents response from /zones endpoint.
 * */
export class Zone {
    type: any;
    id: any;
    name: any;
    state: any;
    geometry: Geometry;
    forecastOffices: any[];
    timeZones: any[];

    constructor(data) {
        if (typeof data === 'string') {
            this.type = getUrlPart(data, -2);
            this.id = getUrlPart(data, -1);
        }
        else {
            let i;

            this.id = getFeatureProperty('id', data);
            this.type = getFeatureProperty('type', data);
            this.name = getFeatureProperty('name', data, true);
            this.state = getFeatureProperty('state', data, true);

            if (data['geometry']) {
                this.geometry = toGeometry(data['geometry']);
            }

            this.forecastOffices = [];
            for (i = 0; data['properties']['forecastOffices'] && i < data['properties']['forecastOffices'].length; i++) {
                this.forecastOffices.push(getUrlPart(data['properties']['forecastOffices'][i], -1));
            }

            this.timeZones = [];
            for (i = 0; data['properties']['timeZone'] && i < data['properties']['timeZone'].length; i++) {
                this.timeZones.push(data['properties']['timeZone'][i]);
            }
        }
    }

    getZone() {
        return toZones().getZone(this.type, this.id);
    }

    getZoneForecast() {
        return toZones().getZoneForecast(this.type, this.id);
    }

    getZoneStations() {
        return toZones().getZoneStations(this.id);
    }

    getZoneObservations(start, end, limit) {
        return toZones().getZoneObservations(this.id, start, end, limit);
    }
}

export function zonesToArray(data) {
    return featureCollectionToArray(data, function (feature) {
        return new Zone(feature);
    });
}