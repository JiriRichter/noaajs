/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { TidesAndCurrents } from '../src';
import { log } from 'console'
import { Datum, TidesAndWaterLevelPredictionsInterval, TimeZone, Units } from '../src/tidesandcurrents/data/types';

const stationId = "9447130";

test('data products', async () => {

    let predictions = await TidesAndCurrents.data.tidesAndWaterLevel.getPredictions(
        stationId,
        TidesAndCurrents.dateRange.today(),
        Datum.STND,
        Units.english,
        TimeZone.gmt,
        TidesAndWaterLevelPredictionsInterval.hilo);

    expect(predictions).not.toBeNull();
});

