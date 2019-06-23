import { Format, Datum, DataProduct, Units, Interval, TimeZone } from './const.js';
import moment from 'moment';
import { stations } from './stations';
import { toTime } from '../utils/time';
import { toValueUnits } from '../response/value-units';

export class COOPSApi {
    constructor(stationId, product, datum = undefined, interval = undefined, units = 'metric') {
        let validStation = false,
            i;

        if (!(product in DataProduct)) {
            throw new Error('Invalid data product');
        }

        if (!(units in Units)) {
            throw new Error('Invalid units');
        }

        for (i = 0; i < stations['features'].length; i++) {
            if (stations['features'][i]['properties']['id'] === stationId) {
                validStation = true;
                break;
            }
        }

        if (!validStation) {
            throw new Error('Invalid station ID');
        }

        this.params = {};
        this.params['station'] = stationId;
        this.params['product'] = product;
        this.params['format'] = Format.json;
        this.params['units'] = units;
        this.params['time_zone'] = TimeZone.gmt;
        if (datum) {
            if (!(datum in Datum)) {
                throw new Error('Invalid datum value');
            }
            this.params['datum'] = datum;
        }
        if (interval) {
            if (!(interval in Interval)) {
                throw new Error('Invalid interval');
            }
            this.params['interval'] = interval;
        }
    }

    formatDate(date) {
        return moment(date).format('yyyyMMdd HH:mm');
    }

    getLatest() {
        this.params['date'] = 'latest';
        return this.get();
    }

    getRecent() {
        this.params['date'] = 'recent';
        return this.get();
    }

    getToday() {
        this.params['date'] = 'today';
        return this.get();
    }

    getLastHours(hours) {
        this.params['range'] = hours;
        return this.get();
    }

    getHoursAfter(start, hours) {
        this.params['begin_date'] = this.formatDate(start);
        this.params['range'] = hours;
        return this.get();
    }

    getHoursBefore(end, hours) {
        this.params['end_date'] = this.formatDate(end);
        this.params['range'] = hours;
        return this.get();
    }

    getDateRange(start, end) {
        this.params['begin_date'] = this.formatDate(start);
        this.params['end_date'] = this.formatDate(end);
        return this.get();
    }

    get() {
        let self = this;

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let url = this.constructUrl();

            xhr.open('GET', url);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let json = JSON.parse(xhr.response);
                    if (json['error']) {
                        reject(json['error']);
                    }
                    else {
                        resolve(self.parseResponse(json));
                    }
                } else {
                    reject(xhr);
                }
            };

            xhr.onerror = () => {
                reject(xhr);
            };

            xhr.send();
        });
    }

    parseResponse(data) {
        return data;
    }

    constructUrl() {
        let params = this.params;

        return COOPSApi.url + '?' +
            Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    }

    parseTime(s) {
        //2019-06-20 03:30
        //2019-06-22T23:58:22+00:00
        return toTime(s.replace(' ', 'T') + ':00+00:00');
    }

    parseFloatValue(value, units) {
        return toValueUnits(parseFloat(value), units);
    }
}

/** The API end point */
COOPSApi.url = 'https://tidesandcurrents.noaa.gov/api/datagetter';
