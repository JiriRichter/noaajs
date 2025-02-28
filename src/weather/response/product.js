import { toTime } from '../../utils/time';
import { toProducts } from '../endpoints/products';
import { getValue } from './utils';

/* @class Product
 * @aka NOAA.Product
 *
 * */
export class Product {
    constructor(data) {
        this.id = getValue('id', data);
        this.wmoCollectiveId = getValue('wmoCollectiveId', data);
        this.issuingOffice = getValue('issuingOffice', data);
        this.issuanceTime = toTime(getValue('issuanceTime', data));
        this.productCode = getValue('productCode', data);
        this.productName = getValue('productName', data);
        this.productText = getValue('productText', data, true);
    }

    getProductText() {
        return toProducts().getProduct(this.id);
    }
}
