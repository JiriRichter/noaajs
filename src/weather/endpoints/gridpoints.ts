import { Endpoint } from './endpoint';
import { toXY } from '../../utils/xy';
import { stationsToArray } from '../response/station';
import { GridPoint } from '../response/gridpoint';
import { Forecast } from '../response/forecast';

/* class GridPoints implements /gridpoints interface
 * */
export class GridPoints extends Endpoint {
    weatherForecastOffice: any;
    xy: any;
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

    async get(): Promise<GridPoint> {
        const data = await super.get([this.weatherForecastOffice, this.xy]);
        return new GridPoint(data);
    }

    async getForecast(units?): Promise<any> {
        if (units === undefined) {
            units = 'us';
        }
        const data = await super.get([this.weatherForecastOffice, this.xy, 'forecast'], { 'units': units });
            return new Forecast(data);
    }

    async getForecastHourly(units?) {
        if (units === undefined) {
            units = 'us';
        }
        const data = await super.get([this.weatherForecastOffice, this.xy, 'forecast', 'hourly'], { 'units': units });
        return new Forecast(data);
    }

    async getStations() {
        const data = await super.get([this.weatherForecastOffice, this.xy, 'stations']);
        return stationsToArray(data);
    }
}

// @factory NOAA.gridPoints(weatherForecastOffice:string, x: number, y:number): GridPoints
// Creates an object representing /gridpoints endpoint
export function toGridPoints(weatherForecastOffice, x, y?): GridPoints {
    return new GridPoints(weatherForecastOffice, toXY(x, y));
}