import { toTime } from '../utils/time';
import { toValueUnits } from './value-units';

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
    constructor(data) {
        this.number = parseInt(data['number']);
        this.name = data['name'];
        this.startTime = toTime(data['startTime']);
        this.endTime = toTime(data['endTime']);
        this.isDaytime = data['isDaytime'];
        this.temperature = toValueUnits(data['temperature'], data['temperatureUnit']);
        this.temperatureTrend = data['temperatureTrend'];
        this.windSpeed = data['windSpeed'];
        this.windDirection = data['windDirection'];
        this.icon = data['icon'];
        this.shortForecast = data['shortForecast'];
        this.detailedForecast = data['detailedForecast'];
    }
}