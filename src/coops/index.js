const TidesAndCurrents = {};

import { stations } from './stations';
import { findClosestStation } from './geo';
import { Format, Datum, DataProduct, Units, Interval } from './const.js';

import { Datums } from './products/datums';
import { Predictions } from './products/predictions';
import { Wind } from './products/wind';

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

