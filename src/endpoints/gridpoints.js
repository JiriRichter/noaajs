import { Endpoint } from './endpoint';
import { toXY } from '../utils/xy';
import { stationsToArray } from '../response/station';
import { GridPoint } from '../response/gridpoint';
import { Forecast } from '../response/forecast';

/* class GridPoints implements /gridpoints interface
 * */
export class GridPoints extends Endpoint {
    /**
     * 
     * @param {string} weatherForecastOffice
     * @param {XY} xy
     */
    constructor(weatherForecastOffice, xy) {
        super('/gridpoints');
        this.weatherForecastOffice = weatherForecastOffice;
        this.xy = xy;
    }

    get() {
        return super.get([this.weatherForecastOffice, this.xy], function (data) {
            return new GridPoint(data);
        });
    }

    getForecast(units) {
        if (units === undefined) {
            units = 'us';
        }
        return super.get([this.weatherForecastOffice, this.xy, 'forecast'], { 'units': units }, function (data) {
            return new Forecast(data);
        });
    }

    getForecastHourly(units) {
        if (units === undefined) {
            units = 'us';
        }
        return super.get([this.weatherForecastOffice, this.xy, 'forecast', 'hourly'], { 'units': units }, function (data) {
            return new Forecast(data);
        });
    }

    getStations() {
        return super.get([this.weatherForecastOffice, this.xy, 'stations'], function (data) {
            return stationsToArray(data);
        });
    }
}

// @factory NOAA.gridPoints(weatherForecastOffice:string, x: number, y:number): GridPoints
// Creates an object representing /gridpoints endpoint
export function toGridPoints(weatherForecastOffice, x, y) {
    return new GridPoints(weatherForecastOffice, toXY(x, y));
}