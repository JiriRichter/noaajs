import { Endpoint } from './endpoint';
import { StateAreaCodes, MarineAreaCodes, RegionCodes } from '../../utils/codes';
import { AlertCollection } from '../response/alert-collection';
import { Alert } from '../response/alert';
import { toQueryParameters } from './parameters';

/* class Alerts implements /alerts interface
 * */
export class Alerts extends Endpoint {
    constructor() {
        super('/alerts');
    }

    get(params = {}) {
        return super.get(toQueryParameters(params, Alerts.parameterOptions), function (data) {
            return new AlertCollection(data);
        });
    }

    getNext(url) {
        return super.get(url, function (data) {
            return new AlertCollection(data);
        });
    }

    getActive(params = {}) {
        return super.get(['active'], toQueryParameters(params, Alerts.parameterOptions), function (data) {
            return new AlertCollection(data);
        });
    }

    getTypes() {
        return super.get(['types'], function (data) {
            return data['eventTypes'];
        });
    }

    getAlert(id) {
        return super.get([id], function (data) {
            return new Alert(data);
        });
    }

    getActiveCount() {
        return super.get(['active', 'count'], function (data) {
            return data;
        });
    }

    getZoneActive(zoneId) {
        return super.get(['active', 'zone', zoneId], function (data) {
            return new AlertCollection(data);
        });
    }

    getAreaActive(area) {
        if (area in MarineAreaCodes || area in StateAreaCodes) {
            return super.get(['active', 'area', area], function (data) {
                return new AlertCollection(data);
            });
        }
        else {
            throw new Error('Invalid area code (' + area + ')');
        }
    }

    getRegionActive(region) {
        if (region in RegionCodes) {
            return super.get(['active', 'region', region], function (data) {
                return new AlertCollection(data);
            });
        }
        else {
            throw new Error('Invalid region code (' + region + ')');
        }
    }
}

Alerts.Status = {
    'actual': 'actual',
    'exercise': 'exercise',
    'system': 'system',
    'test': 'test',
    'draft': 'draft'
};

Alerts.MessageType = {
    'alert': 'alert',
    'update': 'update',
    'cancel': 'cancel'
};

Alerts.RegionType = {
    'land': 'land',
    'marine': 'marine'
};


Alerts.Urgency = {
    'unknown': 'unknown',
    'past': 'past',
    'future': 'future',
    'expected': 'expected',
    'immediate': 'immediate'
};

Alerts.Severity = {
    'unknown': 'unknown',
    'minor': 'minor',
    'moderate': 'moderate',
    'severe': 'severe',
    'extreme': 'extreme'
};

Alerts.Certainty = {
    'unknown': 'unknown',
    'unlikely': 'unlikely',
    'possible': 'possible',
    'likely': 'likely',
    'observed': 'observed'
};

Alerts.parameterOptions = {
    'active': {
        'query': 'active',
        'type': 'boolean'
    },
    'start': {
        'query': 'start'
    },
    'end': {
        'query': 'end'
    },
    'status': {
        'query': 'status',
        'allowArray': true,
        'type': 'string',
        'allowedValues': Alerts.Status
    },
    'messageType': {
        'query': 'message_type',
        'allowArray': true,
        'type': 'string'
    },
    'event': {
        'query': 'event',
        'allowArray': true,
        'type': 'string',
        'allowedValues': Alerts.MessageType
    },
    'code': {
        'query': 'code',
        'allowArray': true,
        'type': 'string'
    },
    'regionType': {
        'query': 'region_type',
        'allowArray': false,
        'type': 'string',
        'exclusive': true,
        'allowedValues': Alerts.RegionType
    },
    'point': {
        'type': 'LatLon',
        'query': 'point',
        'exclusive': true
    },
    'region': {
        'query': 'region',
        'allowArray': true,
        'type': 'string',
        'exclusive': true,
        'allowedValues': RegionCodes
    },
    'area': {
        'query': 'area',
        'allowArray': true,
        'type': 'string',
        'exclusive': true,
        'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
    },
    'zone': {
        'query': 'zone',
        'allowArray': true,
        'type': 'string',
        'exclusive': true
    },
    'urgency': {
        'query': 'urgency',
        'allowArray': true,
        'type': 'string',
        'allowedValues': Alerts.Urgency
    },
    'severity': {
        'query': 'severity',
        'allowArray': true,
        'type': 'string',
        'allowedValues': Alerts.Severity
    },
    'certainty': {
        'query': 'certainty',
        'allowArray': true,
        'type': 'string',
        'allowedValues': Alerts.Certainty
    },
    'limit': {
        'query': 'limit',
        'type': 'number'
    },
    'cursor': {
        'query': 'cursor',
        'type': 'string'
    }
};

/* @factory NOAA.alerts(): Object
 *
 */
export function toAlerts(params) {
    return new Alerts(params);
}