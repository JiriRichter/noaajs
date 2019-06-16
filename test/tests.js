function testPoint() {
    var point = NOAA.latLon(39.7456, -97.0892);
}

function testError() {
    var endpoint = new NOAA.Endpoint('/points');
    endpoint.get(['invalidURL']).then(function (data) {
        console.log(data);
    }, function (error) {
        console.log(error);
    });
}

function testPoints() {
    NOAA.points([39.7456, -97.0892]).get().then(function (data) {
        console.log(data);
    });
}

function testPointsStations() {
    NOAA.points([39.7456, -97.0892]).getStations().then(function (data) {
        console.log(data);
    });
}

function testGlossary() {
    NOAA.glossary().get().then(function (data) {
        console.log(data);
    });
}

function testGridPointsStations() {
    NOAA.points([39.7456, -97.0892]).get().then(function (point) {
        point.getGridPointStations().then(function (data) {
            console.log(data);
        });
    });
}

function testGridPoints(lat, lon) {
    NOAA.points([lat, lon]).get().then(function (point) {
        point.getGridPoint().then(function (data) {
            console.log(data);
        });
    });
}

function testTime() {
    NOAA.points([39.7456, -97.0892]).get().then(function (point) {
        point.getGridPoint().then(function (gridpoint) {
            console.log(gridpoint.getProperty('updateTime'));
            console.log(gridpoint.updateTime);
            console.log(gridpoint.updateTime.toTimezone(point.timeZone));
        });
    });
}

function testGridPointsForecast() {
    NOAA.points([39.7456, -97.0892]).get().then(function (point) {
        point.getGridPointForecast().then(function (forecast) {
            console.log(forecast);
        });
    });
}

function testGridPointsForecastHourly() {
    NOAA.points([39.7456, -97.0892]).get().then(function (point) {
        point.getGridPointForecastHourly().then(function (forecast) {
            console.log(forecast);
        });
    });
}


function testIcons() {
    NOAA.icons().get().then(function (data) {
        console.log(data);
    });
}

function testProductsTypes() {
    NOAA.products().getTypes().then(function (data) {
        console.log(data);
    });
}

function testAlerts() {
    NOAA.alerts().get({
        'area': NOAA.StateAreaCodes.WA
    }).then(function (data) {
        console.log(data);
    });
}

function testPagination(data) {
    console.log(data);
    if (!data.isComplete) {
        data.getNext().then(testPagination);
    }
}

function testAlertsPagionation() {
    NOAA.alerts().get().then(testPagination);
}

function testPointAlerts(lat, lon) {
    NOAA.alerts({
        'point': NOAA.latLon(lat, lon)
    }).get().then(function (data) {
        console.log(data);
    });
}

function testAlertsTypes() {
    NOAA.alerts().getTypes().then(function (data) {
        console.log(data);
    });
}

function testAlertsAlert() {
    NOAA.alerts().getActive().then(function (data) {
        NOAA.alerts().getAlert(data.alerts[0].id).then(function (data) {
            console.log(data);
        });
    });
}

function testAlertsActiveCount() {
    NOAA.alerts().getActiveCount().then(function (data) {
        console.log(data);
    });
}

function testAlertsZoneActive(zone) {
    NOAA.alerts().getZoneActive(zone).then(function (data) {
        console.log(data);
    }, function (error) {
        console.log(error);
    });
}

function testAlertsRegionActive(region) {
    NOAA.alerts().getRegionActive(region).then(function (data) {
        console.log(data);
    });
}

function testAlertsAreaActive(area) {
    NOAA.alerts().getAreaActive(area).then(function (data) {
        console.log(data);
    });
}

function testStationsRadar() {
    NOAA.stations().getRadar().then(function (data) {
        console.log(data);
    });
}

function testStationsArea() {
    NOAA.stations().getAreaStations(NOAA.StateAreaCodes.WA).then(function (data) {
        console.log(data);

        NOAA.stations().getStation(data[0].id).then(function (data) {
            console.log(data);
        });

        NOAA.stations(data[1].id).get().then(function (data) {
            console.log(data);
        });

    });
}

function testStations() {
    NOAA.stations().get().then(function (data) {
        console.log(data);
    });
}

function testStationsObservations() {
    NOAA.stations().getAreaStations(NOAA.StateAreaCodes.WA).then(function (data) {
        data.forEach(function (station) {
            station.getObservations().then(function (data) {
                console.log(data);
            });
        });
    });
}

function testStationsLatestObservation() {
    NOAA.stations().getAreaStations(NOAA.StateAreaCodes.WA).then(function (data) {
        data.forEach(function (station) {
            station.getLatestObservations().then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
        });
    });
}

function testPointsDiscussion() {
    NOAA.points([39.7456, -97.0892]).get().then(function (data) {
        data.office.getAreaForecastDiscussion().then(function (data) {
            data[0].getProductText().then(function (data) {
                console.log(data);
            });
        });
    });
}

function testZones(area) {
    NOAA.zones().get({
        'area': area
    }).then(function (data) {
        console.log(data);

        data[0].getZone().then(function (data) {
            console.log(data);
        });

        for (let i = 0; i < data.length; i++) {
            if (data[i].type === NOAA.Zones.Types.fire) {
                data[i].getZoneForecast().then(function (data) {
                    console.log(data);
                });
                data[i].getZoneStations().then(function (data) {
                    console.log(data);
                });
                data[i].getZoneObservations().then(function (data) {
                    console.log(data);
                });
                break;
            }
        }
    });
}

function testZonesTypes() {
    NOAA.zones().getTypeZones(NOAA.Zones.Types.land).then(function (data) {
        console.log(data);

        data[0].getZone().then(function (data) {
            console.log(data);
        });

        for (let i = 0; i < data.length; i++) {
            if (data[i].type === NOAA.Zones.Types.land) {
                data[i].getZoneForecast().then(function (data) {
                    console.log(data);
                });
                data[i].getZoneStations().then(function (data) {
                    console.log(data);
                });
                data[i].getZoneObservations().then(function (data) {
                    console.log(data);
                });
                break;
            }
        }
    });
}


testPoint();
testError();
testPoints();
testPointsStations();
//testGlossary();
testGridPointsStations();
testTime();
testGridPointsForecast();
testIcons();
testProductsTypes();
testGridPointsForecastHourly();
testGridPoints(39.7456, -97.0892);
testGridPoints(37.82627236942017, -122.41845649480823);
testAlerts();

testPointAlerts(39.7456, -97.0892);
testPointAlerts(37.82627236942017, -122.41845649480823);
//testAlertsPagionation();
testAlertsTypes();
testAlertsAlert();
testAlertsActiveCount();
testAlertsZoneActive('aaaa');
testAlertsAreaActive(NOAA.StateAreaCodes.CA);
testAlertsRegionActive(NOAA.RegionCodes.AL);

//testStationsRadar();

testStations();
testStationsArea();
//testStationsObservations();
testStationsLatestObservation();

testPointsDiscussion();

testZones(NOAA.StateAreaCodes.WA);
testZones(NOAA.StateAreaCodes.AL);
testZonesTypes();