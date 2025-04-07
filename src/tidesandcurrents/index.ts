import { Datum, Units } from './data/types';
import { TidesAndCurrentsMetadataApi } from './metadata/api';
import { StationType } from './metadata/station-type';
import { TideAndWaterLevelDataApi } from './data/tide-and-water-level-data-api';
import { TidesAndCurrentsDateRange } from './data/data-range';

export const TidesAndCurrents = {
    Datum: Datum,
    Units: Units,
    StationType: StationType,

    dateRange: TidesAndCurrentsDateRange,

    data: {

        tidesAndWaterLevel: new TideAndWaterLevelDataApi

    },

    metadata: new TidesAndCurrentsMetadataApi()
};

