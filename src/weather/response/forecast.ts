import { Feature } from './feature';
import { toValueUnits, ValueUnits } from '../../utils/value-units';
import { toTime } from '../../utils/time';
import { toValidTimePeriod, ValidTimePeriod } from './valid-time-period';
import { ForecastPeriod } from './forecast-period';
import { getFeatureProperty } from './utils';

/* @class Forecast
 * @aka NOAA.Forecast
 *
 * Represents response from /gridpoints/{wfo}/{x},{y}/forecast endpoint.
 * */
export class Forecast extends Feature {
    units: any;
    forecastGenerator: any;
    generatedAt: any;
    updateTime: any;
    validTimes: ValidTimePeriod;
    elevation: ValueUnits;
    periods: ForecastPeriod[];

    constructor(data) {
        super(data);

        this.units = getFeatureProperty('units', data);
        this.forecastGenerator = getFeatureProperty('forecastGenerator', data);
        this.generatedAt = toTime(getFeatureProperty('generatedAt', data));
        this.updateTime = toTime(getFeatureProperty('updateTime', data));
        this.validTimes = toValidTimePeriod(getFeatureProperty('validTimes', data));
        this.elevation = toValueUnits(getFeatureProperty('elevation', data));
        this.periods = [];
        for (let i = 0; i < getFeatureProperty('periods', data).length; i++) {
            this.periods.push(new ForecastPeriod(getFeatureProperty('periods', data)[i]));
        }
    }
}