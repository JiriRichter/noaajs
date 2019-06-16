import { toTime } from '../utils/time';
import { ZoneForecastPeriod } from './zone-forecast-period';

/* @class ZoneForecast
 * @aka NOAA.ZoneForecast
 *
 * Represents response from /zones/{type}/{zoneId}/forecast endpoint.
 * */
export class ZoneForecast {
    constructor(data) {
        this.updated = toTime(data['updated']);
        this.periods = [];
        for (let i = 0; i < data['periods'].length; i++) {
            this.periods.push(new ZoneForecastPeriod(data['periods'][i]));
        }
    }
}