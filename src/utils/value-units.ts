/* @class ValueUnit
 * @aka NOAA.ValueUnit
 *
 * Represents a class for value with units.
 * */
export class ValueUnits {

    public value;
    public unit;

    constructor(value, units) {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
        this.value = value;
        this.unit = units;
    }

    static parseUnit = function (s: string) {
        return s.split(':')[1];
    };
}

export function toValueUnits(a, b?) {

    if (typeof a === 'object') {
        if ('value' in a && 'unitCode' in a) {
            return new ValueUnits(a['value'], ValueUnits.parseUnit(a['unitCode']));
        }
        if ('value' in a && 'unit' in a) {
            return new ValueUnits(a['value'], ValueUnits.parseUnit(a['unit']));
        }
    }
    return new ValueUnits(a, b);
}