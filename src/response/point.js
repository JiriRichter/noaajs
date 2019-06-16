import { Feature } from './feature';
import { Office } from './office';
import { toRelativeLocation } from './relative-location';
import { toGridPoints } from '../endpoints/gridpoints';
import { toAlerts } from '../endpoints/alerts';
import { toStations } from '../endpoints/stations';
import { toXY } from '../utils/xy';
import { getUrlParameter } from '../utils/parameters';


/* @class Point
 * @aka NOAA.Point
 *
 * Represents response from /points endpoint.
 * */
class Point extends Feature {
    constructor(data) {
        super(data);

        this.xy = toXY(this.getProperty('gridX'), this.getProperty('gridY'));
        this.office = new Office(this.getProperty('cwa'));
        this.forecastZone = getUrlParameter(this.getProperty('forecastZone'), -1);
        this.timeZone = this.getProperty('timeZone');
        this.radarStation = this.getProperty('radarStation');
        this.relativeLocation = toRelativeLocation(this.getProperty('relativeLocation'));

        // optional properties
        this.county = getUrlParameter(this.getProperty('county', true), -1);
        this.fireWeatherZone = getUrlParameter(this.getProperty('fireWeatherZone', true), -1);
    }

    getAlerts(params = {}) {
        params['point'] = this.geometry.latlon;
        return toAlerts().get(params);
    }

    getGridPoint() {
        return toGridPoints(this.office.id, this.xy).get();
    }

    getRadar() {
        if (this.radarStation) {
            return toStations().getRadar(this.radarStation);
        }
        else {
            return null;
        }
    }

    getGridPointForecast() {
        return toGridPoints(this.office.id, this.xy).getForecast();
    }

    getGridPointForecastHourly() {
        return toGridPoints(this.office.id, this.xy).getForecastHourly();
    }

    getGridPointStations() {
        return toGridPoints(this.office.id, this.xy).getStations();
    }
}

export { Point };