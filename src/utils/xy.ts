/* @class XY
 * @aka NOAA.XY
 *
 * Represents a grid point with a certain X and Y.
 *
 * @example
 *
 * ```
 * let xy = NOAA.xy(1,3);
 * ```
 */
export class XY {

    public x;
    public y;

    constructor(x, y) {
        x = parseInt(x);
        y = parseInt(y);

        if (isNaN(x) || isNaN(y)) {
            throw new Error('Invalid x, y values: (' + x + ', ' + y + ')');
        }
        // @property x: Number
        // x grid coordinate
        this.x= +x;

        // @property y: Number
        // y grid coordinate
        this.y = +y;
    }

    toString() {
        return `${this.x},${this.y}`;
    }
}

// @factory NOAA.xy(x: Number, y: Number): XY
// Creates an object representing a grid point with the given x and y coordinates.

// @alternative
// @factory NOAA.xy(coords: Array): XY
// Expects an array of the form `[Number, Number]` instead.

// @alternative
// @factory NOAA.latLon(coords: Object): XY
// Expects an plain object of the form `{x: Number, y: Number}` instead.
export function toXY(a, b?) {
    if (a instanceof XY) {
        return a;
    }
    if (Array.isArray(a) && typeof a[0] !== 'object') {
        if (a.length === 2) {
            return new XY(a[0], a[1]);
        }
        return null;
    }
    if (a === undefined || a === null) {
        return a;
    }
    if (typeof a === 'object' && 'x' in a) {
        return new XY(a.x, a.y);
    }
    if (b === undefined) {
        return null;
    }
    return new XY(a, b);
}
