import { QuantitativeValue } from "./quantitative-value";
import { GridpointForecastPeriod } from "./gridpoint-forecast-period";
import { Interval } from "./interval";
import { getDateValue, getProperty, getStringValue } from "../../utils/json";
import { GridpointForecastUnits } from "./types";
import { FeaturePolygon } from "./feature-polygon";

export class GridpointForecast extends FeaturePolygon {

    public units: GridpointForecastUnits;
    public forecastGenerator?: string;
    public generatedAt: Date;
    public updateTime: Date;
    public validTimes: Interval;
    public elevation: QuantitativeValue;
    public periods: GridpointForecastPeriod[];

    constructor(data: any) {
        super(data);

        const properties = getProperty('properties', data);
        
        this.units = GridpointForecastUnits[getStringValue('units', properties)];
        if ('forecastGenerator' in properties) {
            this.forecastGenerator = getStringValue('forecastGenerator', properties);
        }
        this.generatedAt = getDateValue('generatedAt', properties);
        this.updateTime = getDateValue('updateTime', properties);
        this.validTimes = new Interval(getStringValue('validTimes', properties));
        this.elevation = new QuantitativeValue(getProperty('elevation', properties));
        this.periods = (getProperty('periods', properties) as any[]).map(period => new GridpointForecastPeriod(period));
    }
}