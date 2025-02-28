import { TidesAndCurrentsApi } from '../api';
import { DataProduct, Datum, Interval, Units } from '../const';

export class Predictions extends TidesAndCurrentsApi {
    constructor(stationId, datum) {
        if (!datum) {
            datum = Datum.STND;
        }
        super(stationId, DataProduct.predictions, datum, Interval.hilo, Units.metric);
    }

    parseResponse(data) {
        let predictions = [],
            self = this;
        data['predictions'].forEach(function (d) {
            predictions.push({
                'time': self.parseTime(d['t']),
                'value': self.parseFloatValue(d['v'], 'm'),
                'type': d['type']
            });
        });
        return predictions;
    }
}