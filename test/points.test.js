import { toPoints as points } from '../src/endpoints/points';

const timeout = 10000;

test('Test getGridPointForecast', () => {
  return points([39.7456, -97.0892]).get()
    .then((point) => point.getGridPointForecast())
    .then((forecast) => {
      expect(forecast).not.toBeNull();
    });
}, timeout);

test('Test getGridPointForecastHourly', () => {
  return points([39.7456, -97.0892]).get()
    .then((point) => point.getGridPointForecastHourly())
    .then((forecast) => {
      expect(forecast).not.toBeNull();
    });
}, timeout);