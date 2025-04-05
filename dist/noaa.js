(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NOAA = {}));
})(this, (function (exports) { 'use strict';

    /*
     * State / marine area code
     * */
    var StateAreaCodes = {
        'AL': 'AL',
        'AK': 'AK',
        'AS': 'AS',
        'AR': 'AR',
        'AZ': 'AZ',
        'CA': 'CA',
        'CO': 'CO',
        'CT': 'CT',
        'DE': 'DE',
        'DC': 'DC',
        'FL': 'FL',
        'GA': 'GA',
        'GU': 'GU',
        'HI': 'HI',
        'ID': 'ID',
        'IL': 'IL',
        'IN': 'IN',
        'IA': 'IA',
        'KS': 'KS',
        'KY': 'KY',
        'LA': 'LA',
        'ME': 'ME',
        'MD': 'MD',
        'MA': 'MA',
        'MI': 'MI',
        'MN': 'MN',
        'MS': 'MS',
        'MO': 'MO',
        'MT': 'MT',
        'NE': 'NE',
        'NV': 'NV',
        'NH': 'NH',
        'NJ': 'NJ',
        'NM': 'NM',
        'NY': 'NY',
        'NC': 'NC',
        'ND': 'ND',
        'OH': 'OH',
        'OK': 'OK',
        'OR': 'OR',
        'PA': 'PA',
        'PR': 'PR',
        'RI': 'RI',
        'SC': 'SC',
        'SD': 'SD',
        'TN': 'TN',
        'TX': 'TX',
        'UT': 'UT',
        'VT': 'VT',
        'VI': 'VI',
        'VA': 'VA',
        'WA': 'WA',
        'WV': 'WV',
        'WI': 'WI',
        'WY': 'WY'
    };
    var MarineAreaCodes = {
        'PZ': 'PZ',
        'PK': 'PK',
        'PH': 'PH',
        'PS': 'PS',
        'PM': 'PM',
        'AN': 'AN',
        'AM': 'AM',
        'GM': 'GM',
        'LS': 'LS',
        'LM': 'LM',
        'LH': 'LH',
        'LC': 'LC',
        'LE': 'LE',
        'LO': 'LO'
    };
    var RegionCodes = {
        'AL': 'AL',
        'AT': 'AT',
        'GL': 'GL',
        'GM': 'GM',
        'PA': 'PA',
        'PI': 'PI'
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var ApiError = /** @class */ (function () {
        function ApiError(data) {
            this.correlationId = data['correlationId'];
            this.detail = data['detail'];
            this.instance = data['instance'];
            this.path = data['path'];
            this.status = data['status'];
            this.title = data['title'];
            this.type = data['type'];
        }
        return ApiError;
    }());

    var ApiBase = /** @class */ (function () {
        function ApiBase() {
        }
        ApiBase.prototype.fetch = function (absoluteUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, fetch(absoluteUrl, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/geo+json'
                                }
                            })];
                        case 1:
                            response = _b.sent();
                            if (!!response.ok) return [3 /*break*/, 3];
                            _a = ApiError.bind;
                            return [4 /*yield*/, response.json()];
                        case 2:
                            error = new (_a.apply(ApiError, [void 0, _b.sent()]))();
                            throw new Error(error.detail);
                        case 3: return [4 /*yield*/, response.json()];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        ApiBase.prototype.get = function (relativeUrl) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetch("".concat(ApiBase.base_url, "/").concat(relativeUrl))];
                });
            });
        };
        ApiBase.prototype.getNext = function (page) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetch(page.nextPageUrl)];
                });
            });
        };
        /** The API end point */
        ApiBase.base_url = 'https://api.weather.gov';
        return ApiBase;
    }());

    // returns date formatted as YYYYMMDD HH:mm in UTC
    function formatDate(date) {
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        return "".concat(year).concat(month.toString().padStart(2, "0")).concat(day.toString().padStart(2, "0"), " ").concat(hours.toString().padStart(2, "0"), ":").concat(minutes.toString().padStart(2, "0"));
    }
    function createQueryString(params) {
        if (params) {
            return Object.keys(params).map(function (key) { return key + '=' + encodeURIComponent(params[key]); }).join('&');
        }
        return '';
    }
    function appendQueryString(uri, params) {
        var query = createQueryString(params);
        if (query) {
            return "".concat(uri, "?").concat(query);
        }
        return uri;
    }
    function parseTime(s) {
        //2019-06-20 03:30
        //2019-06-22T23:58:22+00:00
        return new Date(Date.parse(s.replace(' ', 'T') + ':00+00:00'));
    }

    function getStringValueFromUrl(url) {
        var parts = url.split('/');
        return parts[parts.length - 1];
    }
    function validateProperty(key, data) {
        if (!(key in data)) {
            throw new Error("Required property ".concat(key, " is not present in JSON data"));
        }
    }
    function getProperty(key, data) {
        if (data === void 0) { data = false; }
        validateProperty(key, data);
        return data[key];
    }
    function getStringValue(key, data) {
        if (data === void 0) { data = false; }
        validateProperty(key, data);
        return getProperty(key, data);
    }
    function getFloatValue(key, data) {
        if (data === void 0) { data = false; }
        validateProperty(key, data);
        return parseFloat(getStringValue(key, data));
    }
    function getIntValue(key, data) {
        if (data === void 0) { data = false; }
        validateProperty(key, data);
        return parseInt(getStringValue(key, data));
    }
    function getBoolValue(key, data) {
        if (data === void 0) { data = false; }
        validateProperty(key, data);
        return getProperty(key, data);
    }
    function parseDate(value) {
        return new Date(Date.parse(value));
    }
    function getDateValue(key, data) {
        if (data === void 0) { data = false; }
        validateProperty(key, data);
        return parseDate(getStringValue(key, data));
    }
    function parseUnits(value) {
        return value.split(':')[1];
    }

    var Zone = /** @class */ (function () {
        function Zone(data) {
            var properties = getProperty('properties', data);
            this.id = getStringValue('id', properties);
            this.type = getStringValue('type', properties);
            if ('name' in properties) {
                this.name = getStringValue('name', properties);
            }
            if ('state' in properties) {
                this.state = getStringValue('state', properties);
            }
        }
        return Zone;
    }());

    var Alert = /** @class */ (function () {
        function Alert(data) {
            var properties = getProperty('properties', data);
            this.id = getStringValue('id', properties);
            this.areaDescription = getStringValue('areaDesc', properties);
            this.geocode = getStringValue('geocode', properties);
            this.affectedZones = [];
            var affectedZones = getStringValue('affectedZones', properties);
            for (var i = 0; i < affectedZones.length; i++) {
                this.affectedZones.push(new Zone(affectedZones[i]));
            }
            this.references = getStringValue('references', properties);
            this.sent = getDateValue('sent', properties);
            this.effective = getDateValue('effective', properties);
            this.onset = getDateValue('onset', properties);
            this.expires = getDateValue('expires', properties);
            this.ends = getDateValue('ends', properties);
            this.status = getStringValue('status', properties);
            this.messageType = getStringValue('messageType', properties);
            this.category = getStringValue('category', properties);
            this.severity = getStringValue('severity', properties);
            this.certainty = getStringValue('certainty', properties);
            this.urgency = getStringValue('urgency', properties);
            this.event = getStringValue('event', properties);
            this.sender = getStringValue('sender', properties);
            this.senderName = getStringValue('senderName', properties);
            this.headline = getStringValue('headline', properties);
            this.description = getStringValue('description', properties);
            this.instruction = getStringValue('instruction', properties);
            this.response = getStringValue('response', properties);
            this.parameters = getStringValue('parameters', properties);
        }
        return Alert;
    }());

    var DataPage = /** @class */ (function () {
        function DataPage(data) {
            this.title = getStringValue('title', data);
            this.updated = getDateValue('updated', data);
            var pagination = getProperty('pagination', data);
            if ('next' in pagination) {
                this.nextPageUrl = getStringValue('next', pagination);
            }
        }
        Object.defineProperty(DataPage.prototype, "hasMoreData", {
            get: function () {
                if (this.nextPageUrl) {
                    return true;
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        return DataPage;
    }());

    var AlertPage = /** @class */ (function (_super) {
        __extends(AlertPage, _super);
        function AlertPage(data) {
            var _this = _super.call(this, data) || this;
            var features = getProperty('features', data);
            _this.data = features.map(function (feature) { return new Alert(feature); });
            return _this;
        }
        return AlertPage;
    }(DataPage));

    var AlertStatus;
    (function (AlertStatus) {
        AlertStatus["actual"] = "actual";
        AlertStatus["exercise"] = "exercise";
        AlertStatus["system"] = "system";
        AlertStatus["test"] = "test";
        AlertStatus["draft"] = "draft";
    })(AlertStatus || (AlertStatus = {}));
    var AlertMessageType;
    (function (AlertMessageType) {
        AlertMessageType["alert"] = "alert";
        AlertMessageType["update"] = "update";
        AlertMessageType["cancel"] = "cancel";
    })(AlertMessageType || (AlertMessageType = {}));
    var AlertRegionType;
    (function (AlertRegionType) {
        AlertRegionType["land"] = "land";
        AlertRegionType["marine"] = "marine";
    })(AlertRegionType || (AlertRegionType = {}));
    var AlertUrgency;
    (function (AlertUrgency) {
        AlertUrgency["unknown"] = "unknown";
        AlertUrgency["past"] = "past";
        AlertUrgency["future"] = "future";
        AlertUrgency["expected"] = "expected";
        AlertUrgency["immediate"] = "immediate";
    })(AlertUrgency || (AlertUrgency = {}));
    var AlertSeverity;
    (function (AlertSeverity) {
        AlertSeverity["unknown"] = "unknown";
        AlertSeverity["minor"] = "minor";
        AlertSeverity["moderate"] = "moderate";
        AlertSeverity["severe"] = "severe";
        AlertSeverity["extreme"] = "extreme";
    })(AlertSeverity || (AlertSeverity = {}));
    var AlertCertainty;
    (function (AlertCertainty) {
        AlertCertainty["unknown"] = "unknown";
        AlertCertainty["unlikely"] = "unlikely";
        AlertCertainty["possible"] = "possible";
        AlertCertainty["likely"] = "likely";
        AlertCertainty["observed"] = "observed";
    })(AlertCertainty || (AlertCertainty = {}));
    var AlertsApi = /** @class */ (function (_super) {
        __extends(AlertsApi, _super);
        function AlertsApi() {
            return _super.call(this) || this;
        }
        AlertsApi.prototype.getAll = function (startTime_1, endTime_1, status_1, messageType_1) {
            return __awaiter(this, arguments, void 0, function (startTime, endTime, status, messageType, limit) {
                var data;
                if (limit === void 0) { limit = 500; }
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, "alerts?".concat(this.getQueryString(startTime, endTime, status, messageType, limit)));
                    return [2 /*return*/, new AlertPage(data)];
                });
            });
        };
        AlertsApi.prototype.getActive = function (startTime_1, endTime_1, status_1, messageType_1) {
            return __awaiter(this, arguments, void 0, function (startTime, endTime, status, messageType, limit) {
                var data;
                if (limit === void 0) { limit = 500; }
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, "alerts/active?".concat(this.getQueryString(startTime, endTime, status, messageType, limit)));
                    return [2 /*return*/, new AlertPage(data)];
                });
            });
        };
        AlertsApi.prototype.getNext = function (page) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = _super.prototype.getNext.call(this, page);
                    return [2 /*return*/, new AlertPage(data)];
                });
            });
        };
        AlertsApi.prototype.getQueryString = function (startTime, endTime, status, messageType, limit) {
            var parameters = {};
            if (startTime) {
                parameters['startTime'] = startTime;
            }
            if (endTime) {
                parameters['endTime'] = startTime;
            }
            if (status) {
                parameters['status'] = status.join(',');
            }
            return createQueryString(parameters);
        };
        return AlertsApi;
    }(ApiBase));

    var GlossaryApi = /** @class */ (function (_super) {
        __extends(GlossaryApi, _super);
        function GlossaryApi() {
            return _super.call(this) || this;
        }
        GlossaryApi.prototype.getGlossary = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, "glossary")];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data['glossary'].reduce(function (glossary, term) {
                                    if (term['term'] && term['definition']) {
                                        glossary[term['term']] = term['definition'];
                                    }
                                    return glossary;
                                }, {})];
                    }
                });
            });
        };
        return GlossaryApi;
    }(ApiBase));

    var millisecondsPerHour = 3600000;
    var Interval$1 = /** @class */ (function () {
        function Interval(s) {
            var parts = s.split('/');
            if (parts.length !== 2) {
                throw new Error('Invalid time duration value (' + s + ')');
            }
            this.startTime = parseDate(parts[0]);
            this.hours = 0;
            this.days = 0;
            //duration parsing
            this.duration = parts[1];
            var num = 0;
            if (this.duration[0] !== 'P') {
                throw new Error('Invalid time duration value (' + parts[1] + ')');
            }
            for (var i = 1; i < this.duration.length; i++) {
                if (this.duration.charAt(i) >= '0' && this.duration.charAt(i) <= '9') {
                    num = num * 10 + (this.duration.charCodeAt(i) - '0'.charCodeAt(0));
                    continue;
                }
                if (this.duration.charAt(i) === 'T') {
                    num = 0;
                    continue;
                }
                if (this.duration.charAt(i) === 'D') {
                    this.days = num;
                    num = 0;
                    continue;
                }
                if (this.duration.charAt(i) === 'H') {
                    this.hours = num;
                    num = 0;
                    continue;
                }
            }
            if (this.days === 0 && this.hours === 0) {
                throw new Error('Invalid time duration (' + this.duration + ')');
            }
            this.totalHours = (this.days * 24) + this.hours;
        }
        Interval.prototype.toDates = function () {
            var dates = [this.startTime], startTime = this.startTime.getTime();
            for (var i = 1; i < this.totalHours; i++) {
                dates.push(new Date(startTime + (i * millisecondsPerHour)));
            }
            return dates;
        };
        return Interval;
    }());

    var QuantitativeValue = /** @class */ (function () {
        function QuantitativeValue(data) {
            this.value = getFloatValue('value', data);
            this.unit = parseUnits(getStringValue('unitCode', data));
            if ('minValue' in data) {
                this.minValue = getFloatValue('minValue', data);
            }
            if ('maxValue' in data) {
                this.minValue = getFloatValue('maxValue', data);
            }
            if ('qualityControl' in data) {
                this.minValue = getFloatValue('qualityControl', data);
            }
        }
        return QuantitativeValue;
    }());

    var Coordinate = /** @class */ (function () {
        function Coordinate(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
        return Coordinate;
    }());

    var Feature = /** @class */ (function () {
        function Feature(data) {
            this.type = getStringValue('type', data);
        }
        return Feature;
    }());

    var FeaturePolygon = /** @class */ (function (_super) {
        __extends(FeaturePolygon, _super);
        function FeaturePolygon(data) {
            var _this = _super.call(this, data) || this;
            var geometry = getProperty('geometry', data);
            var coordinates = getProperty('coordinates', geometry);
            var ring0 = coordinates[0];
            _this.path = ring0.map(function (point) { return new Coordinate(point[1], point[0]); });
            return _this;
        }
        return FeaturePolygon;
    }(Feature));

    var GridpointVariable;
    (function (GridpointVariable) {
        GridpointVariable["temperature"] = "temperature";
        GridpointVariable["dewpoint"] = "dewpoint";
        GridpointVariable["maxTemperature"] = "maxTemperature";
        GridpointVariable["minTemperature"] = "minTemperature";
        GridpointVariable["relativeHumidity"] = "relativeHumidity";
        GridpointVariable["apparentTemperature"] = "apparentTemperature";
        GridpointVariable["heatIndex"] = "heatIndex";
        GridpointVariable["windChill"] = "windChill";
        GridpointVariable["wetBulbGlobeTemperature"] = "wetBulbGlobeTemperature";
        GridpointVariable["skyCover"] = "skyCover";
        GridpointVariable["windDirection"] = "windDirection";
        GridpointVariable["windSpeed"] = "windSpeed";
        GridpointVariable["windGust"] = "windGust";
        GridpointVariable["weather"] = "weather";
        GridpointVariable["hazards"] = "hazards";
        GridpointVariable["probabilityOfPrecipitation"] = "probabilityOfPrecipitation";
        GridpointVariable["quantitativePrecipitation"] = "quantitativePrecipitation";
        GridpointVariable["iceAccumulation"] = "iceAccumulation";
        GridpointVariable["snowfallAmount"] = "snowfallAmount";
        GridpointVariable["snowLevel"] = "snowLevel";
        GridpointVariable["ceilingHeight"] = "ceilingHeight";
        GridpointVariable["visibility"] = "visibility";
        GridpointVariable["transportWindSpeed"] = "transportWindSpeed";
        GridpointVariable["transportWindDirection"] = "transportWindDirection";
        GridpointVariable["mixingHeight"] = "mixingHeight";
        GridpointVariable["hainesIndex"] = "hainesIndex";
        GridpointVariable["lightningActivityLevel"] = "lightningActivityLevel";
        GridpointVariable["twentyFootWindSpeed"] = "twentyFootWindSpeed";
        GridpointVariable["twentyFootWindDirection"] = "twentyFootWindDirection";
        GridpointVariable["waveHeight"] = "waveHeight";
        GridpointVariable["wavePeriod"] = "wavePeriod";
        GridpointVariable["waveDirection"] = "waveDirection";
        GridpointVariable["primarySwellHeight"] = "primarySwellHeight";
        GridpointVariable["primarySwellDirection"] = "primarySwellDirection";
        GridpointVariable["secondarySwellHeight"] = "secondarySwellHeight";
        GridpointVariable["secondarySwellDirection"] = "secondarySwellDirection";
        GridpointVariable["wavePeriod2"] = "wavePeriod2";
        GridpointVariable["windWaveHeight"] = "windWaveHeight";
        GridpointVariable["dispersionIndex"] = "dispersionIndex";
        GridpointVariable["pressure"] = "pressure";
        GridpointVariable["probabilityOfTropicalStormWinds"] = "probabilityOfTropicalStormWinds";
        GridpointVariable["probabilityOfHurricaneWinds"] = "probabilityOfHurricaneWinds";
        GridpointVariable["potentialOf15mphWinds"] = "potentialOf15mphWinds";
        GridpointVariable["potentialOf25mphWinds"] = "potentialOf25mphWinds";
        GridpointVariable["potentialOf35mphWinds"] = "potentialOf35mphWinds";
        GridpointVariable["potentialOf45mphWinds"] = "potentialOf45mphWinds";
        GridpointVariable["potentialOf20mphWindGusts"] = "potentialOf20mphWindGusts";
        GridpointVariable["potentialOf30mphWindGusts"] = "potentialOf30mphWindGusts";
        GridpointVariable["potentialOf40mphWindGusts"] = "potentialOf40mphWindGusts";
        GridpointVariable["potentialOf50mphWindGusts"] = "potentialOf50mphWindGusts";
        GridpointVariable["potentialOf60mphWindGusts"] = "potentialOf60mphWindGusts";
        GridpointVariable["grasslandFireDangerIndex"] = "grasslandFireDangerIndex";
        GridpointVariable["probabilityOfThunder"] = "probabilityOfThunder";
        GridpointVariable["davisStabilityIndex"] = "davisStabilityIndex";
        GridpointVariable["atmosphericDispersionIndex"] = "atmosphericDispersionIndex";
        GridpointVariable["lowVisibilityOccurrenceRiskIndex"] = "lowVisibilityOccurrenceRiskIndex";
        GridpointVariable["stability"] = "stability";
        GridpointVariable["redFlagThreatIndex"] = "redFlagThreatIndex";
    })(GridpointVariable || (GridpointVariable = {}));

    var IntervalValue = /** @class */ (function () {
        function IntervalValue(data) {
            this.value = getFloatValue('value', data);
            this.validTime = new Interval$1(getStringValue('validTime', data));
        }
        return IntervalValue;
    }());

    var GridpointQuantitativeValue = /** @class */ (function () {
        function GridpointQuantitativeValue(data) {
            if ('uom' in data) {
                this.unit = parseUnits(getStringValue('uom', data));
            }
            this.values = getProperty('values', data).map(function (x) { return new IntervalValue(x); });
        }
        return GridpointQuantitativeValue;
    }());

    var NWSForecastOfficeId;
    (function (NWSForecastOfficeId) {
        NWSForecastOfficeId["AKQ"] = "AKQ";
        NWSForecastOfficeId["ALY"] = "ALY";
        NWSForecastOfficeId["BGM"] = "BGM";
        NWSForecastOfficeId["BOX"] = "BOX";
        NWSForecastOfficeId["BTV"] = "BTV";
        NWSForecastOfficeId["BUF"] = "BUF";
        NWSForecastOfficeId["CAE"] = "CAE";
        NWSForecastOfficeId["CAR"] = "CAR";
        NWSForecastOfficeId["CHS"] = "CHS";
        NWSForecastOfficeId["CLE"] = "CLE";
        NWSForecastOfficeId["CTP"] = "CTP";
        NWSForecastOfficeId["GSP"] = "GSP";
        NWSForecastOfficeId["GYX"] = "GYX";
        NWSForecastOfficeId["ILM"] = "ILM";
        NWSForecastOfficeId["ILN"] = "ILN";
        NWSForecastOfficeId["LWX"] = "LWX";
        NWSForecastOfficeId["MHX"] = "MHX";
        NWSForecastOfficeId["OKX"] = "OKX";
        NWSForecastOfficeId["PBZ"] = "PBZ";
        NWSForecastOfficeId["PHI"] = "PHI";
        NWSForecastOfficeId["RAH"] = "RAH";
        NWSForecastOfficeId["RLX"] = "RLX";
        NWSForecastOfficeId["RNK"] = "RNK";
        NWSForecastOfficeId["ABQ"] = "ABQ";
        NWSForecastOfficeId["AMA"] = "AMA";
        NWSForecastOfficeId["BMX"] = "BMX";
        NWSForecastOfficeId["BRO"] = "BRO";
        NWSForecastOfficeId["CRP"] = "CRP";
        NWSForecastOfficeId["EPZ"] = "EPZ";
        NWSForecastOfficeId["EWX"] = "EWX";
        NWSForecastOfficeId["FFC"] = "FFC";
        NWSForecastOfficeId["FWD"] = "FWD";
        NWSForecastOfficeId["HGX"] = "HGX";
        NWSForecastOfficeId["HUN"] = "HUN";
        NWSForecastOfficeId["JAN"] = "JAN";
        NWSForecastOfficeId["JAX"] = "JAX";
        NWSForecastOfficeId["KEY"] = "KEY";
        NWSForecastOfficeId["LCH"] = "LCH";
        NWSForecastOfficeId["LIX"] = "LIX";
        NWSForecastOfficeId["LUB"] = "LUB";
        NWSForecastOfficeId["LZK"] = "LZK";
        NWSForecastOfficeId["MAF"] = "MAF";
        NWSForecastOfficeId["MEG"] = "MEG";
        NWSForecastOfficeId["MFL"] = "MFL";
        NWSForecastOfficeId["MLB"] = "MLB";
        NWSForecastOfficeId["MOB"] = "MOB";
        NWSForecastOfficeId["MRX"] = "MRX";
        NWSForecastOfficeId["OHX"] = "OHX";
        NWSForecastOfficeId["OUN"] = "OUN";
        NWSForecastOfficeId["SHV"] = "SHV";
        NWSForecastOfficeId["SJT"] = "SJT";
        NWSForecastOfficeId["SJU"] = "SJU";
        NWSForecastOfficeId["TAE"] = "TAE";
        NWSForecastOfficeId["TBW"] = "TBW";
        NWSForecastOfficeId["TSA"] = "TSA";
        NWSForecastOfficeId["ABR"] = "ABR";
        NWSForecastOfficeId["APX"] = "APX";
        NWSForecastOfficeId["ARX"] = "ARX";
        NWSForecastOfficeId["BIS"] = "BIS";
        NWSForecastOfficeId["BOU"] = "BOU";
        NWSForecastOfficeId["CYS"] = "CYS";
        NWSForecastOfficeId["DDC"] = "DDC";
        NWSForecastOfficeId["DLH"] = "DLH";
        NWSForecastOfficeId["DMX"] = "DMX";
        NWSForecastOfficeId["DTX"] = "DTX";
        NWSForecastOfficeId["DVN"] = "DVN";
        NWSForecastOfficeId["EAX"] = "EAX";
        NWSForecastOfficeId["FGF"] = "FGF";
        NWSForecastOfficeId["FSD"] = "FSD";
        NWSForecastOfficeId["GID"] = "GID";
        NWSForecastOfficeId["GJT"] = "GJT";
        NWSForecastOfficeId["GLD"] = "GLD";
        NWSForecastOfficeId["GRB"] = "GRB";
        NWSForecastOfficeId["GRR"] = "GRR";
        NWSForecastOfficeId["ICT"] = "ICT";
        NWSForecastOfficeId["ILX"] = "ILX";
        NWSForecastOfficeId["IND"] = "IND";
        NWSForecastOfficeId["IWX"] = "IWX";
        NWSForecastOfficeId["JKL"] = "JKL";
        NWSForecastOfficeId["LBF"] = "LBF";
        NWSForecastOfficeId["LMK"] = "LMK";
        NWSForecastOfficeId["LOT"] = "LOT";
        NWSForecastOfficeId["LSX"] = "LSX";
        NWSForecastOfficeId["MKX"] = "MKX";
        NWSForecastOfficeId["MPX"] = "MPX";
        NWSForecastOfficeId["MQT"] = "MQT";
        NWSForecastOfficeId["OAX"] = "OAX";
        NWSForecastOfficeId["PAH"] = "PAH";
        NWSForecastOfficeId["PUB"] = "PUB";
        NWSForecastOfficeId["RIW"] = "RIW";
        NWSForecastOfficeId["SGF"] = "SGF";
        NWSForecastOfficeId["TOP"] = "TOP";
        NWSForecastOfficeId["UNR"] = "UNR";
        NWSForecastOfficeId["BOI"] = "BOI";
        NWSForecastOfficeId["BYZ"] = "BYZ";
        NWSForecastOfficeId["EKA"] = "EKA";
        NWSForecastOfficeId["FGZ"] = "FGZ";
        NWSForecastOfficeId["GGW"] = "GGW";
        NWSForecastOfficeId["HNX"] = "HNX";
        NWSForecastOfficeId["LKN"] = "LKN";
        NWSForecastOfficeId["LOX"] = "LOX";
        NWSForecastOfficeId["MFR"] = "MFR";
        NWSForecastOfficeId["MSO"] = "MSO";
        NWSForecastOfficeId["MTR"] = "MTR";
        NWSForecastOfficeId["OTX"] = "OTX";
        NWSForecastOfficeId["PDT"] = "PDT";
        NWSForecastOfficeId["PIH"] = "PIH";
        NWSForecastOfficeId["PQR"] = "PQR";
        NWSForecastOfficeId["PSR"] = "PSR";
        NWSForecastOfficeId["REV"] = "REV";
        NWSForecastOfficeId["SEW"] = "SEW";
        NWSForecastOfficeId["SGX"] = "SGX";
        NWSForecastOfficeId["SLC"] = "SLC";
        NWSForecastOfficeId["STO"] = "STO";
        NWSForecastOfficeId["TFX"] = "TFX";
        NWSForecastOfficeId["TWC"] = "TWC";
        NWSForecastOfficeId["VEF"] = "VEF";
        NWSForecastOfficeId["AER"] = "AER";
        NWSForecastOfficeId["AFC"] = "AFC";
        NWSForecastOfficeId["AFG"] = "AFG";
        NWSForecastOfficeId["AJK"] = "AJK";
        NWSForecastOfficeId["ALU"] = "ALU";
        NWSForecastOfficeId["GUM"] = "GUM";
        NWSForecastOfficeId["HPA"] = "HPA";
        NWSForecastOfficeId["HFO"] = "HFO";
        NWSForecastOfficeId["PPG"] = "PPG";
        NWSForecastOfficeId["STU"] = "STU";
        NWSForecastOfficeId["NH1"] = "NH1";
        NWSForecastOfficeId["NH2"] = "NH2";
        NWSForecastOfficeId["ONA"] = "ONA";
        NWSForecastOfficeId["ONP"] = "ONP";
    })(NWSForecastOfficeId || (NWSForecastOfficeId = {}));
    function getOfficeIdValue(key, data) {
        var value = getStringValue(key, data);
        return NWSForecastOfficeId[value];
    }

    var GridpointData = /** @class */ (function (_super) {
        __extends(GridpointData, _super);
        function GridpointData(data) {
            var _this = _super.call(this, data) || this;
            var properties = getProperty('properties', data);
            _this.gridX = getFloatValue('gridX', properties);
            _this.gridY = getFloatValue('gridY', properties);
            _this.office = getOfficeIdValue('gridId', properties);
            _this.elevation = new QuantitativeValue(getProperty('elevation', properties));
            _this.updateTime = getDateValue('updateTime', properties);
            _this.validTimes = new Interval$1(getStringValue('validTimes', properties));
            _this.values = {};
            Object.keys(GridpointVariable).forEach(function (key) {
                if (key in properties) {
                    _this.values[key] = new GridpointQuantitativeValue(properties[key]);
                }
            });
            return _this;
        }
        return GridpointData;
    }(FeaturePolygon));

    var GridpointForecastUnits;
    (function (GridpointForecastUnits) {
        GridpointForecastUnits["metric"] = "si";
        GridpointForecastUnits["us"] = "us";
    })(GridpointForecastUnits || (GridpointForecastUnits = {}));
    var TemperatureUnit;
    (function (TemperatureUnit) {
        TemperatureUnit["F"] = "F";
        TemperatureUnit["C"] = "C";
    })(TemperatureUnit || (TemperatureUnit = {}));
    var TemperatureTrend;
    (function (TemperatureTrend) {
        TemperatureTrend["rising"] = "rising";
        TemperatureTrend["falling"] = "falling";
    })(TemperatureTrend || (TemperatureTrend = {}));
    var WindDirection;
    (function (WindDirection) {
        WindDirection["N"] = "N";
        WindDirection["NNE"] = "NNE";
        WindDirection["NE"] = "NE";
        WindDirection["ENE"] = "ENE";
        WindDirection["E"] = "E";
        WindDirection["ESE"] = "ESE";
        WindDirection["SE"] = "SE";
        WindDirection["SSE"] = "SSE";
        WindDirection["S"] = "S";
        WindDirection["SSW"] = "SSW";
        WindDirection["SW"] = "SW";
        WindDirection["WSW"] = "WSW";
        WindDirection["W"] = "W";
        WindDirection["WNW"] = "WNW";
        WindDirection["NW"] = "NW";
        WindDirection["NNW"] = "NNW";
    })(WindDirection || (WindDirection = {}));

    /*
        "number": 3,
        "name": "Thursday",
        "startTime": "2019-06-13T06:00:00-05:00",
        "endTime": "2019-06-13T18:00:00-05:00",
        "isDaytime": true,
        "temperature": 76,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "windSpeed": "0 to 10 mph",
        "windDirection": "SW",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 76. Southwest wind 0 to 10 mph."
    */
    var GridpointForecastPeriod = /** @class */ (function () {
        function GridpointForecastPeriod(data) {
            this.number = getIntValue('number', data);
            if ('name' in data) {
                this.name = getStringValue('name', data);
            }
            this.startTime = getDateValue('startTime', data);
            this.endTime = getDateValue('endTime', data);
            this.isDaytime = getBoolValue('isDaytime', data);
            this.temperature = getFloatValue('temperature', data);
            this.temperatureUnit = TemperatureUnit[getStringValue('temperatureUnit', data)];
            this.temperatureTrend = TemperatureTrend[getStringValue('temperatureTrend', data)];
            this.windSpeed = getStringValue('windSpeed', data);
            if ('windGust' in data) {
                this.windGust = getStringValue('windGust', data);
            }
            this.windDirection = WindDirection[getStringValue('windDirection', data)];
            if ('probabilityOfPrecipitation' in data) {
                this.windGust = getStringValue('probabilityOfPrecipitation', data);
            }
            if ('dewpoint' in data) {
                this.windGust = getStringValue('dewpoint', data);
            }
            if ('relativeHumidity' in data) {
                this.windGust = getStringValue('relativeHumidity', data);
            }
            if ('icon' in data) {
                this.icon = getStringValue('icon', data);
            }
            if ('shortForecast' in data) {
                this.shortForecast = getStringValue('shortForecast', data);
            }
            if ('detailedForecast' in data) {
                this.detailedForecast = getStringValue('detailedForecast', data);
            }
        }
        return GridpointForecastPeriod;
    }());

    var GridpointForecast = /** @class */ (function (_super) {
        __extends(GridpointForecast, _super);
        function GridpointForecast(data) {
            var _this = _super.call(this, data) || this;
            var properties = getProperty('properties', data);
            _this.units = GridpointForecastUnits[getStringValue('units', properties)];
            if ('forecastGenerator' in properties) {
                _this.forecastGenerator = getStringValue('forecastGenerator', properties);
            }
            _this.generatedAt = getDateValue('generatedAt', properties);
            _this.updateTime = getDateValue('updateTime', properties);
            _this.validTimes = new Interval$1(getStringValue('validTimes', properties));
            _this.elevation = new QuantitativeValue(getProperty('elevation', properties));
            _this.periods = getProperty('periods', properties).map(function (period) { return new GridpointForecastPeriod(period); });
            return _this;
        }
        return GridpointForecast;
    }(FeaturePolygon));

    var FeaturePoint = /** @class */ (function (_super) {
        __extends(FeaturePoint, _super);
        function FeaturePoint(data) {
            var _this = _super.call(this, data) || this;
            var geometry = getProperty('geometry', data);
            var coordinates = getProperty('coordinates', geometry);
            _this.latitude = coordinates[1];
            _this.longitude = coordinates[0];
            return _this;
        }
        return FeaturePoint;
    }(Feature));

    var ObservationStation = /** @class */ (function (_super) {
        __extends(ObservationStation, _super);
        function ObservationStation(data) {
            var _this = _super.call(this, data) || this;
            var properties = getProperty('properties', data);
            _this.elevation = new QuantitativeValue(getProperty('elevation', properties));
            _this.id = getStringValue('stationIdentifier', properties);
            _this.name = getStringValue('name', properties);
            _this.timeZone = getStringValue('timeZone', properties);
            if ('forecast' in properties) {
                _this.forecastZone = getStringValueFromUrl(getStringValue('forecast', properties));
            }
            if ('county' in properties) {
                _this.county = getStringValueFromUrl(getStringValue('county', properties));
            }
            if ('fireWeatherZone' in properties) {
                _this.fireWeatherZone = getStringValueFromUrl(getStringValue('fireWeatherZone', properties));
            }
            return _this;
        }
        return ObservationStation;
    }(FeaturePoint));

    var ObservationStationPage = /** @class */ (function (_super) {
        __extends(ObservationStationPage, _super);
        function ObservationStationPage(data) {
            var _this = _super.call(this, data) || this;
            var features = getProperty('features', data);
            _this.data = features.map(function (feature) { return new ObservationStation(feature); });
            return _this;
        }
        return ObservationStationPage;
    }(DataPage));

    var GridpointsApi = /** @class */ (function (_super) {
        __extends(GridpointsApi, _super);
        function GridpointsApi() {
            return _super.call(this) || this;
        }
        GridpointsApi.prototype.getData = function (officeId, x, y) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, "gridpoints/".concat(officeId, "/").concat(x, ",").concat(y))];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new GridpointData(data)];
                    }
                });
            });
        };
        GridpointsApi.prototype.getForecast = function (officeId_1, x_1, y_1) {
            return __awaiter(this, arguments, void 0, function (officeId, x, y, units) {
                var data;
                if (units === void 0) { units = GridpointForecastUnits.us; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, "gridpoints/".concat(officeId, "/").concat(x, ",").concat(y, "/forecast"))];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new GridpointForecast(data)];
                    }
                });
            });
        };
        GridpointsApi.prototype.getForecastHourly = function (officeId_1, x_1, y_1) {
            return __awaiter(this, arguments, void 0, function (officeId, x, y, units) {
                var data;
                if (units === void 0) { units = GridpointForecastUnits.us; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, "gridpoints/".concat(officeId, "/").concat(x, ",").concat(y, "/forecast/hourly"))];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new GridpointForecast(data)];
                    }
                });
            });
        };
        GridpointsApi.prototype.getStations = function (officeId, x, y) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, "gridpoints/".concat(officeId, "/").concat(x, ",").concat(y, "/stations"))];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new ObservationStationPage(data)];
                    }
                });
            });
        };
        return GridpointsApi;
    }(ApiBase));

    var RelativeLocation = /** @class */ (function (_super) {
        __extends(RelativeLocation, _super);
        function RelativeLocation(data) {
            var _this = _super.call(this, data) || this;
            var properties = getProperty('properties', data);
            _this.city = getStringValue('city', properties);
            _this.state = getStringValue('state', properties);
            _this.distance = new QuantitativeValue(getProperty('distance', properties));
            _this.bearing = new QuantitativeValue(getProperty('bearing', properties));
            return _this;
        }
        return RelativeLocation;
    }(FeaturePoint));

    var Point = /** @class */ (function (_super) {
        __extends(Point, _super);
        function Point(data) {
            var _this = _super.call(this, data) || this;
            var properties = getProperty('properties', data);
            _this.gridX = getIntValue('gridX', properties);
            _this.gridY = getIntValue('gridY', properties);
            _this.office = getOfficeIdValue('gridId', properties);
            _this.forecastZone = getStringValueFromUrl(getStringValue('forecastZone', properties));
            _this.timeZone = getStringValue('timeZone', properties);
            _this.radarStation = getStringValue('radarStation', properties);
            _this.relativeLocation = new RelativeLocation(getProperty('relativeLocation', properties));
            _this.county = getStringValueFromUrl(getStringValue('county', properties));
            _this.fireWeatherZone = getStringValueFromUrl(getStringValue('fireWeatherZone', properties));
            return _this;
        }
        return Point;
    }(FeaturePoint));

    var PointsApi = /** @class */ (function (_super) {
        __extends(PointsApi, _super);
        function PointsApi() {
            return _super.call(this) || this;
        }
        PointsApi.prototype.getPoint = function (latitude, longitude) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, "points/".concat(latitude, ",").concat(longitude))];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Point(data)];
                    }
                });
            });
        };
        return PointsApi;
    }(ApiBase));

    var ProductsApi = /** @class */ (function (_super) {
        __extends(ProductsApi, _super);
        function ProductsApi() {
            return _super.call(this) || this;
        }
        return ProductsApi;
    }(ApiBase));

    var StationsApi = /** @class */ (function (_super) {
        __extends(StationsApi, _super);
        function StationsApi() {
            return _super.call(this) || this;
        }
        return StationsApi;
    }(ApiBase));

    var ZonesApi = /** @class */ (function (_super) {
        __extends(ZonesApi, _super);
        function ZonesApi() {
            return _super.call(this) || this;
        }
        ZonesApi.Types = {
            'land': 'land',
            'marine': 'marine',
            'forecast': 'forecast',
            'public': 'public',
            'coastal': 'coastal',
            'offshore': 'offshore',
            'fire': 'fire',
            'county': 'county'
        };
        return ZonesApi;
    }(ApiBase));

    var Weather = {
        points: new PointsApi(),
        glossary: new GlossaryApi(),
        products: new ProductsApi(),
        alerts: new AlertsApi(),
        stations: new StationsApi(),
        zones: new ZonesApi(),
        gridPoint: new GridpointsApi(),
        NWSForecastOfficeId: NWSForecastOfficeId
    };

    // https://tidesandcurrents.noaa.gov/api/
    //The datum can be specified with the "datum=" option parameter. Note! Datum is mandatory for all water level products. 
    var Datum;
    (function (Datum) {
        Datum["CRD"] = "CRD";
        Datum["IGLD"] = "IGLD";
        Datum["LWD"] = "LWD";
        Datum["MHHW"] = "MHHW";
        Datum["MHW"] = "MHW";
        Datum["MTL"] = "MTL";
        Datum["MSL"] = "MSL";
        Datum["MLW"] = "MLW";
        Datum["MLLW"] = "MLLW";
        Datum["NAVD"] = "NAVD";
        Datum["STND"] = "STND"; //Station Datum
    })(Datum || (Datum = {}));
    // Specify the type of data with the "product=" option parameter. 
    var DataProduct;
    (function (DataProduct) {
        DataProduct["water_level"] = "water_level";
        DataProduct["air_temperature"] = "air_temperature";
        DataProduct["water_temperature"] = "water_temperature";
        DataProduct["wind"] = "wind";
        DataProduct["air_pressure"] = "air_pressure";
        DataProduct["air_gap"] = "air_gap";
        DataProduct["conductivity"] = "conductivity";
        DataProduct["visibility"] = "visibility";
        DataProduct["humidity"] = "humidity";
        DataProduct["salinity"] = "salinity";
        DataProduct["hourly_height"] = "hourly_height";
        DataProduct["high_low"] = "high_low";
        DataProduct["daily_mean"] = "daily_mean";
        DataProduct["monthly_mean"] = "monthly_mean";
        DataProduct["one_minute_water_level"] = "one_minute_water_level";
        DataProduct["predictions"] = "predictions";
        DataProduct["datums"] = "datums";
        DataProduct["currents"] = "currents"; //Currents data for currents stations.
    })(DataProduct || (DataProduct = {}));
    // gmt, lst or lst_ldt.The time_zone can be specified with the "time_zone=" option parameter.
    // Example =  time_zone = gmt
    // Retrieve data with GMT date / times.
    var TimeZone;
    (function (TimeZone) {
        TimeZone["gmt"] = "gmt";
        TimeZone["lst"] = "lst";
        TimeZone["lst_ldt"] = "lst_ldt"; //Local Standard / Local Daylight Time.The time local to the requested station.
    })(TimeZone || (TimeZone = {}));
    //The interval for which Meteorological data is returned
    //Note! The default is 6 minute interval and there is no need to specify it.The hourly interval is supported for Met data and Predictions data only.
    //    Example =  interval = h-- - Will retrieve hourly Met data 
    var Interval;
    (function (Interval) {
        Interval["h"] = "h";
        Interval["hilo"] = "hilo";
    })(Interval || (Interval = {}));
    //Format
    //The output format can be specified with the "format=" option parameter.
    var Format;
    (function (Format) {
        Format["json"] = "json";
        Format["xml"] = "xml";
        Format["csv"] = "csv"; //Comma Separated Values.This format is suitable for export to Microsoft Excel or other spreadsheet programs.This is also the most easily human - readable format.
    })(Format || (Format = {}));
    var Units;
    (function (Units) {
        Units["metric"] = "metric";
        Units["english"] = "english"; // English units (fahrenheit, feet, knots appropriate for the data). Note!Visibility data is Nautical Miles (nm), Currents data is in knots.
    })(Units || (Units = {}));

    var TidesAndCurrentsDataApi = /** @class */ (function () {
        function TidesAndCurrentsDataApi(stationId, product, datum, interval, units) {
            if (datum === void 0) { datum = undefined; }
            if (interval === void 0) { interval = undefined; }
            if (units === void 0) { units = 'metric'; }
            if (!(product in DataProduct)) {
                throw new Error('Invalid data product');
            }
            if (!(units in Units)) {
                throw new Error('Invalid units');
            }
            this.params = {};
            this.params['station'] = stationId;
            this.params['product'] = product;
            this.params['format'] = Format.json;
            this.params['units'] = units;
            this.params['time_zone'] = TimeZone.gmt;
            if (datum) {
                if (!(datum in Datum)) {
                    throw new Error('Invalid datum value');
                }
                this.params['datum'] = datum;
            }
            if (interval) {
                if (!(interval in Interval)) {
                    throw new Error('Invalid interval');
                }
                this.params['interval'] = interval;
            }
        }
        TidesAndCurrentsDataApi.prototype.getLatest = function () {
            this.params['date'] = 'latest';
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.getRecent = function () {
            this.params['date'] = 'recent';
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.getToday = function () {
            this.params['date'] = 'today';
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.getLastHours = function (hours) {
            this.params['range'] = hours;
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.getHoursAfter = function (start, hours) {
            this.params['begin_date'] = formatDate(start);
            this.params['range'] = hours;
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.getHoursBefore = function (end, hours) {
            this.params['end_date'] = formatDate(end);
            this.params['range'] = hours;
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.getDateRange = function (start, end) {
            this.params['begin_date'] = formatDate(start);
            this.params['end_date'] = formatDate(end);
            return this.get();
        };
        TidesAndCurrentsDataApi.prototype.get = function () {
            var _this = this;
            var self = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                var url = appendQueryString(TidesAndCurrentsDataApi.url, _this.params);
                xhr.open('GET', url);
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var json = JSON.parse(xhr.response);
                        if (json['error']) {
                            reject(json['error']);
                        }
                        else {
                            var data = self.parseResponse(json);
                            data['parameters'] = Object.assign({}, self.params);
                            resolve(data);
                        }
                    }
                    else {
                        reject(xhr);
                    }
                };
                xhr.onerror = function () {
                    reject(xhr);
                };
                xhr.send();
            });
        };
        TidesAndCurrentsDataApi.prototype.parseResponse = function (data) {
            return data;
        };
        /** The API end point */
        TidesAndCurrentsDataApi.url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
        return TidesAndCurrentsDataApi;
    }());

    var Datums = /** @class */ (function (_super) {
        __extends(Datums, _super);
        function Datums(stationId) {
            return _super.call(this, stationId, DataProduct.datums, undefined, undefined, Units.metric) || this;
        }
        Datums.prototype.parseResponse = function (data) {
            var datums = [];
            data['datums'].forEach(function (d) {
                datums.push({
                    'name': d['n'],
                    'value': parseFloat(d['v']),
                    'unit': 'm'
                });
            });
            return datums;
        };
        return Datums;
    }(TidesAndCurrentsDataApi));

    var Predictions = /** @class */ (function (_super) {
        __extends(Predictions, _super);
        function Predictions(stationId, datum) {
            if (!datum) {
                datum = Datum.STND;
            }
            return _super.call(this, stationId, DataProduct.predictions, datum, Interval.hilo, Units.metric) || this;
        }
        Predictions.prototype.parseResponse = function (data) {
            var predictions = [];
            data['predictions'].forEach(function (d) {
                predictions.push({
                    'time': parseTime(d['t']),
                    'value': parseFloat(d['v']),
                    'type': d['type']
                });
            });
            return predictions;
        };
        return Predictions;
    }(TidesAndCurrentsDataApi));

    var Wind = /** @class */ (function (_super) {
        __extends(Wind, _super);
        function Wind(stationId, interval) {
            return _super.call(this, stationId, DataProduct.wind, undefined, interval, Units.metric) || this;
        }
        Wind.prototype.parseResponse = function (data) {
            return data;
        };
        return Wind;
    }(TidesAndCurrentsDataApi));

    var TidesAndCurrentsMetadataApi = /** @class */ (function () {
        function TidesAndCurrentsMetadataApi() {
        }
        TidesAndCurrentsMetadataApi.prototype.stations = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var relativeUrl, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relativeUrl = 'stations.json';
                            if (type) {
                                relativeUrl = appendQueryString(relativeUrl, { type: type });
                            }
                            return [4 /*yield*/, this.get(relativeUrl)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.stations];
                    }
                });
            });
        };
        TidesAndCurrentsMetadataApi.prototype.station = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var relativeUrl, response, stations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relativeUrl = "stations/".concat(id, ".json");
                            return [4 /*yield*/, this.get(relativeUrl)];
                        case 1:
                            response = _a.sent();
                            stations = response.stations;
                            if (stations && stations.length === 1) {
                                return [2 /*return*/, stations[0]];
                            }
                            throw new Error("API did not return any data for station id ".concat(id));
                    }
                });
            });
        };
        TidesAndCurrentsMetadataApi.prototype.get = function (relativeUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, errorMessage, errorData;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            url = "".concat(TidesAndCurrentsMetadataApi.baseUrl, "/").concat(relativeUrl);
                            return [4 /*yield*/, fetch(url)];
                        case 1:
                            response = _b.sent();
                            if (!(response.ok === false)) return [3 /*break*/, 6];
                            errorMessage = null;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, response.json()];
                        case 3:
                            errorData = _b.sent();
                            if ('errorMsg' in errorData) {
                                errorMessage = errorData.errorMsg;
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 5: throw new Error(errorMessage !== null && errorMessage !== void 0 ? errorMessage : "API responded with status ".concat(response.status, " (").concat(response.statusText, ")"));
                        case 6: return [4 /*yield*/, response.json()];
                        case 7: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        TidesAndCurrentsMetadataApi.baseUrl = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi';
        return TidesAndCurrentsMetadataApi;
    }());

    var StationType;
    (function (StationType) {
        StationType["waterlevels"] = "waterlevels";
        StationType["historicwl"] = "historicwl";
        StationType["met"] = "met";
        StationType["waterlevelsandmet"] = "waterlevelsandmet";
        StationType["tidepredictions"] = "tidepredictions";
        StationType["harcon"] = "harcon";
        StationType["datums"] = "datums";
        StationType["supersededdatums"] = "supersededdatums";
        StationType["benchmarks"] = "benchmarks";
        StationType["supersededbenchmarks"] = "supersededbenchmarks";
        StationType["currents"] = "currents";
        StationType["historiccurrents"] = "historiccurrents";
        StationType["surveycurrents"] = "surveycurrents";
        StationType["currentpredictions"] = "currentpredictions";
        StationType["cond"] = "cond";
        StationType["watertemp"] = "watertemp";
        StationType["physocean"] = "physocean";
        StationType["tcoon"] = "tcoon";
        StationType["oneminute"] = "1minute";
        StationType["airgap"] = "airgap";
        StationType["visibility"] = "visibility";
        StationType["highwater"] = "highwater";
        StationType["lowwater"] = "lowwater"; // Stations that are in Low Water Alert.
    })(StationType || (StationType = {}));

    var TidesAndCurrents = {
        Format: Format,
        Datum: Datum,
        DataProduct: DataProduct,
        Units: Units,
        Interval: Interval,
        StationType: StationType,
        data: {
            predictions: function (stationId, datum) {
                return new Predictions(stationId, datum);
            },
            datums: function (stationId) {
                return new Datums(stationId);
            },
            wind: function (stationId, interval) {
                return new Wind(stationId, interval);
            }
        },
        metadata: new TidesAndCurrentsMetadataApi()
    };

    exports.MarineAreaCodes = MarineAreaCodes;
    exports.RegionCodes = RegionCodes;
    exports.StateAreaCodes = StateAreaCodes;
    exports.TidesAndCurrents = TidesAndCurrents;
    exports.Weather = Weather;

}));
//# sourceMappingURL=noaa.js.map
