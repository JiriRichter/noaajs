/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { PointsApi } from '../src/weather/api/points';
import { Point } from '../src/weather/data/point';
import { testFeaturePoint, testQuantitativeValue } from './test-utils';

const timeout = 10000;

test('getPoint', async () => {
  const points = new PointsApi();
  const point: Point = await points.getPoint(39.7456, -97.0892);
  
  expect(point).not.toBeNull();
  testFeaturePoint(point, 39.7456, -97.0892);
  expect(point.office).toEqual("TOP");
  expect(point.gridX).toEqual(32);
  expect(point.gridY).toEqual(81);
  expect(point.forecastZone).toEqual("KSZ009");
  expect(point.county).toEqual("KSC201");
  expect(point.fireWeatherZone).toEqual("KSZ009");
  expect(point.timeZone).toEqual("America/Chicago");
  expect(point.radarStation).toEqual("KTWX");

  expect(point.relativeLocation).not.toBeNull();
  testQuantitativeValue(point.relativeLocation.bearing, 358, "degree_(angle)");
  testQuantitativeValue(point.relativeLocation.distance, 7366.9851976444, "m");

}, timeout);