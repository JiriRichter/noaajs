import { millisecondsPerHour, ValidTimePeriod } from './valid-time-period';
import { getDateValue, getNumberValue, getProperty, getStringValue, parseUnits } from './utils';
import { NumericValue } from './numeric-value';
import { GeometryPolygon } from './geometry-polygon';

export class GridPoint extends GeometryPolygon {
    gridX: number;
    gridY: number;
    office: string;
    elevation: NumericValue;
    updateTime: any;
    validTimes: ValidTimePeriod;
    values: {};

    static variables: [
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

    constructor(data: any) {

        super(data)
        const properties = getProperty('properties', data);

        this.gridX = getNumberValue('gridX', properties);
        this.gridX = getNumberValue('gridY', properties);
        this.office = getStringValue('gridId', properties);
        
        this.elevation = new NumericValue(getProperty('elevation', properties));
        this.updateTime = getDateValue('updateTime', properties);
        this.validTimes = new ValidTimePeriod(getStringValue('validTimes', properties));
        this.values = {};
        for (let i = 0; i < GridPoint.variables.length; i++) {
            this.values[GridPoint.variables[i]] = this.getVariable(GridPoint.variables[i], properties);
        }
    }

    getVariable(name, data) {
        let variableData = getProperty(name, data),
            units,
            values,
            item;

        if (variableData['uom']) {
            units = parseUnits(variableData['uom']);
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
                        item = getNumberValue('value', variableData['values'][i]);
                    }
                    else {
                        item = variableData['values'][i]['value'];
                        if (Array.isArray(item)) {
                            item.forEach(v => {
                                for (let key in v) {
                                    if (v[key] && v[key]['unit'] && v[key]['value']) {
                                        v[key] = new NumericValue(v[key]);
                                    }
                                }
                            });
                        }
                    }
                    item['validTime'] = new ValidTimePeriod(variableData['values'][i]['validTime']);
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