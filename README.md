# noaajs

A JavaScript library for obtaining data from various public web services provided by NOAA.

## NOAA web services

The library currently supports 2 web services:
- [weather.gov](
https://www.weather.gov/documentation/services-web-api)
- [tides&currents](https://tidesandcurrents.noaa.gov/web_services_info.html)

## Examples

Objtain forecast for a [lat,lon] location 

```
NOAA.points([39.7456, -97.0892]).get()
    .then((point) => point.getGridPointForecast())
    .then((forecast) => {
        // do something with forecast
    })
```

Find closest tide prediction station to a [lat, lon] location
```
var latlon = NOAA.latLon([47.56790487352981, -122.29271829128264]);

var station = NOAA.TidesAndCurrents.stations.findClosest(latlon);
console.log(station);
```

Obtain tide prediction for a given COOPS station
```
NOAA.TidesAndCurrents.products.datums(station.id).get().then(function (data) {
        console.log(data);
    }, function (error) {
    console.log(error);
    });

NOAA.TidesAndCurrents.products.predictions(station.id).getToday().then(function (data) {
        console.log(data);
    }, function (error) {
        console.log(error);
    });

NOAA.TidesAndCurrents.products.wind(station.id).getToday().then(function (data) {
    console.log(data);
}, function (error) {
    console.log(error);
});
```