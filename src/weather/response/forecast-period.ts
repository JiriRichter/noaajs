import { toTime } from '../../utils/time';
import { toValueUnits, ValueUnits } from '../../utils/value-units';
import { getValue } from './utils';

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

export class ForecastPeriod {
    number: number;
    name: any;
    startTime: any;
    endTime: any;
    isDaytime: any;
    temperature: ValueUnits;
    temperatureTrend: any;
    windSpeed: any;
    windDirection: any;
    icon: any;
    shortForecast: any;
    detailedForecast: any;

    constructor(data) {
        this.number = parseInt(getValue('number', data));
        this.name = getValue('name', data);
        this.startTime = toTime(getValue('startTime', data));
        this.endTime = toTime(getValue('endTime', data));
        this.isDaytime = getValue('isDaytime', data);
        this.temperature = toValueUnits(getValue('temperature', data), getValue('temperatureUnit', data));
        this.temperatureTrend = getValue('temperatureTrend', data);
        this.windSpeed = getValue('windSpeed', data);
        this.windDirection = getValue('windDirection', data);
        this.icon = getValue('icon', data);
        this.shortForecast = getValue('shortForecast', data);
        this.detailedForecast = getValue('detailedForecast', data);
    }
}