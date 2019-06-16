import { toGeometry } from './geometry';

/* @class Feature
 * @aka NOAA.Feature
 *
 * Represents base class for API GeoJSON responses.
 * */
export class Feature {
    constructor(data) {
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
            this.geometry = null;
        }
        this.properties = data['properties'];
    }

    /**
     * Gets feature property
     * @param {string} key
     */
    getProperty(key, optional=false) {
        if (!optional && !(key in this.properties)) {
            throw new Error('Invalid property name: ' + key);
        }
        return this.properties[key];
    }
}