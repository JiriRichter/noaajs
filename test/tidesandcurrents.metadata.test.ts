/**
 * @jest-environment node
 */

import { expect, test } from '@jest/globals';
import { TidesAndCurrentsMetadataApi } from '../src/tidesandcurrents/metadata/api';
import { StationType } from '../src/tidesandcurrents/metadata/station-type';

test('get station list', async () => {

    var api = new TidesAndCurrentsMetadataApi();
    var stations = await api.stations(StationType.tidepredictions);
    expect(stations).not.toBeNull();
    expect(stations.length).toBeGreaterThan(2000);

    const currentStations = await api.stations(StationType.currentpredictions);
    expect(currentStations).not.toBeNull();
    expect(currentStations.length).not.toEqual(stations.length);
});

test('get station', async () => {

    var api = new TidesAndCurrentsMetadataApi();
    let stationId = "9414290";
    var station = await api.station(stationId);
    expect(station).not.toBeNull();
    expect(station.id).toEqual(stationId);

    // expect error
    let invalidId: TidesAndCurrentsStationId = "941429033";
    await expect(async () => { 
        await api.station(invalidId); 
    }).rejects.toThrowError(`No station was found for id ${invalidId}`);
});