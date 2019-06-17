import { Endpoint } from './endpoint';
import { Zone, zonesToArray } from '../response/zone';
import { validateParameter, toQueryParameters, toQueryParamValue } from './parameters';
import { stationsToArray } from '../response/station';
import { StateAreaCodes, MarineAreaCodes, RegionCodes } from '../utils/codes';
import { ZoneForecast } from '../response/zone-forecast';
import { observationsToArray } from '../response/observation';

/* class Zones implements /zones interface
 * */
export class Zones extends Endpoint {
    constructor() {
        super('/zones');
    }

    /**
     * Returns a list of zones
     * @param {object} params
     */
    get(params, includeGeometry) {
        let queryParams;
        if (params) {
            queryParams = toQueryParameters(params, Zones.parameterOptions);
        }
        else {
            queryParams = {};
        }
        if (includeGeometry) {
            validateParameter('includeGeometry', includeGeometry, {
                'type': 'boolean',
                'allowArray': false
            });
            queryParams['include_geometry'] = includeGeometry;
        }

        return super.get(queryParams, function (data) {
            return zonesToArray(data);
        });
    }

    /**
     * Returns a list of zones of a given type
     * @param {object} params
     */
    getTypeZones(type, params, includeGeometry) {
        let queryParams;

        if (params) {
            queryParams = toQueryParameters(params, Zones.parameterOptions);
            if (params['type']) {
                throw new Error('type parameter is not allowed for this call');
            }
        }
        else {
            queryParams = {};
        }

        validateParameter('type', type, {
            'type': 'string',
            'allowedValues': Zones.Types
        });

        if (includeGeometry) {
            validateParameter('includeGeometry', includeGeometry, {
                'type': 'boolean',
                'allowArray': false
            });
            queryParams['include_geometry'] = includeGeometry;
        }

        return super.get([type], queryParams, function (data) {
            return zonesToArray(data);
        });
    }

    /**
     * Returns metadata about a given zone
     * @param {string} type
     * @param {string} id
     */
    getZone(type, id) {
        validateParameter('id', type, {
            'type': 'string'
        });
        validateParameter('type', type, {
            'type': 'string',
            'allowedValues': Zones.Types
        });

        return super.get([type, id], function (data) {
            return new Zone(data);
        });
    }

    /**
     * Returns the current zone forecast for a given zone
     * @param {string} type
     * @param {string} id
     */
    getZoneForecast(type, id) {
        validateParameter('id', type, {
            'type': 'string'
        });
        validateParameter('type', type, {
            'type': 'string',
            'allowedValues': Zones.Types
        });

        return super.get([type, id, 'forecast'], function (data) {
            return new ZoneForecast(data);
        });
    }

    /**
     * Returns a list of observations for a given zone
     * @param {string} type
     * @param {string} id
     * @param {Date?} start
     * @param {Date?} end
     * @param {number} limit
     */
    getZoneObservations(id, start, end, limit) {
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
        if (limit) {
            validateParameter('limit', limit, {
                'type': 'number'
            });
            queryParameters['limit'] = limit;
        }

        return super.get(['forecast', id, 'observations'], function (data) {
            return new observationsToArray(data);
        });
    }

    /**
     * Returns a list of observation stations for a given zone
     * @param {string} id
     */
    getZoneStations(id) {
        validateParameter('id', id, {
            'type': 'string'
        });
        return super.get(['forecast', id, 'stations'], function (data) {
            return stationsToArray(data);
        });
    }
}

Zones.Types = {
    'land': 'land',
    'marine': 'marine',
    'forecast': 'forecast',
    'public': 'public',
    'coastal': 'coastal',
    'offshore': 'offshore',
    'fire': 'fire',
    'county': 'county'
};

Zones.parameterOptions = {
    'id': {
        'type': 'string',
        'allowArray': true,
    },
    'area': {
        'type': 'string',
        'allowArray': true,
        'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
    },
    'region': {
        'type': 'string',
        'allowArray': true,
        'allowedValues': RegionCodes
    },
    'type': {
        'type': 'string',
        'allowArray': true,
        'allowedValues': Zones.Types
    },
    'point': {
        'type': 'LatLon',
        'allowArray': false
    },
    'effective': {
        'type': 'Date',
        'allowArray': false
    }
};

/* @factory NOAA.zones(): Object
 *
 */
export function toZones() {
    return new Zones();
}