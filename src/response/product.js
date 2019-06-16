import { toTime } from '../utils/time';
import { toProducts } from '../endpoints/products';

/* @class Product
 * @aka NOAA.Product
 *
 * */
export class Product {
    constructor(data) {
        this.id = data['id'];
        this.wmoCollectiveId = data['wmoCollectiveId'];
        this.issuingOffice = data['issuingOffice'];
        this.issuanceTime = toTime(data['issuanceTime']);
        this.productCode = data['productCode'];
        this.productName = data['productName'];
        this.productText = data['productText'];
    }

    getProductText() {
        return toProducts().getProduct(this.id);
    }
}
