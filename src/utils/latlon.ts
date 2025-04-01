type LatLon = {
    lat: number,
    lon: number
}

export function toLatLon(lat: number, lon: number) : LatLon {
    return { lat: lat, lon: lon}
}