// https://tidesandcurrents.noaa.gov/api/

//The datum can be specified with the "datum=" option parameter. Note! Datum is mandatory for all water level products. 
export enum Datum {
    'CRD' =  'CRD', //Columbia River Datum
    'IGLD' =  'IGLD', //International Great Lakes Datum
    'LWD' =  'LWD', //Great Lakes Low Water Datum(Chart Datum)
    'MHHW' =  'MHHW', //Mean Higher High Water
    'MHW' =  'MHW', //Mean High Water
    'MTL' =  'MTL', //Mean Tide Level
    'MSL' =  'MSL', //Mean Sea Level
    'MLW' =  'MLW', //Mean Low Water
    'MLLW' =  'MLLW', //Mean Lower Low Water
    'NAVD' =  'NAVD', //North American Vertical Datum
    'STND' =  'STND' //Station Datum
};

export enum TidesAndWaterLevelDataProduct {
    'water_level' =  'water_level', //Preliminary or verified water levels, depending on availability.
    'air_gap' =  'air_gap', //Air Gap(distance between a bridge and the water's surface) at the station.
    'hourly_height' =  'hourly_height', //Verified hourly height water level data for the station.
    'high_low' =  'high_low', //Verified high/ low water level data for the station.
    'daily_mean' =  'daily_mean', //Verified daily mean water level data for the station.
    'monthly_mean' =  'monthly_mean', //Verified monthly mean water level data for the station.
    'one_minute_water_level' =  'one_minute_water_level', //One minute water level data for the station.
    'predictions' =  'predictions', //6 minute predictions water level data for the station.
    'datums' =  'datums' //datums data for the stations.
};

export enum MeteorologicalDataProduct {
    'air_temperature' =  'air_temperature', //Air temperature as measured at the station.
    'water_temperature' =  'water_temperature', //Water temperature as measured at the station.
    'wind' =  'wind', //Wind speed, direction, and gusts as measured at the station.
    'air_pressure' =  'air_pressure', //Barometric pressure as measured at the station.
    'conductivity' =  'conductivity', //The water's conductivity as measured at the station.
    'visibility' =  'visibility', //Visibility from the station's visibility sensor. A measure of atmospheric clarity.
    'humidity' =  'humidity', //Relative humidity as measured at the station.
    'salinity' =  'salinity', //Salinity and specific gravity data for the station.
};

export enum CurrentsDataProduct {
    'currents' =  'currents', //Currents data for currents stations.
    'currents_predictions' = 'currents_predictions', //Currents prediction data for the stations. Note! See Interval for options available and data length limitations.
    'currents_header' = 'currents_header' //Currents header data for the stations. Note! Data length is limited to 1 month.
};

export enum OperationalForecastDataProduct {
    'ofs_water_level' = 'ofs_water_level' //Water level model guidance at 6-minute intervals based on NOS OFS models. Data available from 2020 to present.
};

// gmt, lst or lst_ldt.The time_zone can be specified with the "time_zone=" option parameter.
// Example =  time_zone = gmt
// Retrieve data with GMT date / times.
export enum TimeZone {
    'gmt' =  'gmt', //Greenwich Mean Time
    'lst' =  'lst', //Local Standard Time.The time local to the requested station.
    'lst_ldt' =  'lst_ldt' //Local Standard / Local Daylight Time.The time local to the requested station.
};

export enum TidesAndWaterLevelPredictionsInterval {
    'h' =  'h', //Hourly Met data and predictions data will be returned
    'hilo' =  'hilo', //High/ Low tide predictions for subordinate stations.
    '1minutes' = 1, 
    '5minutes' = 5, 
    '6minutes' = 6, 
    '10minutes' = 10, 
    '15minutes' = 15, 
    '30minutes' = 30, 
    '60minutes' = 60
};

export enum CurrentDataInterval {
    'h' =  'h'
};

export enum MeteorologicalDataInterval {
    'h' =  'h'
};

export enum CurrentPredictionsInterval {
    'h' =  'h', //Hourly Met data and predictions data will be returned
    'max_slack' =  'max_slack',
    '1minutes' = 1, 
    '6minutes' = 6, 
    '10minutes' = 10, 
    '30minutes' = 30, 
    '60minutes' = 60
};

export enum Units {
    'metric' = 'metric', // Metric units (Celsius, meters, cm/s appropriate for the data). Note!Visibility data is kilometers (km), Currents data is in cm/s.
    'english' = 'english' // English units (fahrenheit, feet, knots appropriate for the data). Note!Visibility data is Nautical Miles (nm), Currents data is in knots.
}