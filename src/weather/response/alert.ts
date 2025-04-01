import { Zone } from './zone';
import { toTime } from '../../utils/time';
import { getFeatureProperty } from './utils';

/* @class Alert
 * @aka NOAA.Alert
 *
 * Represents response from /points endpoint.
 * */
export class Alert {
    id: any;
    areaDescription: any;
    geocode: any;
    affectedZones: any[];
    references: any;
    sent: any;
    effective: any;
    onset: any;
    expires: any;
    ends: any;
    status: any;
    messageType: any;
    category: any;
    severity: any;
    certainty: any;
    urgency: any;
    event: any;
    sender: any;
    senderName: any;
    headline: any;
    description: any;
    instruction: any;
    response: any;
    parameters: any;
    
    constructor(data) {
        this.id = getFeatureProperty('id', data);
        this.areaDescription = getFeatureProperty('areaDesc', data);
        this.geocode = getFeatureProperty('geocode', data);

        this.affectedZones = [];
        let affectedZones = getFeatureProperty('affectedZones', data), i;
        for (i = 0; i < affectedZones.length; i++) {
            this.affectedZones.push(new Zone(affectedZones[i]));
        }

        this.references = getFeatureProperty('references', data);

        this.sent = toTime(getFeatureProperty('sent', data));
        this.effective = toTime(getFeatureProperty('effective', data));
        this.onset = toTime(getFeatureProperty('onset', data));
        this.expires = toTime(getFeatureProperty('expires', data));
        this.ends = toTime(getFeatureProperty('ends', data));

        this.status = getFeatureProperty('status', data);
        this.messageType = getFeatureProperty('messageType', data);
        this.category = getFeatureProperty('category', data);
        this.severity = getFeatureProperty('severity', data);
        this.certainty = getFeatureProperty('certainty', data);
        this.urgency = getFeatureProperty('urgency', data);

        this.event = getFeatureProperty('event', data);
        this.sender = getFeatureProperty('sender', data);
        this.senderName = getFeatureProperty('senderName', data);
        this.headline = getFeatureProperty('headline', data);
        this.description = getFeatureProperty('description', data);
        this.instruction = getFeatureProperty('instruction', data);
        this.response = getFeatureProperty('response', data);

        this.parameters = getFeatureProperty('parameters', data);
    }
}
