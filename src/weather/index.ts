import { AlertsApi } from './api/alerts';
import { GlossaryApi } from './api/glossary';
import { GridpointsApi } from './api/gridpoints';
import { PointsApi } from './api/points';
import { ProductsApi } from './api/products';
import { StationsApi } from './api/stations';
import { ZonesApi } from './api/zones';
import { NWSForecastOfficeId } from './data/office-id';

export const Weather = {
    points: new PointsApi(),
    glossary: new GlossaryApi(),
    products: new ProductsApi(),
    alerts: new AlertsApi(),
    stations: new StationsApi(),
    zones: new ZonesApi(),
    gridPoint: new GridpointsApi(),
    
    NWSForecastOfficeId: NWSForecastOfficeId
};