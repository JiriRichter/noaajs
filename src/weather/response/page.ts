import { getDateValue, getProperty, getStringValue } from "./utils";

export class Page {

    public title: string;
    public updated: Date;
    public nextPageUrl: string;
    
    constructor(data: any){
        this.title = getStringValue('title', data);
        this.updated = getDateValue('updated', data);
        this.nextPageUrl = getStringValue(
            'next', 
            getProperty('pagination', data));
    }
}