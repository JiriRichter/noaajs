import { getProperty, parseDate } from '../../utils/json';
import { TidesAndCurrentsDataApi } from './data-api';
import { TidesAndCurrentsDateRangeParameters } from './data-range';
import { QueryBuilder } from './query-builder';
import { Datum, TidesAndWaterLevelDataProduct, TidesAndWaterLevelPredictionsInterval, TimeZone, Units } from './types';

export class TideAndWaterLevelDataApi extends TidesAndCurrentsDataApi {
    constructor() {
        super();
    }

    async getPredictions(
        stationId: string, 
        dateRange: TidesAndCurrentsDateRangeParameters,
        datum: Datum,
        units: Units,
        timezone: TimeZone,
        interval: TidesAndWaterLevelPredictionsInterval
    ): Promise<any> {

        const queryBuilder = new QueryBuilder()
            .station(stationId)
            .product(TidesAndWaterLevelDataProduct.predictions)
            .datum(datum)
            .units(units)
            .timezone(timezone)
            .dateRange(dateRange)
            .interval(interval);

        const data = await this.get(queryBuilder.build());

        const predictions = getProperty('predictions', data) as any[];

        (data['predictions'] as any[]).forEach((d) => {
            predictions.push({
                'time': parseDate(d['t']),
                'value': parseFloat(d['v']),
                'type': d['type']
            });
        });
        return predictions;
    }
}