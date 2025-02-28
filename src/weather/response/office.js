import { getUrlPart, getValue } from './utils';
import { toProducts } from '../endpoints/products';
import { Zone } from './zone';
import { Station } from './station';

/* @class Office
 * @aka NOAA.Office
 *
 * */
export class Office {
    constructor(data) {
        if (typeof data === 'string') {
            this.id = data;
        }
        else {
            this.id = getValue('id', data);
            this.name = getValue('name', data);
            this.address = getValue('address', data);
            this.telephone = getValue('telephone', data);
            this.fax = getValue('faxNumber', data);
            this.email = getValue('email', data);
            this.url = getValue('sameAs', data);
            this.nwsRegion = getValue('nwsRegion', data);
            this.parentOrganization = getUrlPart(getValue('parentOrganization', data), -1);
            this.responsibleCounties = this.getZones('responsibleCounties', data);
            this.responsibleForecastZones = this.getZones('responsibleForecastZones', data);
            this.responsibleFireZones = this.getZones('responsibleFireZones', data);
            this.approvedObservationStations = this.getStations('approvedObservationStations', data);
        }
    }

    getZones(key, data) {
        let list = [];
        if (data[key]) {
            for (let i = 0; i < data[key].length; i++) {
                list.push(new Zone(data[key][i]));
            }
        }
        return list;
    }

    getStations(key, data) {
        let list = [];
        if (data[key]) {
            for (let i = 0; i < data[key].length; i++) {
                list.push(new Station(getUrlPart(data[key][i], -1)));
            }
        }
        return list;
    }

    getAreaForecastDiscussion() {
        return toProducts().get({
            'location': this.id,
            'type': 'AFD'
        });
    }

    getProductTypes() {
        return toProducts().getLocationTypes(this.id);
    }

    getProducts(params) {
        params['location'] = this.id;
        return toProducts().get(params);
    }
}