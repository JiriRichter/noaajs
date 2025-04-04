
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

import { getBoolValue, getDateValue, getIntValue, getNumberValue, getStringValue } from "./utils";

export class ForecastPeriod {
    number: number;
    name: any;
    startTime: any;
    endTime: any;
    isDaytime: any;
    temperature: number;
    temperatureTrend: any;
    windSpeed: any;
    windDirection: any;
    icon: any;
    shortForecast: any;
    detailedForecast: any;
    temperatureUnit: string;

    constructor(data) {
        this.number = getIntValue('number', data);
        this.name = getStringValue('name', data);
        this.startTime = getDateValue('startTime', data);
        this.endTime = getDateValue('endTime', data);
        this.isDaytime = getBoolValue('isDaytime', data);
        this.temperature = getNumberValue('temperature', data);
        this.temperatureUnit = getStringValue('temperatureUnit', data);
        this.temperatureTrend = getStringValue('temperatureTrend', data);
        this.windSpeed = getStringValue('windSpeed', data);
        this.windDirection = getStringValue('windDirection', data);
        this.icon = getStringValue('icon', data);
        this.shortForecast = getStringValue('shortForecast', data);
        this.detailedForecast = getStringValue('detailedForecast', data);
    }
}