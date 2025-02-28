import { toPoints as points } from '../src/weather/endpoints/points';

const timeout = 10000;

test('getGridPointForecast', () => {
  return points([39.7456, -97.0892]).get()
    .then((point) => point.getGridPointForecast())
    .then((forecast) => {
      expect(forecast).not.toBeNull();
    });
}, timeout);

test('getGridPointForecastHourly', () => {
  return points([39.7456, -97.0892]).get()
    .then((point) => point.getGridPointForecastHourly())
    .then((forecast) => {
      expect(forecast).not.toBeNull();
    });
}, timeout);

test('getGridPoint', async () => {
  const point = await points([39.7456, -97.0892]).get();
  const gridpoint = await point.getGridPoint();
  expect(gridpoint).not.toBeNull();
}, timeout);