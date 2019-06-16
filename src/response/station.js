import { Feature } from './feature';
import { featureCollectionToArray } from './feature-collection';
import { toValueUnits } from './value-units';
import { toStations } from '../endpoints/stations';
import { getUrlParameter } from '../utils/parameters';


/* @class Station
 * @aka NOAA.Station
 *
 * */
export class Station extends Feature {
    constructor(data) {
        super(data);

        this.elevation = toValueUnits(this.getProperty('elevation'));
        this.id = this.getProperty('stationIdentifier');
        this.name = this.getProperty('name');
        this.timeZone = this.getProperty('timeZone');

        this.forecastZone = getUrlParameter(this.getProperty('forecast', true), -1);
        this.county = getUrlParameter(this.getProperty('county', true), -1);
        this.fireWeatherZone = getUrlParameter(this.getProperty('fireWeatherZone', true), -1);
    }

    getObservations(start, end) {
        return toStations().getObservations(this.id, start, end);
    }

    getLatestObservations() {
        return toStations().getLatestObservations(this.id);
    }

    getObservationsAtTime(time) {
        return toStations.getObservationsAtTime(this.id, time);
    }
}

export function stationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
        return new Station(feature);
    });
}