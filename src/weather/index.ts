import { AlertsApi } from './api/alerts';
import { GlossaryApi } from './api/glossary';
import { GridPointsApi } from './api/gridpoints';
import { PointsApi } from './api/points';
import { ProductsApi } from './api/products';
import { StationsApi } from './api/stations';
import { ZonesApi } from './api/zones';

export const Weather = {
    points: new PointsApi(),
    glossary: new GlossaryApi(),
    products: new ProductsApi(),
    alerts: new AlertsApi(),
    stations: new StationsApi(),
    zones: new ZonesApi(),
    gridPoint: new GridPointsApi()
};