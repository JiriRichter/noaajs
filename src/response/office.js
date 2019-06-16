import { getUrlParameter } from '../utils/parameters';
import { toProducts } from '../endpoints/products';

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
            this.id = data['id'];
            this.name = data['name'];
            this.address = data['address'];
            this.telephone = data['telephone'];
            this.fax = data['faxNumber'];
            this.email = data['email'];
            this.url = data['sameAs'];
            this.nwsRegion = data['nwsRegion'];
            this.parentOrganization = getUrlParameter(data['parentOrganization'], -1);
            this.responsibleCounties = this.getList('responsibleCounties', data);
            this.responsibleForecastZones = this.getList('responsibleForecastZones', data);
            this.responsibleFireZones = this.getList('responsibleFireZones', data);
            this.approvedObservationStations = this.getList('approvedObservationStations', data);
        }
    }

    getList(key, data) {
        let list = [];
        if (data[key]) {
            for (let i = 0; i < data[key].length; i++) {
                list.push(getUrlParameter(data[key][i], -1));
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