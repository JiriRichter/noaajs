import { FeaturePoint } from './feature-point';
import { getOfficeIdValue, NWSForecastOfficeId } from './office-id';
import { RelativeLocation } from './relative-location';
import { getStringValueFromUrl, getProperty, getFloatValue, getStringValue, getIntValue } from './utils';

export class Point extends FeaturePoint {
    
    public gridX: number;
    public gridY: number;
    public office: NWSForecastOfficeId;
    public forecastZone: string;
    public timeZone: string;
    public radarStation: string;
    public relativeLocation: RelativeLocation;
    public county: string;
    public fireWeatherZone: string;

    constructor(data: any) {

        super(data);

        const properties = getProperty('properties', data);

        this.gridX = getIntValue('gridX', properties);
        this.gridY = getIntValue('gridY', properties);
        this.office = getOfficeIdValue('gridId', properties);
        this.forecastZone = getStringValueFromUrl(getStringValue('forecastZone', properties));
        this.timeZone = getStringValue('timeZone', properties);
        this.radarStation = getStringValue('radarStation', properties);
        this.relativeLocation = new RelativeLocation(getProperty('relativeLocation', properties));
        this.county = getStringValueFromUrl(getStringValue('county', properties));
        this.fireWeatherZone = getStringValueFromUrl(getStringValue('fireWeatherZone', properties));
    }
}