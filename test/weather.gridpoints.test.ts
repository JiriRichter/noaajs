/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { PointsApi } from '../src/weather/api/points';
import { Point } from '../src/weather/response/point';
import { GridPointsApi } from '../src/weather/api/gridpoints';

const timeout = 10000;

const points = new PointsApi();

test('getGridPointForecast', async () => {
  const point: Point = await points.getPoint(39.7456, -97.0892);

  const gridpoints = new GridPointsApi();
  const forecast = await gridpoints.getForecast(point.office, point.gridX, point.gridY);
  expect(forecast).not.toBeNull();
}, timeout);

test('getGridPointForecastHourly', async () => {
  const point: Point = await points.getPoint(39.7456, -97.0892);

  const gridpoints = new GridPointsApi();
  const forecast = await gridpoints.getForecastHourly(point.office, point.gridX, point.gridY);
  expect(forecast).not.toBeNull();
}, timeout);
