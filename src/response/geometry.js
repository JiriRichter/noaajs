import { toLatLon } from '../utils/latlon';

export class Geometry {
    constructor(data) {

        this.type = data['type'];

        switch (data['type']) {
            case 'Point':
                this.latlon = toLatLon(data['coordinates'].reverse());
                break;
            case 'Polygon':
                this.rings = this.getPolygonRings(data['coordinates']);
                break;
            case 'MultiPolygon':
                this.polygons = [];
                for (let i = 0; i < data['coordinates'].length; i++) {
                    this.polygons.push(this.getPolygonRings(data['coordinates'][i]));
                }
                break;
            default:
                throw new Error('Invalid geometry - (' + data['type'] + ') is not valid geometry');
        }
    }

    getPolygonRings(coordinates) {
        let rings = [];
        for (let i = 0; i < coordinates.length; i++) {
            rings.push(this.convertCoordinates(coordinates[i]));
        }
        return rings;
    }

    /**
     * 
     * @param {[]} latlons
     */
    convertCoordinates(coordinates) {
        let result = [], i;

        for (i = 0; i < coordinates.length; i++) {
            result.push(toLatLon(coordinates[i].reverse()));
        }
        return result;
    }
}

export function toGeometry(data) {
    return new Geometry(data);
}