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

// Specify the type of data with the "product=" option parameter. 
export enum DataProduct {
    'water_level' =  'water_level', //Preliminary or verified water levels, depending on availability.
    'air_temperature' =  'air_temperature', //Air temperature as measured at the station.
    'water_temperature' =  'water_temperature', //Water temperature as measured at the station.
    'wind' =  'wind', //Wind speed, direction, and gusts as measured at the station.
    'air_pressure' =  'air_pressure', //Barometric pressure as measured at the station.
    'air_gap' =  'air_gap', //Air Gap(distance between a bridge and the water's surface) at the station.
    'conductivity' =  'conductivity', //The water's conductivity as measured at the station.
    'visibility' =  'visibility', //Visibility from the station's visibility sensor. A measure of atmospheric clarity.
    'humidity' =  'humidity', //Relative humidity as measured at the station.
    'salinity' =  'salinity', //Salinity and specific gravity data for the station.
    'hourly_height' =  'hourly_height', //Verified hourly height water level data for the station.
    'high_low' =  'high_low', //Verified high/ low water level data for the station.
    'daily_mean' =  'daily_mean', //Verified daily mean water level data for the station.
    'monthly_mean' =  'monthly_mean', //Verified monthly mean water level data for the station.
    'one_minute_water_level' =  'one_minute_water_level', //One minute water level data for the station.
    'predictions' =  'predictions', //6 minute predictions water level data for the station.
    'datums' =  'datums', //datums data for the stations.
    'currents' =  'currents' //Currents data for currents stations.
};

// gmt, lst or lst_ldt.The time_zone can be specified with the "time_zone=" option parameter.
// Example =  time_zone = gmt
// Retrieve data with GMT date / times.
export enum TimeZone {
    'gmt' =  'gmt', //Greenwich Mean Time
    'lst' =  'lst', //Local Standard Time.The time local to the requested station.
    'lst_ldt' =  'lst_ldt' //Local Standard / Local Daylight Time.The time local to the requested station.
};

//The interval for which Meteorological data is returned
//Note! The default is 6 minute interval and there is no need to specify it.The hourly interval is supported for Met data and Predictions data only.
//    Example =  interval = h-- - Will retrieve hourly Met data 
export enum Interval {
    'h' =  'h', //Hourly Met data and predictions data will be returned
    'hilo' =  'hilo', //High/ Low tide predictions for subordinate stations.
};

//Format
//The output format can be specified with the "format=" option parameter.
export enum Format {
    'json' =  'json', //Javascript Object Notation.This format is useful for direct import to a javascript plotting library.Parsers are available for other languages such as Java and Perl.
    'xml' =  'xml', //Extensible Markup Language.This format is an industry standard for data.
    'csv' =  'csv' //Comma Separated Values.This format is suitable for export to Microsoft Excel or other spreadsheet programs.This is also the most easily human - readable format.
};

export enum Units {
    'metric' = 'metric', // Metric units (Celsius, meters, cm/s appropriate for the data). Note!Visibility data is kilometers (km), Currents data is in cm/s.
    'english' = 'english' // English units (fahrenheit, feet, knots appropriate for the data). Note!Visibility data is Nautical Miles (nm), Currents data is in knots.
}