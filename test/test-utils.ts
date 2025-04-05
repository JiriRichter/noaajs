import { FeaturePoint } from "../src/weather/data/feature-point";
import { FeaturePolygon } from "../src/weather/data/feature-polygon";
import { QuantitativeValue } from "../src/weather/data/quantitative-value";
import { expect } from '@jest/globals';

export function testQuantitativeValue(numericValue: QuantitativeValue, value: number, unit: string) {
    expect(numericValue).not.toBeNull();
    expect(numericValue.value).toEqual(value);
    expect(numericValue.unit).toEqual(unit);
}

export function testFeaturePoint(feature: FeaturePoint, latitude: number, longitude: number) {
    expect(feature).not.toBeNull();
    expect(feature.latitude).toEqual(latitude);
    expect(feature.longitude).toEqual(longitude);
}

export function testFeaturePolygon(feature: FeaturePolygon, path: [number, number][]) {
    expect(feature).not.toBeNull();
    expect(feature.path).not.toBeNull();
    expect(feature.path.length).toEqual(path.length);
    for(let i = 0; i < path.length; i++) {
        expect(feature.path[i].latitude).toEqual(path[i][1]);
        expect(feature.path[i].longitude).toEqual(path[i][0]);
    }
}