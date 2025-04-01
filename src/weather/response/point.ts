import { Feature } from './feature';
import { Office } from './office';
import { RelativeLocation, toRelativeLocation } from './relative-location';
import { toGridPoints } from '../endpoints/gridpoints';
import { toAlerts } from '../endpoints/alerts';
import { toStations } from '../endpoints/stations';
import { toXY } from '../../utils/xy';
import { getUrlPart, getFeatureProperty } from './utils';
import { GridPoint } from './gridpoint';


/* @class Point
 * @aka NOAA.Point
 *
 * Represents response from /points endpoint.
 * */
class Point extends Feature {
    xy: any;
    office: Office;
    forecastZone: any;
    timeZone: any;
    radarStation: any;
    relativeLocation: RelativeLocation | null;
    county: any;
    fireWeatherZone: any;

    constructor(data) {
        super(data);

        this.xy = toXY(getFeatureProperty('gridX', data), getFeatureProperty('gridY', data));
        this.office = new Office(getFeatureProperty('cwa', data));
        this.forecastZone = getUrlPart(getFeatureProperty('forecastZone', data), -1);
        this.timeZone = getFeatureProperty('timeZone', data);
        this.radarStation = getFeatureProperty('radarStation', data);
        this.relativeLocation = toRelativeLocation(getFeatureProperty('relativeLocation', data));

        // optional properties
        this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
        this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
    }

    async getAlerts(params = {}) {
        params['point'] = this.geometry.latlon;
        return await toAlerts().get(params);
    }

    async getGridPoint() : Promise<GridPoint> {
        return await toGridPoints(this.office.id, this.xy).get();
    }

    async getGridPointForecast() {
        return await toGridPoints(this.office.id, this.xy).getForecast();
    }

    async getGridPointForecastHourly() {
        return await toGridPoints(this.office.id, this.xy).getForecastHourly();
    }

    async getGridPointStations() {
        return await toGridPoints(this.office.id, this.xy).getStations();
    }
}

export { Point };