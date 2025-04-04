import { Zone } from './zone';
import { getDateValue, getProperty, getStringValue } from './utils';

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
    
    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.id = getStringValue('id', properties);
        this.areaDescription = getStringValue('areaDesc', properties);
        this.geocode = getStringValue('geocode', properties);

        this.affectedZones = [];
        
        let affectedZones = getStringValue('affectedZones', properties);

        for (let i: number = 0; i < affectedZones.length; i++) {
            this.affectedZones.push(new Zone(affectedZones[i]));
        }

        this.references = getStringValue('references', properties);

        this.sent = getDateValue('sent', properties);
        this.effective = getDateValue('effective', properties);
        this.onset = getDateValue('onset', properties);
        this.expires = getDateValue('expires', properties);
        this.ends = getDateValue('ends', properties);

        this.status = getStringValue('status', properties);
        this.messageType = getStringValue('messageType', properties);
        this.category = getStringValue('category', properties);
        this.severity = getStringValue('severity', properties);
        this.certainty = getStringValue('certainty', properties);
        this.urgency = getStringValue('urgency', properties);

        this.event = getStringValue('event', properties);
        this.sender = getStringValue('sender', properties);
        this.senderName = getStringValue('senderName', properties);
        this.headline = getStringValue('headline', properties);
        this.description = getStringValue('description', properties);
        this.instruction = getStringValue('instruction', properties);
        this.response = getStringValue('response', properties);

        this.parameters = getStringValue('parameters', properties);
    }
}
