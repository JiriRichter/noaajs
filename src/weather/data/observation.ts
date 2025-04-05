import { QuantitativeValue } from './quantitative-value';
import { getDateValue, getProperty, getStringValue, getStringValueFromUrl } from './utils';

export class Observation {

    elevation: QuantitativeValue;
    stationId?: string;
    timestamp: Date;
    rawMessage: string;
    textDescription: string;
    iconUrl: string;
    presentWeather: string;
    values: {};
    cloudLayers: string[];

    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.elevation = new QuantitativeValue(getProperty('elevation', properties));

        if ('station' in properties) {
            this.stationId = getStringValueFromUrl(getStringValue('station', properties));
        }
        this.timestamp = getDateValue('timestamp', properties);
        this.rawMessage = getStringValue('rawMessage', properties);
        this.textDescription = getStringValue('textDescription', properties);
        this.iconUrl = getStringValue('icon', properties);
        this.presentWeather = getStringValue('presentWeather', properties);
        this.values = {};
    }
}