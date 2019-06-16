import { Feature } from './feature';
import { featureCollectionToArray } from './feature-collection';
import { toZones } from '../endpoints/zones';
import { getUrlParameter } from '../utils/parameters';

/* @class Zone
 * @aka NOAA.Zone
 *
 * Represents response from /zones endpoint.
 * */
export class Zone extends Feature {
    constructor(data) {
        super(data);

        let i;

        this.id = this.getProperty('id');
        this.type = this.getProperty('type');
        this.name = this.getProperty('name', true);
        this.state = this.getProperty('state', true);

        this.forecastOffices = [];
        for (i = 0; this.properties['forecastOffices'] && i < this.properties['forecastOffices'].length; i++) {
            this.forecastOffices.push(getUrlParameter(this.properties['forecastOffices'][i], -1));
        }

        this.timeZones = [];
        for (i = 0; this.properties['timeZone'] && i < this.properties['timeZone'].length; i++) {
            this.timeZones.push(this.properties['timeZone'][i]);
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

export function toZone(type, id) {
    return new Zone({
        'type': 'Feature',
        'properties': {
            'id': id,
            'type': type
        }
    });
}

export function zonesToArray(data) {
    return featureCollectionToArray(data, function (feature) {
        return new Zone(feature);
    });
}