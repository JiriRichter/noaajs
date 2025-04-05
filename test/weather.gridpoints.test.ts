/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { GridpointsApi } from '../src/weather/api/gridpoints';
import { testFeaturePolygon, testQuantitativeValue } from './test-utils';
import { NWSForecastOfficeId } from '../src/weather/data/office-id';
import { GridpointVariable } from '../src/weather/data/gridpoint-variable';
import { GridpointQuantitativeValue } from '../src/weather/data/gridpoint-quantitative-value';
import { millisecondsPerHour } from '../src/weather/data/interval';
import { TemperatureTrend, TemperatureUnit, GridpointForecastUnits } from '../src/weather/data/types';
import { GridpointForecast } from '../src/weather/data/gridpoint-forecast';

const timeout = 10000;
const x = 31, 
    y = 80, 
    office = NWSForecastOfficeId.TOP, 
    polygonPath: [number, number][] = [
    [
        -97.1080999,
        39.7227
    ],
    [
        -97.10849999999999,
        39.744800000000005
    ],
    [
        -97.13719999999999,
        39.744400000000006
    ],
    [
        -97.1367999,
        39.72240000000001
    ],
    [
        -97.1080999,
        39.7227
    ]]; 

test('getForecastData', async () => {
    const api = new GridpointsApi();
    const gridpointData = await api.getData(office, x, y);
    expect(gridpointData).not.toBeNull();

    testFeaturePolygon(gridpointData, polygonPath);
    
    testQuantitativeValue(gridpointData.elevation, 456.8952, 'm');
    expect(gridpointData.validTimes.totalHours).toBeGreaterThanOrEqual(0);
    expect(gridpointData.office).toEqual(office);
    expect(gridpointData.gridX).toEqual(31);
    expect(gridpointData.gridY).toEqual(80);
    expect(gridpointData.values).toHaveProperty(GridpointVariable.temperature);

    const temperature: GridpointQuantitativeValue = gridpointData.values[GridpointVariable.temperature];

    expect(temperature.unit).toEqual('degC');
    expect(temperature.values.length).toBeGreaterThan(0);
    temperature.values.forEach(x => {
        expect(x.validTime.totalHours).toBeGreaterThanOrEqual(1);
        expect(x.value).not.toBeNull();
    });


}, timeout);

function testForecast(gridpointForecast: GridpointForecast) {

    expect(gridpointForecast).not.toBeNull();

    testFeaturePolygon(gridpointForecast, polygonPath);

    testQuantitativeValue(gridpointForecast.elevation, 456.8952, 'm');
    expect(gridpointForecast.validTimes.totalHours).toBeGreaterThanOrEqual(0);
    expect(gridpointForecast.updateTime).not.toBeNull();
    expect(gridpointForecast.updateTime.getTime()).toBeGreaterThan(Date.now() - millisecondsPerHour * 3 * 24);
    expect(gridpointForecast.units).toEqual(GridpointForecastUnits.us);
    expect(gridpointForecast.periods.length).toBeGreaterThan(0);

    let number = 0, daytime = 0;
    gridpointForecast.periods.forEach(period => {

        number = number + 1;

        expect(period.number).toEqual(number);
        expect(period.name).not.toBeNull();
        expect(period.temperature).toBeGreaterThan(0);
        expect(period.temperatureUnit).toEqual(TemperatureUnit.F);
        expect(period.temperatureTrend === TemperatureTrend.falling 
            || period.temperatureTrend === TemperatureTrend.rising
            || period.temperatureTrend === undefined).toEqual(true);

        if (period.isDaytime === true) {
            daytime = daytime + 1;
        }

    });

    expect(daytime).toBeGreaterThan(0);
}

test('getForecast', async () => {
    const api = new GridpointsApi();
    const gridpointForecast = await api.getForecast(office, x, y);
    testForecast(gridpointForecast);
    gridpointForecast.periods.forEach(period => {
        expect(period.name).not.toBeNull();
        expect((period.name as string).length).toBeGreaterThan(0);
        expect(period.shortForecast.length).toBeGreaterThan(0);
        expect(period.detailedForecast.length).toBeGreaterThan(0);
    });}, 
timeout);

test('getForecastHourly', async () => {
    const api = new GridpointsApi();
    const gridpointForecast = await api.getForecastHourly(office, x, y);
    testForecast(gridpointForecast);
}, 
timeout);

test.only('getStations', async () => {
    const api = new GridpointsApi();
    let stations = await api.getStations(office, x, y);
    expect(stations).not.toBeNull();
    expect(stations.data.length).toBeGreaterThan(0);
    var regex = /^https:\/\/api.weather.gov\//g;
    expect(stations.nextPageUrl).toMatch(regex);

    let count = 0;
    while(stations.data.length > 0 && count < 20) {
        stations = await api.getStationsNext(stations);
        count = count + 1;
    }

    expect(stations.data.length).toEqual(0);
}, 
timeout);
