/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { AlertsApi } from '../src/weather/api/alerts';
import { AlertPage } from '../src/weather/data/alert-page';

const timeout = 10000;

test('getPoint', async () => {
  const api = new AlertsApi();
  let alerts: AlertPage = await api.getActive();

  expect(alerts).not.toBeNull();

  alerts = await api.getNext(alerts);

}, timeout);