import { ApiBase } from './base';
import { Point } from '../response/point';

export class PointsApi extends ApiBase {

    constructor() {
        super();
    }

    async getPoint(latitude: number, longitude: number): Promise<Point> {
        const data = await super.get(`points/${latitude},${longitude}`);
        return new Point(data);
    }
}