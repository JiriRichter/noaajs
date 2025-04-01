import { Endpoint } from './endpoint';
import { Office } from '../response/office';

/* class Offices implements /alerts interface
 * */
export class Offices extends Endpoint {
    officeId: any;
    constructor(officeId) {
        super('/offices');
        this.officeId = officeId;
    }

    async get() {
        const data = await super.get([this.officeId]);
        return new Office(data);
    }

    async getHeadlines() {
        const data = await super.get([this.officeId, 'headlines']);
        return data;
    }
}

/* @factory NOAA.offices(): Object
 *
 */
export function toOffices(officeId) {
    return new Offices(officeId);
}