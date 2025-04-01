import { Format, Datum, DataProduct, Units, Interval, TimeZone } from './const';
import { appendQueryString, formatDate } from '../utils'

export class TidesAndCurrentsDataApi {

    private params: any;

    /** The API end point */
    static url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

    constructor(stationId, product, datum: any = undefined, interval: any = undefined, units = 'metric') {

        if (!(product in DataProduct)) {
            throw new Error('Invalid data product');
        }

        if (!(units in Units)) {
            throw new Error('Invalid units');
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
        this.params['begin_date'] = formatDate(start);
        this.params['range'] = hours;
        return this.get();
    }

    getHoursBefore(end, hours) {
        this.params['end_date'] = formatDate(end);
        this.params['range'] = hours;
        return this.get();
    }

    getDateRange(start, end) {
        this.params['begin_date'] = formatDate(start);
        this.params['end_date'] = formatDate(end);
        return this.get();
    }

    get() {
        let self = this;

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let url = appendQueryString(TidesAndCurrentsDataApi.url, this.params);

            xhr.open('GET', url);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let json = JSON.parse(xhr.response);
                    if (json['error']) {
                        reject(json['error']);
                    }
                    else {
                        let data = self.parseResponse(json);
                        data['parameters'] = Object.assign({}, self.params);
                        resolve(data);
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
}