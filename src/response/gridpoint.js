import { Feature } from './feature';
import { Office } from './office';
import { toXY } from '../utils/xy';
import { ValueUnits, toValueUnits } from './value-units';
import { toValidTimePeriod, millisecondsPerHour } from './valid-time-period';
import { toTime } from '../utils/time';

/* @class GridPoint
 * @aka NOAA.GridPoint
 *
 * Represents response from /gridpoints endpoint.
 * */
export class GridPoint extends Feature {

    constructor(data) {
        super(data);

        this.xy = toXY(this.getProperty('gridX'), this.getProperty('gridY'));
        this.office = new Office(this.getProperty('gridId'));
        this.elevation = toValueUnits(this.getProperty('elevation'));
        this.updateTime = toTime(this.getProperty('updateTime'));
        this.validTimes = toValidTimePeriod(this.getProperty('validTimes')).toArray();
        this.validTimesDict = {};
        for (let i = 0; i < this.validTimes.length; i++) {
            this.validTimesDict[this.validTimes[i].milliseconds] = this.validTimes[i].toString();
        }

        // get forecast variables
        this.variables = {};
        for (let i = 0; i < GridPoint.variables.length; i++) {
            this.variables[GridPoint.variables[i]] = this.getVariable(GridPoint.variables[i]);
        }

        this.weather = this.getVariable('weather');
        this.hazards = this.getVariable('hazards');
    }

    getVariable(name) {
        let data = this.getProperty(name),
            units,
            timeValueDict = {},
            validTime,
            valueTime,
            variable = {};

        variable.values = [];

        if (data['sourceUnit']) {
            variable['sourceUnit'] = data['sourceUnit'];
        }

        if (data['uom']) {
            units = ValueUnits.parseUnit(data['uom']);
        }

        if (data['values'] && data['values'].length > 0) {
            for (let i = 0; i < data['values'].length; i++) {
                validTime = toValidTimePeriod(data['values'][i]['validTime']);

                for (let hour = 0; hour < validTime.totalHours; hour++) {
                    //value can be null
                    if (data['values'][i]['value']) {
                        valueTime = validTime.time.milliseconds + hour * millisecondsPerHour;
                        //if (!(valueTime in this.validTimesDict)) {
                        //    throw new Error(name + ' value time does not match gridpoint valid times');
                        //}
                        if (valueTime <= this.validTimes[this.validTimes.length - 1].milliseconds) {
                            if (typeof data['values'][i]['value'] === 'number') {
                                timeValueDict[valueTime] = toValueUnits(data['values'][i]['value'], units);
                            }
                            else {
                                timeValueDict[valueTime] = data['values'][i]['value'];
                            }
                        }
                    }
                }
            }

            for (let i = 0; i < this.validTimes.length; i++) {
                variable.values.push(timeValueDict[this.validTimes[i].milliseconds]);
            }
        }
        return variable;
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
    'redFlagThreatIndex'
];