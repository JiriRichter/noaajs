import { FeaturePoint } from './feature-point';
import { QuantitativeValue } from './quantitative-value';
import { getStringValue, getProperty } from './utils';

export class RelativeLocation extends FeaturePoint {
    public city: string;
    public state: string;
    public distance: QuantitativeValue;
    public bearing: QuantitativeValue;
    
    constructor(data: any) {

        super(data);

        const properties = getProperty('properties', data);

        this.city = getStringValue('city', properties);
        this.state = getStringValue('state', properties);
        this.distance = new QuantitativeValue(getProperty('distance', properties));
        this.bearing = new QuantitativeValue(getProperty('bearing', properties));
    }
}