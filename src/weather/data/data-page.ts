import { getDateValue, getProperty, getStringValue } from "./utils";

export class DataPage {

    public title?: string;
    public updated?: Date;
    public nextPageUrl: string;
    
    constructor(data: any){
        if ('title' in data) {
            this.title = getStringValue('title', data);
        }

        if ('updated' in data) {
            this.updated = getDateValue('updated', data);
        }

        const pagination = getProperty('pagination', data);
        this.nextPageUrl = getStringValue('next', pagination);
    }
}