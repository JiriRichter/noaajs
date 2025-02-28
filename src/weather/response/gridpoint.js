import { Feature } from './feature';
import { Office } from './office';
import { toXY } from '../../utils/xy';
import { ValueUnits, toValueUnits } from './value-units';
import { toValidTimePeriod, millisecondsPerHour } from './valid-time-period';
import { toTime } from '../../utils/time';
import { getFeatureProperty } from './utils';

/* @class GridPoint
 * @aka NOAA.GridPoint
 *
 * Represents response from /gridpoints endpoint.
 * */
export class GridPoint extends Feature {

    constructor(data) {
        super(data);

        this.xy = toXY(getFeatureProperty('gridX', data), getFeatureProperty('gridY', data));
        this.office = new Office(getFeatureProperty('gridId', data));
        this.elevation = toValueUnits(getFeatureProperty('elevation', data));
        this.updateTime = toTime(getFeatureProperty('updateTime', data));
        this.validTimes = toValidTimePeriod(getFeatureProperty('validTimes', data));
        this.values = {};
        for (let i = 0; i < GridPoint.variables.length; i++) {
            this.values[GridPoint.variables[i]] = this.getVariable(GridPoint.variables[i], data);
        }
    }

    getVariable(name, data) {
        let variableData = getFeatureProperty(name, data),
            units,
            values,
            item;

        if (variableData['uom']) {
            units = ValueUnits.parseUnit(variableData['uom']);
        }

        if (variableData['values'] && variableData['values'].length > 0) {
            values = [];

            if (variableData['sourceUnit']) {
                values['sourceUnit'] = variableData['sourceUnit'];
            }

            for (let i = 0; i < variableData['values'].length; i++) {
                //value can be null
                if (variableData['values'][i]['value'] !== null) {
                    if (typeof variableData['values'][i]['value'] === 'number') {
                        item = toValueUnits(variableData['values'][i]['value'], units);
                    }
                    else {
                        item = variableData['values'][i]['value'];
                        if (Array.isArray(item)) {
                            item.forEach(v => {
                                for (let key in v) {
                                    if (v[key] && v[key]['unit'] && v[key]['value']) {
                                        v[key] = toValueUnits(v[key]);
                                    }
                                }
                            });
                        }
                    }
                    item['validTime'] = toValidTimePeriod(variableData['values'][i]['validTime']);
                    values.push(item);
                }
            }
        }
        return values;
    }

    mapToValidTimes(variable) {
        let timeValueDict = {},
            validTime,
            i,
            hour;

        if (this.values[variable] !== undefined && this.values[variable].length) {
            for (i = 0; i < this.values[variable].length; i++) {
                validTime = this.values[variable][i].validTime;

                for (hour = 0; hour < validTime.totalHours; hour++) {
                    timeValueDict[validTime.time.milliseconds + hour * millisecondsPerHour] = this.values[variable][i];
                }
            }
            return this.validTimes.toArray().map(t => timeValueDict[t.milliseconds]);
        }
    }
}

GridPoint.variables = [
    'temperature',
    'dewpoint',
    'maxTemperature',
    'minTemperature',
    'relativeHumidity',
    'apparentTemperature',
    'heatIndex',
    'windChill',
    'skyCover',
    'windDirection',
    'windSpeed',
    'windGust',
    'probabilityOfPrecipitation',
    'quantitativePrecipitation',
    'iceAccumulation',
    'snowfallAmount',
    'snowLevel',
    'ceilingHeight',
    'visibility',
    'transportWindSpeed',
    'transportWindDirection',
    'mixingHeight',
    'hainesIndex',
    'lightningActivityLevel',
    'twentyFootWindSpeed',
    'twentyFootWindDirection',
    'waveHeight',
    'wavePeriod',
    'waveDirection',
    'primarySwellHeight',
    'primarySwellDirection',
    'secondarySwellHeight',
    'secondarySwellDirection',
    'wavePeriod2',
    'windWaveHeight',
    'dispersionIndex',
    'pressure',
    'probabilityOfTropicalStormWinds',
    'probabilityOfHurricaneWinds',
    'potentialOf15mphWinds',
    'potentialOf25mphWinds',
    'potentialOf35mphWinds',
    'potentialOf45mphWinds',
    'potentialOf20mphWindGusts',
    'potentialOf30mphWindGusts',
    'potentialOf40mphWindGusts',
    'potentialOf50mphWindGusts',
    'potentialOf60mphWindGusts',
    'grasslandFireDangerIndex',
    'probabilityOfThunder',
    'davisStabilityIndex',
    'atmosphericDispersionIndex',
    'lowVisibilityOccurrenceRiskIndex',
    'stability',
    'redFlagThreatIndex',
    'weather',
    'hazards'
];