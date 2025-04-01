import { Points, toPoints } from './endpoints';
import { Glossary, toGlossary } from './endpoints';
import { Icons, toIcons } from './endpoints';
import { Products, toProducts } from './endpoints';
import { Alerts, toAlerts } from './endpoints';
import { Offices, toOffices } from './endpoints';
import { Stations, toStations } from './endpoints';
import { Zones, toZones } from './endpoints';
import { GridPoint, Point } from './response';

export const Weather = {
    Points: Points,
    points: toPoints,
    
    Glossary: Glossary,
    glossary: toGlossary,
    
    Icons: Icons,
    icons: toIcons,
    
    Products: Products,
    products: toProducts,
    
    Alerts: Alerts,
    alerts: toAlerts,
    
    Offices: Offices,
    offices: toOffices,
    
    Stations: Stations,
    stations: toStations,
    
    Zones: Zones,
    zones: toZones,
    
    Point: Point,
    GridPoint: GridPoint,
    
};