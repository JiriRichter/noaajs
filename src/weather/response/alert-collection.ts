import { toTime } from '../../utils/time';
import { Alert } from './alert';
import { toAlerts } from '../endpoints/alerts';


/* @class AlertCollection
 * @aka NOAA.AlertCollection
 *
 * Represents response from /alerts endpoint.
 * */
export class AlertCollection {

    public title;
    public updated;
    public alerts;
    public next;
    public isComplete;

    constructor(data) {
        this.title = data['title'];
        this.updated = toTime(data['updated']);
        this.alerts = [];
        if (data['features']) {
            for (let i = 0; i < data['features'].length; i++) {
                this.alerts.push(new Alert(data['features'][i]));
            }
        }

        if (data['pagination']) {
            this.next = data['pagination']['next'];
            this.isComplete = false;
        }
        else {
            this.isComplete = true;
        }
    }

    getNext() {
        return toAlerts().getNext(this.next);
    }
}