import { ApiBase } from './base';
import { GridpointData } from '../data/gridpoint-data';
import { GridpointForecast } from '../data/gridpoint-forecast';
import { GridpointForecastUnits } from '../data/types';
import { NWSForecastOfficeId } from '../data/office-id';
import { ObservationStationPage } from '../data/observation-station-page';

export class GridpointsApi extends ApiBase {

    constructor() {
        super();
    }

    async getData(officeId: NWSForecastOfficeId, x: number, y: number): Promise<GridpointData> {
        const data = await super.get(`gridpoints/${officeId}/${x},${y}`);
        return new GridpointData(data);
    }

    async getForecast(officeId: NWSForecastOfficeId, x: number, y: number, units: GridpointForecastUnits = GridpointForecastUnits.us): Promise<GridpointForecast> {
        const data = await super.get(`gridpoints/${officeId}/${x},${y}/forecast`);
        return new GridpointForecast(data);
    }

    async getForecastHourly(officeId: NWSForecastOfficeId, x: number, y: number, units: GridpointForecastUnits = GridpointForecastUnits.us): Promise<GridpointForecast> {
        const data = await super.get(`gridpoints/${officeId}/${x},${y}/forecast/hourly`);
        return new GridpointForecast(data);
    }

    async getStations(officeId: NWSForecastOfficeId, x: number, y: number): Promise<ObservationStationPage> {
        const data = await super.get(`gridpoints/${officeId}/${x},${y}/stations`);
        return new ObservationStationPage(data);
    }

    async getStationsNext(page: ObservationStationPage): Promise<ObservationStationPage> {
        const data = await super.getNext(page);
        return new ObservationStationPage(data);
    } 
}