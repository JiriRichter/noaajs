import { Datum, Units, TimeZone, TidesAndWaterLevelPredictionsInterval, CurrentDataInterval, CurrentPredictionsInterval, MeteorologicalDataInterval, TidesAndWaterLevelDataProduct, MeteorologicalDataProduct, CurrentsDataProduct, OperationalForecastDataProduct } from './types';
import { TidesAndCurrentsDateRangeDate, TidesAndCurrentsDateRangeParameters } from './data-range';
import { formatDate } from '../utils';

export type QueryParameters = {
    station?: string,
    product?: TidesAndWaterLevelDataProduct | MeteorologicalDataProduct | CurrentsDataProduct | OperationalForecastDataProduct,
    date?: TidesAndCurrentsDateRangeDate,
    range?: number,
    begin_date?: string,
    end_date?: string,
    units: Units,
    time_zone: TimeZone,
    interval?: TidesAndWaterLevelPredictionsInterval | CurrentDataInterval | CurrentPredictionsInterval | MeteorologicalDataInterval,
    datum?: Datum,
    format: string 
};

export class QueryBuilder {

    public queryParameters: QueryParameters;

    constructor() {
        this.queryParameters = {
            format: "json",
            time_zone: TimeZone.gmt,
            units: Units.english
        };
    }

    station(id: string): QueryBuilder {
        this.queryParameters.station = id; 
        return this;
    }

    product(product: TidesAndWaterLevelDataProduct | MeteorologicalDataProduct | CurrentsDataProduct | OperationalForecastDataProduct): QueryBuilder {
        this.queryParameters.product = product;
        return this;
    }

    interval(interval: TidesAndWaterLevelPredictionsInterval | MeteorologicalDataInterval | CurrentDataInterval | CurrentPredictionsInterval): QueryBuilder {
        this.queryParameters.interval = interval;
        return this;
    }
    
    datum(datum: Datum): QueryBuilder {
        this.queryParameters.datum = datum; 
        return this;
    }

    timezone(timezone: TimeZone): QueryBuilder {
        this.queryParameters.time_zone = timezone; 
        return this;
    }

    units(units: Units): QueryBuilder {
        this.queryParameters.units = units; 
        return this;
    }

    dateRange(rangeParameters: TidesAndCurrentsDateRangeParameters): QueryBuilder {
        if (rangeParameters.begin_date) {
            this.queryParameters.begin_date = formatDate(rangeParameters.begin_date); 
        }
        if (rangeParameters.end_date) {
            this.queryParameters.end_date = formatDate(rangeParameters.end_date); 
        }
        if (rangeParameters.date) {
            this.queryParameters.date = rangeParameters.date; 
        }
        if (rangeParameters.range) {
            this.queryParameters.range = rangeParameters.range; 
        }
        return this;
    }

    build() : QueryParameters {

        return this.queryParameters;

    }
}