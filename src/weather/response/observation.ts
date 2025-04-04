import { NumericValue } from './numeric-value';
import { getDateValue, getProperty, getStringValue, getUrlPart } from './utils';

export class Observation {

    elevation: NumericValue;
    stationId: any;
    timestamp: any;
    rawMessage: any;
    textDescription: any;
    iconUrl: any;
    presentWeather: any;
    values: {};
    cloudLayers: any[];

    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.elevation = new NumericValue(getProperty('elevation', properties));
        this.stationId = getUrlPart(getStringValue('station', properties, true), -1);
        this.timestamp = getDateValue('timestamp', properties);
        this.rawMessage = getStringValue('rawMessage', properties);
        this.textDescription = getStringValue('textDescription', properties);
        this.iconUrl = getStringValue('icon', properties);
        this.presentWeather = getStringValue('presentWeather', properties);
        this.values = {};
    }
}