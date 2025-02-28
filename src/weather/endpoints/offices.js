import { Endpoint } from './endpoint';
import { Office } from '../response/office';

/* class Offices implements /alerts interface
 * */
export class Offices extends Endpoint {
    constructor(officeId) {
        super('/offices');
        this.officeId = officeId;
    }

    get() {
        return super.get([this.officeId], function (data) {
            return new Office(data);
        });
    }

    getHeadlines() {
        return super.get([this.officeId, 'headlines'], function (data) {
            return data;
        });
    }
}

/* @factory NOAA.offices(): Object
 *
 */
export function toOffices(officeId) {
    return new Offices(officeId);
}