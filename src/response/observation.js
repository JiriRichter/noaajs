import { Feature } from './feature';
import { featureCollectionToArray } from './feature-collection';
import { toValueUnits } from './value-units';
import { toTime } from '../utils/time';
import { getUrlPart, getFeatureProperty } from './utils';

/* @class Observation
 * @aka NOAA.Observation
 *
 * */
export class Observation extends Feature {
    constructor(data) {
        super(data);

        this.elevation = toValueUnits(getFeatureProperty('elevation', data));
        this.stationId = getUrlPart(getFeatureProperty('station', data, true), -1);
        this.timestamp = toTime(getFeatureProperty('timestamp', data));
        this.rawMessage = getFeatureProperty('rawMessage', data);
        this.textDescription = getFeatureProperty('textDescription', data);
        this.iconUrl = getFeatureProperty('icon', data);
        this.presentWeather = getFeatureProperty('presentWeather', data);
        this.values = {};

        let values = [];
        Object.keys(data['properties']).forEach(function (key) {
            if (data['properties'][key] && data['properties'][key]['value'] && data['properties'][key]['unitCode']) {
                values[key] = toValueUnits(data['properties'][key]);
            }
        });
        this.values = values;

        let cloudLayers = data['properties']['cloudLayers'];
        if (cloudLayers) {
            this.cloudLayers = [];
            for (let i = 0; i < cloudLayers.length; i++) {
                this.cloudLayers.push({
                    'base': (cloudLayers['value'] && cloudLayers['unitCode']) ? toValueUnits(cloudLayers['base']) : null,
                    'amount': cloudLayers['amount']
                });
            }
        }
    }
}

export function observationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
        return new Observation(feature);
    });
}