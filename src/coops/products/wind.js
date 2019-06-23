import { COOPSApi } from '../api';
import { DataProduct, Units } from '../const';

export class Wind extends COOPSApi {
    constructor(stationId, interval) {
        super(stationId, DataProduct.wind, undefined, interval, Units.metric);
    }

    parseResponse(data) {
        return data;
    }
}