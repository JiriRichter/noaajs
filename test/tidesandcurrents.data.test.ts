import { expect, test } from '@jest/globals';
import { TidesAndCurrents } from '../src';
import { log } from 'console'

test('data products', () => {

    const stationId = "9447130";

    log('Datum');
    TidesAndCurrents.data.datums(stationId).get().then(function (data) {
        log(data);
    }, function (error) {
        log(error);
    });

    log('Predictions');
    TidesAndCurrents.data.predictions(stationId).getToday().then(function (data) {
        log(data);
    }, function (error) {
        log(error);
    });

    log('Wind');
    TidesAndCurrents.data.wind(stationId).getToday().then(function (data) {
        log(data);
    }, function (error) {
        log(error);
    });

});

