
/*
    "number": 3,
    "name": "Thursday",
    "startTime": "2019-06-13T06:00:00-05:00",
    "endTime": "2019-06-13T18:00:00-05:00",
    "isDaytime": true,
    "temperature": 76,
    "temperatureUnit": "F",
    "temperatureTrend": null,
    "windSpeed": "0 to 10 mph",
    "windDirection": "SW",
    "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
    "shortForecast": "Sunny",
    "detailedForecast": "Sunny, with a high near 76. Southwest wind 0 to 10 mph."
*/

import { QuantitativeValue } from "./quantitative-value";
import { TemperatureTrend, TemperatureUnit, WindDirection } from "./types";
import { getBoolValue, getDateValue, getIntValue, getFloatValue, getStringValue } from "./utils";

export class GridpointForecastPeriod {
    public number: number;
    public name?: string;
    public startTime: Date;
    public endTime: Date;
    public isDaytime: boolean;
    public temperature: number;
    public temperatureUnit: TemperatureUnit;
    public temperatureTrend: TemperatureTrend;
    public windSpeed: string;
    public windGust?: string;
    public windDirection: WindDirection;
    public probabilityOfPrecipitation?: QuantitativeValue;
    public dewpoint?: QuantitativeValue;
    public relativeHumidity?: QuantitativeValue;
    public icon?: string;
    public shortForecast: string;
    public detailedForecast: string;

    constructor(data: any) {
        this.number = getIntValue('number', data);
        if ('name' in data) {
            this.name = getStringValue('name', data);
        }
        this.startTime = getDateValue('startTime', data);
        this.endTime = getDateValue('endTime', data);
        this.isDaytime = getBoolValue('isDaytime', data);
        this.temperature = getFloatValue('temperature', data);
        this.temperatureUnit = TemperatureUnit[getStringValue('temperatureUnit', data)];
        this.temperatureTrend = TemperatureTrend[getStringValue('temperatureTrend', data)];
        this.windSpeed = getStringValue('windSpeed', data);
        if ('windGust' in data) {
            this.windGust = getStringValue('windGust', data);
        }
        this.windDirection = WindDirection[getStringValue('windDirection', data)];

        if ('probabilityOfPrecipitation' in data) {
            this.windGust = getStringValue('probabilityOfPrecipitation', data);
        }
        if ('dewpoint' in data) {
            this.windGust = getStringValue('dewpoint', data);
        }
        if ('relativeHumidity' in data) {
            this.windGust = getStringValue('relativeHumidity', data);
        }

        if ('icon' in data) {
            this.icon = getStringValue('icon', data);
        }
        if ('shortForecast' in data) {
            this.shortForecast = getStringValue('shortForecast', data);
        }
        if ('detailedForecast' in data) {
            this.detailedForecast = getStringValue('detailedForecast', data);
        }
    }
}