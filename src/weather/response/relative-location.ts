import { Feature } from './feature';
import { toValueUnits, ValueUnits } from '../../utils/value-units';
import { getFeatureProperty } from './utils';

/* @class Point
 * @aka NOAA.Point
 *
 * Represents response from /points endpoint.
 * */
class RelativeLocation extends Feature {
    city: any;
    state: any;
    distance: ValueUnits;
    bearing: ValueUnits;
    
    constructor(data) {
        super(data);

        this.city = getFeatureProperty('city', data);
        this.state = getFeatureProperty('state', data);
        this.distance = toValueUnits(getFeatureProperty('distance', data));
        this.bearing = toValueUnits(getFeatureProperty('bearing', data));
    }
}

export function toRelativeLocation(data) {
    if (!data) {
        return null;
    }
    return new RelativeLocation(data);
}

export { RelativeLocation };