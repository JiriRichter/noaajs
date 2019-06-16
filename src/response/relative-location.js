import { Feature } from './feature';
import { toValueUnits } from './value-units';

/* @class Point
 * @aka NOAA.Point
 *
 * Represents response from /points endpoint.
 * */
class RelativeLocation extends Feature {
    constructor(data) {
        super(data);

        this.city = this.getProperty('city');
        this.state = this.getProperty('state');
        this.distance = toValueUnits(this.getProperty('distance'));
        this.bearing = toValueUnits(this.getProperty('bearing'));
    }
}

export function toRelativeLocation(data) {
    if (!data) {
        return null;
    }
    return new RelativeLocation(data);
}

export { RelativeLocation };