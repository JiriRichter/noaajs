import { Endpoint } from './endpoint';
import { validateParameter, toQueryParamValue } from './parameters';
import { StateAreaCodes, MarineAreaCodes } from '../../utils/codes';
import { Station, stationsToArray } from '../response/station';
import { Observation, observationsToArray } from '../response/observation';

/* class Stations implements /stations interface
 * */
export class Stations extends Endpoint {
    
    constructor() {
        super('/stations');
    }

    /**
     * Returns a list of observation stations
     * @param {string|[string]} id
     * @param {string|[string]} state
     * @param {number} limit
     */
    async getStations(id, state, limit) {
        let queryParameters = {};

        if (id) {
            validateParameter('id', id, {
                'type': 'string',
                'allowArray': true
            });
            queryParameters['id'] = toQueryParamValue(id);
        }

        if (state) {
            validateParameter('state', state, {
                'type': 'string',
                'allowArray': true,
                'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
            });
            queryParameters['state'] = toQueryParamValue(state);
        }

        if (limit != undefined) {
            queryParameters['limit'] = limit;
        }

        const data = await super.get(queryParameters);
            return stationsToArray(data);
    }

    /**
     * Returns a list of observation stations for an area
     * @param {string|[string]} area
     * @param {number?} limit
     */
    async getAreaStations(area, limit) {

        let queryParameters = {};

        validateParameter('area', area, {
            'type': 'string',
            'allowArray': true,
            'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
        });

        queryParameters['state'] = toQueryParamValue(area);
        if (limit != undefined) {
            queryParameters['limit'] = limit;
        }

        const data = await super.get(queryParameters);
            return stationsToArray(data);
    }

    /**
     * Returns a list of radar stations
     * NOTE: returns 500
     * */
    async getRadarStations(id) {
        let pathParameters = ['radar'];
        if (id !== undefined) {
            pathParameters.push(id);
        }
        const data = await super.get(pathParameters);
        return data;
    }

    async getStation(id) {
        const data = await super.get([id]);
        return new Station(data);
    }

    /**
     * Returns a list of observations for a given station
     * @param {string} id
     * @param {Date?} start
     * @param {Date?} end
     * @param {number?} limit
     */
    async getObservations(id, start = undefined, end = undefined, limit = undefined) {
        let queryParameters = {};

        validateParameter('id', id, {
            'type': 'string'
        });

        if (start) {
            validateParameter('start', start, {
                'type': 'Date'
            });
            queryParameters['start'] = toQueryParamValue(start);
        }
        if (end) {
            validateParameter('end', end, {
                'type': 'Date'
            });
            queryParameters['end'] = toQueryParamValue(end);
        }
        if (limit != undefined) {
            queryParameters['limit'] = limit;
        }

        const data = await super.get([id, 'observations'], queryParameters);
        return observationsToArray(data).sort(function (a, b) {
            if (a.timestamp.milliseconds == b.timestamp.milliseconds) {
                return 0;
            }
            if (a.timestamp.milliseconds > b.timestamp.milliseconds) {
                return 1;
            }
            return -1;
        });
    }

    async getLatestObservations(id) {
        validateParameter('id', id, {
            'type': 'string'
        });

        const data = await super.get([id, 'observations', 'latest']);
        return new Observation(data);
    }

    async getObservationsAtTime(id, time) {
        validateParameter('id', id, {
            'type': 'string'
        });
        validateParameter('time', id, {
            'type': 'Date'
        });

        const data = await super.get([id, 'observations', time.toISOString()]);
        return new Observation(data);
    }
}

/* @factory NOAA.stations(): Object
 *
 */
export function toStations() {
    return new Stations();
}