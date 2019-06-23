var latlon = NOAA.latLon([47.56790487352981, -122.29271829128264]);

var station = NOAA.TidesAndCurrents.stations.findClosest(latlon);
console.log(station);


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