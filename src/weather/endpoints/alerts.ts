import { Endpoint } from './endpoint';
import { StateAreaCodes, MarineAreaCodes, RegionCodes } from '../../utils/codes';
import { AlertCollection } from '../response/alert-collection';
import { Alert } from '../response/alert';
import { toQueryParameters } from './parameters';

/* class Alerts implements /alerts interface
 * */
export class Alerts extends Endpoint {

    static Status = {
        'actual': 'actual',
        'exercise': 'exercise',
        'system': 'system',
        'test': 'test',
        'draft': 'draft'
    };
    
    static MessageType = {
        'alert': 'alert',
        'update': 'update',
        'cancel': 'cancel'
    };
    
    static RegionType = {
        'land': 'land',
        'marine': 'marine'
    };
    
    
    static Urgency = {
        'unknown': 'unknown',
        'past': 'past',
        'future': 'future',
        'expected': 'expected',
        'immediate': 'immediate'
    };
    
    static Severity = {
        'unknown': 'unknown',
        'minor': 'minor',
        'moderate': 'moderate',
        'severe': 'severe',
        'extreme': 'extreme'
    };
    
    static Certainty = {
        'unknown': 'unknown',
        'unlikely': 'unlikely',
        'possible': 'possible',
        'likely': 'likely',
        'observed': 'observed'
    };
    
    static parameterOptions = {
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

    constructor() {
        super('/alerts');
    }

    async get(params = {}) {
        const data = super.get(toQueryParameters(params, Alerts.parameterOptions));
            return new AlertCollection(data);
    }

    async getNext(url) {
        const data = super.get(url);
            return new AlertCollection(data);
    }

    async getActive(params = {}) {
        const data = super.get(['active'], toQueryParameters(params, Alerts.parameterOptions));
            return new AlertCollection(data);
    }

    async getTypes() {
        const data = super.get(['types']);
            return data['eventTypes'];
    }

    async getAlert(id) {
        const data = super.get([id]);
            return new Alert(data);
    }

    async getActiveCount() {
        const data = super.get(['active', 'count']);
            return data;
    }

    async getZoneActive(zoneId) {
        const data = super.get(['active', 'zone', zoneId]);
            return new AlertCollection(data);
    }

    async getAreaActive(area) {
        if (area in MarineAreaCodes || area in StateAreaCodes) {
            const data = super.get(['active', 'area', area]);
                return new AlertCollection(data);
        }
        else {
            throw new Error('Invalid area code (' + area + ')');
        }
    }

    async getRegionActive(region) {
        if (region in RegionCodes) {
            const data = super.get(['active', 'region', region]);
                return new AlertCollection(data);
        }
        else {
            throw new Error('Invalid region code (' + region + ')');
        }
    }
}

/* @factory NOAA.alerts(): Object
 *
 */
export function toAlerts() {
    return new Alerts();
}