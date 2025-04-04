import { NumericValue } from "./numeric-value";
import { ForecastPeriod } from "./forecast-period";
import { ValidTimePeriod } from "./valid-time-period";
import { getDateValue, getProperty, getStringValue } from "./utils";

export class Forecast {
    units: any;
    forecastGenerator: any;
    generatedAt: any;
    updateTime: any;
    validTimes: ValidTimePeriod;
    elevation: NumericValue;
    periods: ForecastPeriod [];

    constructor(data: any) {

        const properties = getProperty('properties', data);
        
        this.units = getStringValue('units', properties);
        this.forecastGenerator = getStringValue('forecastGenerator', properties);
        this.generatedAt = getDateValue('generatedAt', properties);
        this.updateTime = getDateValue('updateTime', properties);
        this.validTimes = new ValidTimePeriod(getStringValue('validTimes', properties));
        this.elevation = new NumericValue(getProperty('elevation', properties));
        this.periods = (getProperty('periods', properties) as any[]).map(period => new ForecastPeriod(period));
    }
}