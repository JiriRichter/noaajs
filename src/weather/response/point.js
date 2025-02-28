import { Feature } from './feature';
import { Office } from './office';
import { toRelativeLocation } from './relative-location';
import { toGridPoints } from '../endpoints/gridpoints';
import { toAlerts } from '../endpoints/alerts';
import { toStations } from '../endpoints/stations';
import { toXY } from '../../utils/xy';
import { getUrlPart, getFeatureProperty } from './utils';


/* @class Point
 * @aka NOAA.Point
 *
 * Represents response from /points endpoint.
 * */
class Point extends Feature {
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