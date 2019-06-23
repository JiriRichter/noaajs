import { COOPSApi } from '../api';
import { DataProduct, Units } from '../const';

export class Datums extends COOPSApi {
    constructor(stationId) {
        super(stationId, DataProduct.datums, undefined, undefined, Units.metric);
    }

    parseResponse(data) {
        let datums = [],
            self = this;
        data['datums'].forEach(function (d) {
            datums.push({
                'name': d['n'],
                'value': self.parseFloatValue(d['v'], 'm')
            });
        });
        return datums;
    }
}