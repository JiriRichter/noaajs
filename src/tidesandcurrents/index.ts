import { Format, Datum, DataProduct, Units, Interval } from './data/const';

import { Datums } from './data/products/datums';
import { Predictions } from './data/products/predictions';
import { Wind } from './data/products/wind';
import { TidesAndCurrentsMetadataApi } from './metadata/api';
import { StationType } from './metadata/station-type';

export const TidesAndCurrents = {
    Format: Format,
    Datum: Datum,
    DataProduct: DataProduct,
    Units: Units,
    Interval: Interval,
    StationType: StationType,

    data: {
        predictions: function (stationId, datum?) {
            return new Predictions(stationId, datum);
        },
        datums: function (stationId) {
            return new Datums(stationId);
        },
        wind: function (stationId, interval?) {
            return new Wind(stationId, interval);
        }
    },

    metadata: new TidesAndCurrentsMetadataApi()
};

