import { ApiBase } from './base';

export class ZonesApi extends ApiBase {

    static Types = {
        'land': 'land',
        'marine': 'marine',
        'forecast': 'forecast',
        'public': 'public',
        'coastal': 'coastal',
        'offshore': 'offshore',
        'fire': 'fire',
        'county': 'county'
    };
    
    constructor() {
        super();
    }
}