import { getDateValue, getStringValue } from "../../utils/json";

export class Product {
    public id: string;
    public wmoCollectiveId: string;
    public issuingOffice: string;
    public issuanceTime: Date;
    public productCode: string;
    public productName: string;
    public productText?: string;
    
    constructor(data: any) {
        this.id = getStringValue('id', data);
        this.wmoCollectiveId = getStringValue('wmoCollectiveId', data);
        this.issuingOffice = getStringValue('issuingOffice', data);
        this.issuanceTime = getDateValue('issuanceTime', data);
        this.productCode = getStringValue('productCode', data);
        this.productName = getStringValue('productName', data);

        if ('productText' in data) {
            this.productText = getStringValue('productText', data);
        }
    }
}
