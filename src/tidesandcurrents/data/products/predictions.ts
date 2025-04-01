import { parseFloatValue, parseTime } from '../../utils';
import { TidesAndCurrentsDataApi } from '../api';
import { DataProduct, Datum, Interval, Units } from '../const';

export class Predictions extends TidesAndCurrentsDataApi {
    constructor(stationId, datum?) {
        if (!datum) {
            datum = Datum.STND;
        }
        super(stationId, DataProduct.predictions, datum, Interval.hilo, Units.metric);
    }

    parseResponse(data) {
        let predictions: any[] = [];
        data['predictions'].forEach(function (d) {
            predictions.push({
                'time': parseTime(d['t']),
                'value': parseFloatValue(d['v'], 'm'),
                'type': d['type']
            });
        });
        return predictions;
    }
}