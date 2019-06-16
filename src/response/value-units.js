/* @class ValueUnit
 * @aka NOAA.ValueUnit
 *
 * Represents a class for value with units.
 * */
export class ValueUnits {
    constructor(value, units) {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
        this.value = value;
        this.unit = units;
    }
}

ValueUnits.parseUnit = function (s) {
    return s.split(':')[1];
};

export function toValueUnits(a, b) {

    if (typeof a === 'object' && 'value' in a && 'unitCode' in a) {
        return new ValueUnits(a['value'], ValueUnits.parseUnit(a['unitCode']));
    }
    return new ValueUnits(a, b);
}