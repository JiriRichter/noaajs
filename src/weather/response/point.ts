import { RelativeLocation } from './relative-location';
import { getUrlPart, getProperty, getNumberValue, getStringValue } from './utils';

export class Point {
    gridX: number;
    gridY: number;
    office: string;
    forecastZone: string;
    timeZone: string;
    radarStation: string;
    relativeLocation: RelativeLocation | null;
    county: string;
    fireWeatherZone: string;

    constructor(data: any) {

        const properties = getProperty('properties', data);

        this.gridX = getNumberValue('gridX', properties);
        this.gridX = getNumberValue('gridY', properties);
        this.office = getStringValue('gridId', properties);
        this.forecastZone = getUrlPart(getStringValue('forecastZone', properties), -1);
        this.timeZone = getStringValue('timeZone', properties);
        this.radarStation = getStringValue('radarStation', properties);
        this.relativeLocation = new RelativeLocation(getProperty('relativeLocation', properties));

        // optional properties
        this.county = getUrlPart(getStringValue('county', properties, true), -1);
        this.fireWeatherZone = getUrlPart(getStringValue('fireWeatherZone', properties, true), -1);
    }
}