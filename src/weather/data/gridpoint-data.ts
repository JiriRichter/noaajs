import { Interval } from './interval';
import { getDateValue, getFloatValue, getProperty, getStringValue } from '../../utils/json';
import { QuantitativeValue } from './quantitative-value';
import { FeaturePolygon } from './feature-polygon';
import { GridpointVariable } from './gridpoint-variable';
import { GridpointQuantitativeValue } from './gridpoint-quantitative-value';
import { getOfficeIdValue, NWSForecastOfficeId } from './office-id';

export class GridpointData extends FeaturePolygon {
    public gridX: number;
    public gridY: number;
    public office: NWSForecastOfficeId;
    public elevation: QuantitativeValue;
    public updateTime: any;
    public validTimes: Interval;
    public values: { [index in GridpointVariable]: GridpointQuantitativeValue } | {};

    constructor(data: any) {

        super(data)
        const properties = getProperty('properties', data);

        this.gridX = getFloatValue('gridX', properties);
        this.gridY = getFloatValue('gridY', properties);
        this.office = getOfficeIdValue('gridId', properties);
        
        this.elevation = new QuantitativeValue(getProperty('elevation', properties));
        this.updateTime = getDateValue('updateTime', properties);
        this.validTimes = new Interval(getStringValue('validTimes', properties));

        this.values = {};
        Object.keys(GridpointVariable).forEach((key) => {

            if (key in properties) {
                this.values[key] = new GridpointQuantitativeValue(properties[key]);
            }

        });
    }
}