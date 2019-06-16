import { Feature } from './feature';
import { featureCollectionToArray } from './feature-collection';
import { toValueUnits } from './value-units';
import { toTime } from '../utils/time';
import { getUrlParameter } from '../utils/parameters';

/* @class Observation
 * @aka NOAA.Observation
 *
 * */
export class Observation extends Feature {
    constructor(data) {
        super(data);

        this.elevation = toValueUnits(this.getProperty('elevation'));
        this.stationId = getUrlParameter(this.getProperty('station', true), -1);
        this.timestamp = toTime(this.getProperty('timestamp'));
        this.rawMessage = this.getProperty('rawMessage');
        this.textDescription = this.getProperty('textDescription');
        this.iconUrl = this.getProperty('icon');
        this.presentWeather = this.getProperty('presentWeather');
        this.values = {};

        let self = this;
        Object.keys(this.properties).forEach(function (key) {
            if (self.properties[key] && self.properties[key]['value'] && self.properties[key]['unitCode']) {
                self.values[key] = toValueUnits(self.properties[key]);
            }
        });

        let cloudLayers = this.properties['cloudLayers'];
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