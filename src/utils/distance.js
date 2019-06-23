import { LatLon } from "./latlon";

const toRad = x => (x * Math.PI) / 180;

/*!
 * JavaScript function to calculate the geodetic distance between two points specified by latitude/longitude using the Vincenty inverse formula for ellipsoids.
 *
 * Original scripts by Chris Veness
 * Taken from http://movable-type.co.uk/scripts/latlong-vincenty.html and optimized / cleaned up by Mathias Bynens <http://mathiasbynens.be/>
 * Based on the Vincenty direct formula by T. Vincenty, “Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations”, Survey Review, vol XXII no 176, 1975 <http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf>
 *
 * @param {LatLon} latlng1 point A
 * @param {LatLon} latlng2 point B
 * @returns {Number} distance in metres between points
 */
export function distVincenty(latlng1, latlng2) {
    const a = 6378137,
        b = 6356752.3142,
        f = 1 / 298.257223563; // WGS-84 ellipsoid params

    let L = toRad(latlng2.lon - latlng1.lon),
        U1 = Math.atan((1 - f) * Math.tan(toRad(latlng1.lat))),
        U2 = Math.atan((1 - f) * Math.tan(toRad(latlng2.lat))),
        sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1),
        sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2),
        lambda = L,
        lambdaP,
        iterLimit = 100;

    do {
        var sinLambda = Math.sin(lambda),
            cosLambda = Math.cos(lambda),
            sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (0 === sinSigma) {
            return 0; // co-incident points
        }

        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda,
            sigma = Math.atan2(sinSigma, cosSigma),
            sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma,
            cosSqAlpha = 1 - sinAlpha * sinAlpha,
            cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha,
            C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));

        if (isNaN(cos2SigmaM)) {
            cos2SigmaM = 0; // equatorial line: cosSqAlpha = 0 (§6)
        }

        lambdaP = lambda;
        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

    if (!iterLimit) {
        return NaN; // formula failed to converge
    }

    var uSq = cosSqAlpha * (a * a - b * b) / (b * b),
        A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq))),
        B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq))),
        deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM))),
        s = b * A * (sigma - deltaSigma);
    return s.toFixed(3); // round to 1mm precision
}

/**
 * Calculates the haversine distance between point A, and B.
 * @param {LatLon} latlng1 point A
 * @param {LatLon} latlng2 point B
 * @returns {Number} distance in metres between points
*/
export const haversineDistance = (latlng1, latlng2) => {
    const R = 6378137; // m

    const dLat = toRad(latlng2.lat - latlng1.lat);
    const dLatSin = Math.sin(dLat / 2);
    const dLon = toRad(latlng2.lon - latlng1.lon);
    const dLonSin = Math.sin(dLon / 2);

    const a = (dLatSin * dLatSin) +
        (Math.cos(toRad(latlng1.lon)) * Math.cos(toRad(latlng2.lon)) * dLonSin * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
};