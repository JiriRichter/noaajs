import { parseFloatValue } from '../../utils';
import { TidesAndCurrentsDataApi } from '../api';
import { DataProduct, Units } from '../const';

export class Datums extends TidesAndCurrentsDataApi {
    constructor(stationId) {
        super(stationId, DataProduct.datums, undefined, undefined, Units.metric);
    }

    parseResponse(data) {
        let datums: any[] = [],
            self = this;
        data['datums'].forEach(function (d) {
            datums.push({
                'name': d['n'],
                'value': parseFloatValue(d['v'], 'm')
            });
        });
        return datums;
    }
}