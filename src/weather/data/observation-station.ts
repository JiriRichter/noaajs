import { getProperty, getStringValue } from '../../utils/json';
import { FeaturePoint } from './feature-point';
import { QuantitativeValue } from './quantitative-value';
import { getStringValueFromUrl } from './utils';

export class ObservationStation extends FeaturePoint {
    public id: string;
    public elevation: QuantitativeValue;
    public name: string;
    public timeZone: string;
    public forecastZone: string;
    public county: string;
    public fireWeatherZone: string;

    constructor(data: any) {
        super(data);

        const properties = getProperty('properties', data);

        this.elevation = new QuantitativeValue(getProperty('elevation', properties));
        this.id = getStringValue('stationIdentifier', properties);
        this.name = getStringValue('name', properties);
        this.timeZone = getStringValue('timeZone', properties);

        if ('forecast' in properties) {
            this.forecastZone = getStringValueFromUrl(getStringValue('forecast', properties));
        }
        if ('county' in properties) {
            this.county = getStringValueFromUrl(getStringValue('county', properties));
        }
        if ('fireWeatherZone' in properties) {
            this.fireWeatherZone = getStringValueFromUrl(getStringValue('fireWeatherZone', properties));
        }
    }
}
