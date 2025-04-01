import { Feature } from './feature';
import { featureCollectionToArray } from './feature-collection';
import { toStations } from '../endpoints/stations';
import { getUrlPart, getFeatureProperty } from './utils';
import { toValueUnits, ValueUnits } from '../../utils/value-units';

/* @class Station
 * @aka NOAA.Station
 *
 * */
export class Station extends Feature {
    id: string;
    elevation: ValueUnits;
    name: any;
    timeZone: any;
    forecastZone: any;
    county: any;
    fireWeatherZone: any;

    constructor(data) {
        if (typeof data === 'string') {
            super(undefined);
            this.id = data;
        }
        else {
            super(data);

            this.elevation = toValueUnits(getFeatureProperty('elevation', data));
            this.id = getFeatureProperty('stationIdentifier', data);
            this.name = getFeatureProperty('name', data);
            this.timeZone = getFeatureProperty('timeZone', data);

            this.forecastZone = getUrlPart(getFeatureProperty('forecast', data, true), -1);
            this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
            this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
        }
    }

    get() {
        return toStations().getStation(this.id );
    }

    getObservations(start, end) {
        return toStations().getObservations(this.id, start, end);
    }

    getLatestObservations() {
        return toStations().getLatestObservations(this.id);
    }

    getObservationsAtTime(time) {
        return toStations().getObservationsAtTime(this.id, time);
    }
}

export function stationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
        return new Station(feature);
    });
}