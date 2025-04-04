import { ApiBase } from './base';
import { Station } from '../response/station';
import { GridPoint } from '../response/gridpoint';
import { Forecast } from '../response/forecast';
import { Units } from './types';
import { getProperty } from '../response/utils';

export class GridPointsApi extends ApiBase {

    constructor() {
        super();
    }

    async getForecastData(officeId: string, x: number, y: number): Promise<GridPoint> {
        const data = await super.get(`gridpoint/${officeId}/${x},${y}`);
        return new GridPoint(data);
    }

    async getForecast(officeId: string, x: number, y: number, units: Units = Units.us): Promise<Forecast> {
        const data = await super.get(`gridpoint/${officeId}/${x},${y}/forecast`);
        return new Forecast(data);
    }

    async getForecastHourly(officeId: string, x: number, y: number, units: Units = Units.us): Promise<Forecast> {
        const data = await super.get(`gridpoint/${officeId}/${x},${y}/forecast/hourly`);
        return new Forecast(data);
    }

    async getStations(officeId: string, x: number, y: number): Promise<Station[]> {
        const data = await super.get(`gridpoint/${officeId}/${x},${y}/stations`);
        return (getProperty('features', data) as any[]).map(feature => new Station(feature));
    }
}