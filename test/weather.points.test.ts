/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { toPoints as points } from '../src/weather/endpoints/points';

const timeout = 10000;

test('getGridPointForecast', async () => {
  const point = await points([39.7456, -97.0892]).get();
  const forecast = await point.getGridPointForecast();
  expect(forecast).not.toBeNull();
}, timeout);

test('getGridPointForecastHourly', async () => {
  const point = await points([39.7456, -97.0892]).get();
  const forecast = await point.getGridPointForecastHourly();
  expect(forecast).not.toBeNull();
}, timeout);

test('getGridPoint', async () => {
  const point = await points([39.7456, -97.0892]).get();
  const gridpoint = await point.getGridPoint();
  expect(gridpoint).not.toBeNull();
}, timeout);