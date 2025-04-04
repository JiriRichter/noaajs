import { NumericValue } from './numeric-value';
import { getStringValue, getProperty } from './utils';

export class RelativeLocation {
    city: string;
    state: string;
    distance: NumericValue;
    bearing: NumericValue;
    
    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.city = getStringValue('city', properties);
        this.state = getStringValue('state', properties);
        this.distance = new NumericValue(getProperty('distance', properties));
        this.bearing = new NumericValue(getProperty('bearing', properties));
    }
}