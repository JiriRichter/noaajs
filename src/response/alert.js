import { Feature } from './feature';
import { toZone } from './zone';
import { toTime } from '../utils/time';
import { getUrlParameter } from '../utils/parameters';

/* @class Alert
 * @aka NOAA.Alert
 *
 * Represents response from /points endpoint.
 * */
export class Alert extends Feature {
    constructor(data) {
        super(data);

        this.id = this.getProperty('id');
        this.areaDescription = this.getProperty('areaDesc');
        this.geocode = this.getProperty('geocode');

        this.affectedZones = [];
        let affectedZones = this.getProperty('affectedZones'), i;
        for (i = 0; i < affectedZones.length; i++) {
            this.affectedZones.push(
                toZone(
                    getUrlParameter(affectedZones[i], -2),
                    getUrlParameter(affectedZones[i], -1)));
        }

        this.references = this.getProperty('references');

        this.sent = toTime(this.getProperty('sent'));
        this.effective = toTime(this.getProperty('effective'));
        this.onset = toTime(this.getProperty('onset'));
        this.expires = toTime(this.getProperty('expires'));
        this.ends = toTime(this.getProperty('ends'));

        this.status = this.getProperty('status');
        this.messageType = this.getProperty('messageType');
        this.category = this.getProperty('category');
        this.severity = this.getProperty('severity');
        this.certainty = this.getProperty('certainty');
        this.urgency = this.getProperty('urgency');

        this.event = this.getProperty('event');
        this.sender = this.getProperty('sender');
        this.senderName = this.getProperty('senderName');
        this.headline = this.getProperty('headline');
        this.description = this.getProperty('description');
        this.instruction = this.getProperty('instruction');
        this.response = this.getProperty('response');

        this.parameters = this.getProperty('parameters');
    }
}
