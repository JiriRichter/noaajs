import { getUrlPart, getProperty, getStringValue } from './utils';
import { GeometryPoint } from './geometry-point';
import { NumericValue } from './numeric-value';

export class Station extends GeometryPoint {
    id: string;
    elevation: NumericValue;
    name: string;
    timeZone: string;
    forecastZone: string;
    county: string;
    fireWeatherZone: string;

    constructor(data: any) {
        super(data);

        const properties = getProperty('properties', data);

        this.elevation = new NumericValue(getProperty('elevation', properties));
        this.id = getStringValue('stationIdentifier', properties);
        this.name = getStringValue('name', properties);
        this.timeZone = getStringValue('timeZone', properties);

        this.forecastZone = getUrlPart(getStringValue('forecast', properties, true), -1);
        this.county = getUrlPart(getStringValue('county', properties, true), -1);
        this.fireWeatherZone = getUrlPart(getStringValue('fireWeatherZone', properties, true), -1);
    }
}
