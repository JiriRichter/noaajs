import { Geometry, toGeometry } from './geometry';

/* @class Feature
 * @aka NOAA.Feature
 *
 * Represents base class for API GeoJSON responses.
 * */
export class Feature {
    geometries: Geometry[];
    geometry: Geometry;

    constructor(data: any) {
        if (data === undefined) {
            return;
        }

        if (data['type'] === undefined || data['type'] !== 'Feature') {
            throw new Error('Invalid data - Type property is missing or not "Feature"');
        }

        if (data['geometry'] && data['geometry']['type']) {
            if (data['geometry']['type'] === 'GeometryCollection') {
                this.geometries = [];
                for (let i = 0; i < data['geometry']['geometries'].length; i++) {
                    this.geometries.push(toGeometry(data['geometry']['geometries'][i]));
                }
            }
            else {
                this.geometry = toGeometry(data['geometry']);
            }
        }
        else {
            throw new Error('Invalid geometry data');
        }
    }
}