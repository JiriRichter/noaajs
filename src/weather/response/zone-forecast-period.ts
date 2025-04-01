import { getValue } from './utils';

export class ZoneForecastPeriod {
    
    number: number;
    name: any;
    detailedForecast: any;

    constructor(data) {
        this.number = parseInt(getValue('number', data));
        this.name = getValue('name', data);
        this.detailedForecast = getValue('detailedForecast', data);
    }
}