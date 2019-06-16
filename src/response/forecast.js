import { Feature } from './feature';
import { toValueUnits } from './value-units';
import { toTime } from '../utils/time';
import { toValidTimePeriod } from './valid-time-period';
import { ForecastPeriod } from './forecast-period';

/* @class Forecast
 * @aka NOAA.Forecast
 *
 * Represents response from /gridpoints/{wfo}/{x},{y}/forecast endpoint.
 * */
export class Forecast extends Feature {
    constructor(data) {
        super(data);

        this.updated = toTime(this.getProperty('updated'));
        this.units = this.getProperty('units');
        this.forecastGenerator = this.getProperty('forecastGenerator');
        this.generatedAt = toTime(this.getProperty('generatedAt'));
        this.updateTime = toTime(this.getProperty('updateTime'));
        this.validTimes = toValidTimePeriod(this.getProperty('validTimes'));
        this.elevation = toValueUnits(this.getProperty('elevation'));
        this.periods = [];
        for (let i = 0; i < this.getProperty('periods').length; i++) {
            this.periods.push(new ForecastPeriod(this.getProperty('periods')[i]));
        }
    }
}