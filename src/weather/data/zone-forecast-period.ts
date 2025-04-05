import { getIntValue, getStringValue } from './utils';

export class ZoneForecastPeriod {
    
    number: number;
    name: any;
    detailedForecast: any;

    constructor(data) {
        this.number = getIntValue('number', data);
        this.name = getStringValue('name', data);
        this.detailedForecast = getStringValue('detailedForecast', data);
    }
}