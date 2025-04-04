import { getDateValue } from './utils';
import { ZoneForecastPeriod } from './zone-forecast-period';

export class ZoneForecast {
    updated: Date;
    periods: any[];
    
    constructor(data: any) {
        this.updated = getDateValue('updated', data);
        this.periods = [];
        if (data['periods']) {
            for (let i = 0; i < data['periods'].length; i++) {
                this.periods.push(new ZoneForecastPeriod(data['periods'][i]));
            }
        }
    }
}