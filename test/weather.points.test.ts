/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { PointsApi } from '../src/weather/api/points';
import { Point } from '../src/weather/response/point';

const timeout = 10000;

test('getPoint', async () => {
  const points = new PointsApi();
  const point: Point = await points.getPoint(39.7456, -97.0892);
  expect(point).not.toBeNull();
}, timeout);