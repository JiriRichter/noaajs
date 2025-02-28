const TidesAndCurrents = {};

import { stations } from './stations.js';
import { findClosestStation } from './geo.js';
import { Format, Datum, DataProduct, Units, Interval } from './const.js';

import { Datums } from './products/datums.js';
import { Predictions } from './products/predictions.js';
import { Wind } from './products/wind.js';

TidesAndCurrents.api = {};
TidesAndCurrents.api.format = Format;
TidesAndCurrents.api.datum = Datum;
TidesAndCurrents.api.product = DataProduct;
TidesAndCurrents.api.units = Units;
TidesAndCurrents.api.interval = Interval;

TidesAndCurrents.stations = stations;
TidesAndCurrents.stations.findClosest = findClosestStation;

TidesAndCurrents.products = {};
TidesAndCurrents.products.predictions = function (stationId, datum) {
    return new Predictions(stationId, datum);
};
TidesAndCurrents.products.datums = function (stationId) {
    return new Datums(stationId);
};
TidesAndCurrents.products.wind = function (stationId, interval) {
    return new Wind(stationId, interval);
};


export { TidesAndCurrents };

