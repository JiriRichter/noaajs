const Weather = {};

import { Points, toPoints } from './endpoints';
import { Glossary, toGlossary } from './endpoints';
import { Icons, toIcons } from './endpoints';
import { Products, toProducts } from './endpoints';
import { Alerts, toAlerts } from './endpoints';
import { Offices, toOffices } from './endpoints';
import { Stations, toStations } from './endpoints';
import { Zones, toZones } from './endpoints';
import { GridPoint, Point } from './response';

Weather.Points = Points;
Weather.points = toPoints;

Weather.Glossary = Glossary;
Weather.glossary = toGlossary;

Weather.Icons = Icons;
Weather.icons = toIcons;

Weather.Products = Products;
Weather.products = toProducts;

Weather.Alerts = Alerts;
Weather.alerts = toAlerts;

Weather.Alerts = Alerts;
Weather.alerts = toAlerts;

Weather.Offices = Offices;
Weather.offices = toOffices;

Weather.Stations = Stations;
Weather.stations = toStations;

Weather.Zones = Zones;
Weather.zones = toZones;

Weather.Point = Point;
Weather.GridPoint = GridPoint;

export { Weather };