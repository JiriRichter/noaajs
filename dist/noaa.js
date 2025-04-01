(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NOAA = {}));
})(this, (function (exports) { 'use strict';

    var Time = /** @class */ (function () {
        function Time(t) {
            if (t instanceof Date) {
                this.milliseconds = t.getTime();
            }
            else if (typeof t === 'string') {
                this.milliseconds = Date.parse(t);
            }
            else if (typeof t === 'number') {
                this.milliseconds = t;
            }
            else {
                throw new Error('Invalid time argument (' + t + ')');
            }
        }
        Time.prototype.toString = function () {
            return this.toDate().toISOString();
        };
        Time.prototype.toDate = function () {
            return new Date(this.milliseconds);
        };
        return Time;
    }());
    function toTime(a) {
        if (a === undefined || a === null) {
            return a;
        }
        return new Time(a);
    }

    /* @class XY
     * @aka NOAA.XY
     *
     * Represents a grid point with a certain X and Y.
     *
     * @example
     *
     * ```
     * let xy = NOAA.xy(1,3);
     * ```
     */
    var XY = /** @class */ (function () {
        function XY(x, y) {
            x = parseInt(x);
            y = parseInt(y);
            if (isNaN(x) || isNaN(y)) {
                throw new Error('Invalid x, y values: (' + x + ', ' + y + ')');
            }
            // @property x: Number
            // x grid coordinate
            this.x = +x;
            // @property y: Number
            // y grid coordinate
            this.y = +y;
        }
        XY.prototype.toString = function () {
            return "".concat(this.x, ",").concat(this.y);
        };
        return XY;
    }());
    // @factory NOAA.xy(x: Number, y: Number): XY
    // Creates an object representing a grid point with the given x and y coordinates.
    // @alternative
    // @factory NOAA.xy(coords: Array): XY
    // Expects an array of the form `[Number, Number]` instead.
    // @alternative
    // @factory NOAA.latLon(coords: Object): XY
    // Expects an plain object of the form `{x: Number, y: Number}` instead.
    function toXY(a, b) {
        if (a instanceof XY) {
            return a;
        }
        if (Array.isArray(a) && typeof a[0] !== 'object') {
            if (a.length === 2) {
                return new XY(a[0], a[1]);
            }
            return null;
        }
        if (a === undefined || a === null) {
            return a;
        }
        if (typeof a === 'object' && 'x' in a) {
            return new XY(a.x, a.y);
        }
        if (b === undefined) {
            return null;
        }
        return new XY(a, b);
    }

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

    /* @class Error
     * @aka NOAA.Error
     *
     * Represents a API error response.
     * */
    var ApiError = /** @class */ (function () {
        function ApiError(data) {
            /*
            correlationId: "f8f32885-c8f4-48e6-82be-ef6975c63884"
            detail: "'/points/12' is not a valid resource path"
            instance: "https://api.weather.gov/requests/f8f32885-c8f4-48e6-82be-ef6975c63884"
            path: "/points/12"
            status: 404
            title: "Not Found"
            type: "https://api.weather.gov/problems/NotFound"
            */
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

    var Endpoint = /** @class */ (function () {
        function Endpoint(path) {
            this.path = path;
        }
        Endpoint.prototype.get = function (url, queryParameters) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (typeof url === "object") {
                                url = this.constructUrl(url, queryParameters);
                            }
                            return [4 /*yield*/, fetch(url, {
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
                        case 2: return [2 /*return*/, new (_a.apply(ApiError, [void 0, _b.sent()]))()];
                        case 3: return [4 /*yield*/, response.json()];
                        case 4: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        Endpoint.prototype.constructUrl = function (urlParameters, queryParameters) {
            var url = Endpoint.url;
            if (this.path[0] !== '/') {
                url += '/';
            }
            url += this.path;
            if (urlParameters && Array.isArray(urlParameters)) {
                var first_1 = (url.slice(-1) === '/');
                urlParameters.forEach(function (value) {
                    url += (first_1 ? '' : '/') + encodeURIComponent(value.toString());
                    first_1 = false;
                });
            }
            if (queryParameters && queryParameters instanceof Object) {
                var first_2 = true;
                url += '?';
                Object.keys(queryParameters).forEach(function (key) {
                    url += (first_2 ? '' : '&') + key + '=' + encodeURIComponent(queryParameters[key]);
                    first_2 = false;
                });
            }
            return url;
        };
        /** The API end point */
        Endpoint.url = 'https://api.weather.gov';
        return Endpoint;
    }());

    function toLatLon(lat, lon) {
        return { lat: lat, lon: lon };
    }

    var Geometry = /** @class */ (function () {
        function Geometry(data) {
            this.type = data['type'];
            switch (data['type']) {
                case 'Point':
                    this.latlon = toLatLon(data['coordinates'][1], data['coordinates'][0]);
                    break;
                case 'Polygon':
                    this.rings = this.getPolygonRings(data['coordinates']);
                    break;
                case 'MultiPolygon':
                    this.polygons = [];
                    for (var i = 0; i < data['coordinates'].length; i++) {
                        this.polygons.push(this.getPolygonRings(data['coordinates'][i]));
                    }
                    break;
                default:
                    throw new Error('Invalid geometry - (' + data['type'] + ') is not valid geometry');
            }
        }
        Geometry.prototype.getPolygonRings = function (coordinates) {
            var rings = [];
            for (var i = 0; i < coordinates.length; i++) {
                rings.push(this.convertCoordinates(coordinates[i]));
            }
            return rings;
        };
        /**
         *
         * @param {[]} latlons
         */
        Geometry.prototype.convertCoordinates = function (coordinates) {
            var result = [], i;
            for (i = 0; i < coordinates.length; i++) {
                result.push(toLatLon(coordinates[i][1], coordinates[i][0]));
            }
            return result;
        };
        return Geometry;
    }());
    function toGeometry(data) {
        return new Geometry(data);
    }

    /* @class Feature
     * @aka NOAA.Feature
     *
     * Represents base class for API GeoJSON responses.
     * */
    var Feature = /** @class */ (function () {
        function Feature(data) {
            if (data === undefined) {
                return;
            }
            if (data['type'] === undefined || data['type'] !== 'Feature') {
                throw new Error('Invalid data - Type property is missing or not "Feature"');
            }
            if (data['geometry'] && data['geometry']['type']) {
                if (data['geometry']['type'] === 'GeometryCollection') {
                    this.geometries = [];
                    for (var i = 0; i < data['geometry']['geometries'].length; i++) {
                        this.geometries.push(toGeometry(data['geometry']['geometries'][i]));
                    }
                }
                else {
                    this.geometry = toGeometry(data['geometry']);
                }
            }
            else {
                throw new Error('Invalid geometry data');
            }
        }
        return Feature;
    }());

    /**
     * Exctrats URL component
     * @param {String} url
     * @param {number} index
     */
    function getUrlPart(url, index) {
        if (!url) {
            return null;
        }
        var parts = url.split('/');
        if (index < 0) {
            return parts[parts.length + index];
        }
        return parts[index];
    }
    /**
     * Gets value from dictionary object
     * @param {string} key
     * @param {object} data
     * @param {boolean?} optional
     */
    function getValue(key, data, optional) {
        if (optional === void 0) { optional = false; }
        if (!optional && !(key in data)) {
            throw new Error('Invalid property name: ' + key);
        }
        return data[key];
    }
    /**
     * Gets feature property
     * @param {string} key
     * @param {object} data
     * @param {boolean?} optional
     */
    function getFeatureProperty(key, data, optional) {
        if (optional === void 0) { optional = false; }
        return getValue(key, data['properties'], optional);
    }

    /* @class Product
     * @aka NOAA.Product
     *
     * */
    var Product = /** @class */ (function () {
        function Product(data) {
            this.id = getValue('id', data);
            this.wmoCollectiveId = getValue('wmoCollectiveId', data);
            this.issuingOffice = getValue('issuingOffice', data);
            this.issuanceTime = toTime(getValue('issuanceTime', data));
            this.productCode = getValue('productCode', data);
            this.productName = getValue('productName', data);
            this.productText = getValue('productText', data, true);
        }
        Product.prototype.getProductText = function () {
            return toProducts().getProduct(this.id);
        };
        return Product;
    }());

    // returns date formatted as YYYYMMDD HH:mm in UTC
    function formatDate$1(date) {
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        return "".concat(year).concat(month.toString().padStart(2, "0")).concat(day.toString().padStart(2, "0"), " ").concat(hours.toString().padStart(2, "0"), ":").concat(minutes.toString().padStart(2, "0"));
    }

    /**
     * Validates API parameter
     * @param {string} name
     * @param {any} value
     * @param {object} validateOptions
     */
    function validateParameter(name, value, validateOptions) {
        if (Array.isArray(value)) {
            if (!validateOptions['allowArray']) {
                throw new Error(name + ' parameter does not allow array of values');
            }
            for (var i = 0; i < value.length; i++) {
                validateParameter(name, value[i], validateOptions);
            }
        }
        else {
            if (validateOptions['type']) {
                if (validateOptions['type'] === 'Date') {
                    if (!(value instanceof Date)) {
                        throw new Error('Invalid ' + name + ' parameter type. Expected ' + validateOptions['type'] + ', value: ' + value);
                    }
                }
                else if (validateOptions['type'] === 'LatLon') {
                    if (!('lat' in value && 'lon' in value)) {
                        throw new Error('Invalid ' + name + ' parameter type. Expected ' + validateOptions['type'] + ', value: ' + value);
                    }
                }
                else if (typeof value !== validateOptions['type']) {
                    throw new Error('Invalid ' + name + ' parameter type. Expected ' + validateOptions['type'] + ', value: ' + value);
                }
            }
            if (validateOptions['allowedValues'] !== undefined && !(value in validateOptions['allowedValues'])) {
                throw new Error('Invalid ' + name + ' parameter value does not match any allowed value; value: ' + value);
            }
        }
    }
    function toQueryParamValue(value) {
        if (value instanceof Date) {
            return formatDate$1(value);
        }
        if (Array.isArray(value)) {
            return value.join(',');
        }
        else {
            return value.toString();
        }
    }
    function toQueryParameters(params, parameterOptions) {
        var queryParams = {}, exclusiveParam;
        Object.keys(params).forEach(function (key) {
            if (!(key in parameterOptions)) {
                throw new Error('Invalid parameter (' + key + ')');
            }
            if (parameterOptions[key]['exclusive']) {
                if (exclusiveParam !== undefined) {
                    throw new Error(key + ' parameter cannot be used together with ' + exclusiveParam + ' parameter');
                }
                exclusiveParam = key;
            }
            if (parameterOptions[key]['type'] === 'LatLon') {
                params[key] = params[key];
            }
            validateParameter(key, params[key], parameterOptions[key]);
            if (parameterOptions[key]['query']) {
                queryParams[parameterOptions[key]['query']] = toQueryParamValue(params[key]);
            }
            else {
                queryParams[key] = toQueryParamValue(params[key]);
            }
        });
        return queryParams;
    }

    /* class Glossary implements /glossary interface
     * */
    var Products = /** @class */ (function (_super) {
        __extends(Products, _super);
        function Products() {
            return _super.call(this, '/products') || this;
        }
        /**
         * Returns a list of text products
         * @param {object} params
         */
        Products.prototype.get = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParams, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParams = {};
                            Object.keys(Products.parameters).forEach(function (key) {
                                if (key in params) {
                                    validateParameter(key, params[key], Products.parameters[key]);
                                    queryParams[key] = toQueryParamValue(params[key]);
                                }
                            });
                            return [4 /*yield*/, _super.prototype.get.call(this, queryParams)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, Products.toProductList(data['@graph'])];
                    }
                });
            });
        };
        /**
         * Returns a specific text product
         * @param {string} id
         */
        Products.prototype.getProduct = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [id])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Product(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of valid text product types and codes
         */
        Products.prototype.getTypes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, ['types'])];
                        case 1:
                            data = _a.sent();
                            // return dictionary when typeId not specified
                            return [2 /*return*/, Products.toProductDictionary(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of valid text product types for a given issuance location
         * @param {string} locationId
         */
        Products.prototype.getLocationTypes = function (locationId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!locationId) {
                                throw new Error('Missing required locationId parameter');
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, ['locations', locationId, 'types'])];
                        case 1:
                            data = _a.sent();
                            // return dictionary
                            return [2 /*return*/, Products.toProductDictionary(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of valid text product issuance locations
         */
        Products.prototype.getLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, ['locations'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data['locations']];
                    }
                });
            });
        };
        /**
         * Returns a list of valid text product issuance locations for a given product type
         * @param {string} typeId
         */
        Products.prototype.getTypeLocations = function (typeId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!typeId) {
                                throw new Error('Missing required typeId parameter');
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, ['types', typeId, 'locations'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data['locations']];
                    }
                });
            });
        };
        /**
         * Returns a list of text products of a given type
         * @param {string} typeId
         */
        Products.prototype.getTypeProducts = function (typeId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!typeId) {
                                throw new Error('Missing required typeId parameter');
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, ['types', typeId])];
                        case 1:
                            data = _a.sent();
                            // returns array
                            return [2 /*return*/, Products.toProductList(data['@graph'])];
                    }
                });
            });
        };
        /**
         * Returns a list of text products of a given type for a given issuance location
         * @param {string} typeId
         * @param {string} locationId
         */
        Products.prototype.getTypeAndLocationProducts = function (typeId, locationId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!typeId) {
                                throw new Error('Missing required typeId parameter');
                            }
                            if (!locationId) {
                                throw new Error('Missing required locationId parameter');
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, ['types', typeId, 'locations', locationId])];
                        case 1:
                            data = _a.sent();
                            // returns array
                            return [2 /*return*/, Products.toProductList(data['@graph'])];
                    }
                });
            });
        };
        Products.parameters = {
            'location': {
                'type': 'string',
                'allowArray': true
            },
            'start': {
                'type': 'Date',
                'allowArray': false
            },
            'end': {
                'type': 'Date',
                'allowArray': false
            },
            'office': {
                'type': 'string',
                'allowArray': true
            },
            'wmoid': {
                'type': 'string',
                'allowArray': true
            },
            'type': {
                'type': 'string',
                'allowArray': true
            },
            'limit': {
                'type': 'number',
                'allowArray': true
            }
        };
        Products.toProductList = function (data) {
            var products = [];
            data.forEach(function (product) {
                products.push(new Product(product));
            });
            // newest first
            products.sort(function (a, b) {
                if (a.issuanceTime.milliseconds == b.issuanceTime.milliseconds) {
                    return 0;
                }
                else if (a.issuanceTime.milliseconds > b.issuanceTime.milliseconds) {
                    return 1;
                }
                return -a;
            });
            return products;
        };
        Products.toProductDictionary = function (data) {
            var products = {};
            data['@graph'].forEach(function (product) {
                products[product['productCode']] = product['productName'];
            });
            return products;
        };
        return Products;
    }(Endpoint));
    // @factory NOAA.glossary(): Products
    // Creates a glossary term dictionary
    function toProducts() {
        return new Products();
    }

    /**
     *
     * @param {object} data
     * @param {function} callback
     */
    function featureCollectionToArray(data, callback) {
        var array = [];
        data['features'].forEach(function (feature, index) {
            array.push(callback(feature, index));
        });
        return array;
    }

    /* @class ValueUnit
     * @aka NOAA.ValueUnit
     *
     * Represents a class for value with units.
     * */
    var ValueUnits = /** @class */ (function () {
        function ValueUnits(value, units) {
            if (typeof value !== 'number') {
                throw new Error('Value must be a number');
            }
            this.value = value;
            this.unit = units;
        }
        ValueUnits.parseUnit = function (s) {
            return s.split(':')[1];
        };
        return ValueUnits;
    }());
    function toValueUnits(a, b) {
        if (typeof a === 'object') {
            if ('value' in a && 'unitCode' in a) {
                return new ValueUnits(a['value'], ValueUnits.parseUnit(a['unitCode']));
            }
            if ('value' in a && 'unit' in a) {
                return new ValueUnits(a['value'], ValueUnits.parseUnit(a['unit']));
            }
        }
        return new ValueUnits(a, b);
    }

    /* @class Observation
     * @aka NOAA.Observation
     *
     * */
    var Observation = /** @class */ (function (_super) {
        __extends(Observation, _super);
        function Observation(data) {
            var _this = _super.call(this, data) || this;
            _this.elevation = toValueUnits(getFeatureProperty('elevation', data));
            _this.stationId = getUrlPart(getFeatureProperty('station', data, true), -1);
            _this.timestamp = toTime(getFeatureProperty('timestamp', data));
            _this.rawMessage = getFeatureProperty('rawMessage', data);
            _this.textDescription = getFeatureProperty('textDescription', data);
            _this.iconUrl = getFeatureProperty('icon', data);
            _this.presentWeather = getFeatureProperty('presentWeather', data);
            _this.values = {};
            var values = [];
            Object.keys(data['properties']).forEach(function (key) {
                if (data['properties'][key] && data['properties'][key]['value'] && data['properties'][key]['unitCode']) {
                    values[key] = toValueUnits(data['properties'][key]);
                }
            });
            _this.values = values;
            var cloudLayers = data['properties']['cloudLayers'];
            if (cloudLayers) {
                _this.cloudLayers = [];
                for (var i = 0; i < cloudLayers.length; i++) {
                    _this.cloudLayers.push({
                        'base': (cloudLayers['value'] && cloudLayers['unitCode']) ? toValueUnits(cloudLayers['base']) : null,
                        'amount': cloudLayers['amount']
                    });
                }
            }
            return _this;
        }
        return Observation;
    }(Feature));
    function observationsToArray(data) {
        return featureCollectionToArray(data, function (feature) {
            return new Observation(feature);
        });
    }

    /* class Stations implements /stations interface
     * */
    var Stations = /** @class */ (function (_super) {
        __extends(Stations, _super);
        function Stations() {
            return _super.call(this, '/stations') || this;
        }
        /**
         * Returns a list of observation stations
         * @param {string|[string]} id
         * @param {string|[string]} state
         * @param {number} limit
         */
        Stations.prototype.getStations = function (id, state, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParameters, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParameters = {};
                            if (id) {
                                validateParameter('id', id, {
                                    'type': 'string',
                                    'allowArray': true
                                });
                                queryParameters['id'] = toQueryParamValue(id);
                            }
                            if (state) {
                                validateParameter('state', state, {
                                    'type': 'string',
                                    'allowArray': true,
                                    'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
                                });
                                queryParameters['state'] = toQueryParamValue(state);
                            }
                            if (limit != undefined) {
                                queryParameters['limit'] = limit;
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, queryParameters)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, stationsToArray(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of observation stations for an area
         * @param {string|[string]} area
         * @param {number?} limit
         */
        Stations.prototype.getAreaStations = function (area, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParameters, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParameters = {};
                            validateParameter('area', area, {
                                'type': 'string',
                                'allowArray': true,
                                'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
                            });
                            queryParameters['state'] = toQueryParamValue(area);
                            if (limit != undefined) {
                                queryParameters['limit'] = limit;
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, queryParameters)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, stationsToArray(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of radar stations
         * NOTE: returns 500
         * */
        Stations.prototype.getRadarStations = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var pathParameters, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pathParameters = ['radar'];
                            if (id !== undefined) {
                                pathParameters.push(id);
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, pathParameters)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        Stations.prototype.getStation = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [id])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Station(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of observations for a given station
         * @param {string} id
         * @param {Date?} start
         * @param {Date?} end
         * @param {number?} limit
         */
        Stations.prototype.getObservations = function (id_1) {
            return __awaiter(this, arguments, void 0, function (id, start, end, limit) {
                var queryParameters, data;
                if (start === void 0) { start = undefined; }
                if (end === void 0) { end = undefined; }
                if (limit === void 0) { limit = undefined; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParameters = {};
                            validateParameter('id', id, {
                                'type': 'string'
                            });
                            if (start) {
                                validateParameter('start', start, {
                                    'type': 'Date'
                                });
                                queryParameters['start'] = toQueryParamValue(start);
                            }
                            if (end) {
                                validateParameter('end', end, {
                                    'type': 'Date'
                                });
                                queryParameters['end'] = toQueryParamValue(end);
                            }
                            if (limit != undefined) {
                                queryParameters['limit'] = limit;
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, [id, 'observations'], queryParameters)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, observationsToArray(data).sort(function (a, b) {
                                    if (a.timestamp.milliseconds == b.timestamp.milliseconds) {
                                        return 0;
                                    }
                                    if (a.timestamp.milliseconds > b.timestamp.milliseconds) {
                                        return 1;
                                    }
                                    return -1;
                                })];
                    }
                });
            });
        };
        Stations.prototype.getLatestObservations = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validateParameter('id', id, {
                                'type': 'string'
                            });
                            return [4 /*yield*/, _super.prototype.get.call(this, [id, 'observations', 'latest'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Observation(data)];
                    }
                });
            });
        };
        Stations.prototype.getObservationsAtTime = function (id, time) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validateParameter('id', id, {
                                'type': 'string'
                            });
                            validateParameter('time', id, {
                                'type': 'Date'
                            });
                            return [4 /*yield*/, _super.prototype.get.call(this, [id, 'observations', time.toISOString()])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Observation(data)];
                    }
                });
            });
        };
        return Stations;
    }(Endpoint));
    /* @factory NOAA.stations(): Object
     *
     */
    function toStations() {
        return new Stations();
    }

    /* @class Station
     * @aka NOAA.Station
     *
     * */
    var Station = /** @class */ (function (_super) {
        __extends(Station, _super);
        function Station(data) {
            var _this = this;
            if (typeof data === 'string') {
                _this = _super.call(this, undefined) || this;
                _this.id = data;
            }
            else {
                _this = _super.call(this, data) || this;
                _this.elevation = toValueUnits(getFeatureProperty('elevation', data));
                _this.id = getFeatureProperty('stationIdentifier', data);
                _this.name = getFeatureProperty('name', data);
                _this.timeZone = getFeatureProperty('timeZone', data);
                _this.forecastZone = getUrlPart(getFeatureProperty('forecast', data, true), -1);
                _this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
                _this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
            }
            return _this;
        }
        Station.prototype.get = function () {
            return toStations().getStation(this.id);
        };
        Station.prototype.getObservations = function (start, end) {
            return toStations().getObservations(this.id, start, end);
        };
        Station.prototype.getLatestObservations = function () {
            return toStations().getLatestObservations(this.id);
        };
        Station.prototype.getObservationsAtTime = function (time) {
            return toStations().getObservationsAtTime(this.id, time);
        };
        return Station;
    }(Feature));
    function stationsToArray(data) {
        return featureCollectionToArray(data, function (feature) {
            return new Station(feature);
        });
    }

    var ZoneForecastPeriod = /** @class */ (function () {
        function ZoneForecastPeriod(data) {
            this.number = parseInt(getValue('number', data));
            this.name = getValue('name', data);
            this.detailedForecast = getValue('detailedForecast', data);
        }
        return ZoneForecastPeriod;
    }());

    /* @class ZoneForecast
     * @aka NOAA.ZoneForecast
     *
     * Represents response from /zones/{type}/{zoneId}/forecast endpoint.
     * */
    var ZoneForecast = /** @class */ (function () {
        function ZoneForecast(data) {
            this.updated = toTime(getValue('updated', data));
            this.periods = [];
            if (data['periods']) {
                for (var i = 0; i < data['periods'].length; i++) {
                    this.periods.push(new ZoneForecastPeriod(data['periods'][i]));
                }
            }
        }
        return ZoneForecast;
    }());

    /* class Zones implements /zones interface
     * */
    var Zones = /** @class */ (function (_super) {
        __extends(Zones, _super);
        function Zones() {
            return _super.call(this, '/zones') || this;
        }
        /**
         * Returns a list of zones
         * @param {object} params
         */
        Zones.prototype.get = function (params, includeGeometry) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParams, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (params) {
                                queryParams = toQueryParameters(params, Zones.parameterOptions);
                            }
                            else {
                                queryParams = {};
                            }
                            if (includeGeometry) {
                                validateParameter('includeGeometry', includeGeometry, {
                                    'type': 'boolean',
                                    'allowArray': false
                                });
                                queryParams['include_geometry'] = includeGeometry;
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, queryParams)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, zonesToArray(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of zones of a given type
         * @param {object} params
         */
        Zones.prototype.getTypeZones = function (type, params, includeGeometry) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParams, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (params) {
                                queryParams = toQueryParameters(params, Zones.parameterOptions);
                                if (params['type']) {
                                    throw new Error('type parameter is not allowed for this call');
                                }
                            }
                            else {
                                queryParams = {};
                            }
                            validateParameter('type', type, {
                                'type': 'string',
                                'allowedValues': Zones.Types
                            });
                            if (includeGeometry) {
                                validateParameter('includeGeometry', includeGeometry, {
                                    'type': 'boolean',
                                    'allowArray': false
                                });
                                queryParams['include_geometry'] = includeGeometry;
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, [type], queryParams)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, zonesToArray(data)];
                    }
                });
            });
        };
        /**
         * Returns metadata about a given zone
         * @param {string} type
         * @param {string} id
         */
        Zones.prototype.getZone = function (type, id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validateParameter('id', type, {
                                'type': 'string'
                            });
                            validateParameter('type', type, {
                                'type': 'string',
                                'allowedValues': Zones.Types
                            });
                            return [4 /*yield*/, _super.prototype.get.call(this, [type, id])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Zone(data)];
                    }
                });
            });
        };
        /**
         * Returns the current zone forecast for a given zone
         * @param {string} type
         * @param {string} id
         */
        Zones.prototype.getZoneForecast = function (type, id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validateParameter('id', type, {
                                'type': 'string'
                            });
                            validateParameter('type', type, {
                                'type': 'string',
                                'allowedValues': Zones.Types
                            });
                            return [4 /*yield*/, _super.prototype.get.call(this, [type, id, 'forecast'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new ZoneForecast(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of observations for a given zone
         * @param {string} type
         * @param {string} id
         * @param {Date?} start
         * @param {Date?} end
         * @param {number} limit
         */
        Zones.prototype.getZoneObservations = function (id, start, end, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParameters, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParameters = {};
                            validateParameter('id', id, {
                                'type': 'string'
                            });
                            if (start) {
                                validateParameter('start', start, {
                                    'type': 'Date'
                                });
                                queryParameters['start'] = toQueryParamValue(start);
                            }
                            if (end) {
                                validateParameter('end', end, {
                                    'type': 'Date'
                                });
                                queryParameters['end'] = toQueryParamValue(end);
                            }
                            if (limit) {
                                validateParameter('limit', limit, {
                                    'type': 'number'
                                });
                                queryParameters['limit'] = limit;
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, ['forecast', id, 'observations'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, observationsToArray(data)];
                    }
                });
            });
        };
        /**
         * Returns a list of observation stations for a given zone
         * @param {string} id
         */
        Zones.prototype.getZoneStations = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validateParameter('id', id, {
                                'type': 'string'
                            });
                            return [4 /*yield*/, _super.prototype.get.call(this, ['forecast', id, 'stations'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, stationsToArray(data)];
                    }
                });
            });
        };
        Zones.Types = {
            'land': 'land',
            'marine': 'marine',
            'forecast': 'forecast',
            'public': 'public',
            'coastal': 'coastal',
            'offshore': 'offshore',
            'fire': 'fire',
            'county': 'county'
        };
        Zones.parameterOptions = {
            'id': {
                'type': 'string',
                'allowArray': true,
            },
            'area': {
                'type': 'string',
                'allowArray': true,
                'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
            },
            'region': {
                'type': 'string',
                'allowArray': true,
                'allowedValues': RegionCodes
            },
            'type': {
                'type': 'string',
                'allowArray': true,
                'allowedValues': Zones.Types
            },
            'point': {
                'type': 'LatLon',
                'allowArray': false
            },
            'effective': {
                'type': 'Date',
                'allowArray': false
            }
        };
        return Zones;
    }(Endpoint));
    /* @factory NOAA.zones(): Object
     *
     */
    function toZones() {
        return new Zones();
    }

    /* @class Zone
     * @aka NOAA.Zone
     *
     * Represents response from /zones endpoint.
     * */
    var Zone = /** @class */ (function () {
        function Zone(data) {
            if (typeof data === 'string') {
                this.type = getUrlPart(data, -2);
                this.id = getUrlPart(data, -1);
            }
            else {
                var i = void 0;
                this.id = getFeatureProperty('id', data);
                this.type = getFeatureProperty('type', data);
                this.name = getFeatureProperty('name', data, true);
                this.state = getFeatureProperty('state', data, true);
                if (data['geometry']) {
                    this.geometry = toGeometry(data['geometry']);
                }
                this.forecastOffices = [];
                for (i = 0; data['properties']['forecastOffices'] && i < data['properties']['forecastOffices'].length; i++) {
                    this.forecastOffices.push(getUrlPart(data['properties']['forecastOffices'][i], -1));
                }
                this.timeZones = [];
                for (i = 0; data['properties']['timeZone'] && i < data['properties']['timeZone'].length; i++) {
                    this.timeZones.push(data['properties']['timeZone'][i]);
                }
            }
        }
        Zone.prototype.getZone = function () {
            return toZones().getZone(this.type, this.id);
        };
        Zone.prototype.getZoneForecast = function () {
            return toZones().getZoneForecast(this.type, this.id);
        };
        Zone.prototype.getZoneStations = function () {
            return toZones().getZoneStations(this.id);
        };
        Zone.prototype.getZoneObservations = function (start, end, limit) {
            return toZones().getZoneObservations(this.id, start, end, limit);
        };
        return Zone;
    }());
    function zonesToArray(data) {
        return featureCollectionToArray(data, function (feature) {
            return new Zone(feature);
        });
    }

    /* @class Office
     * @aka NOAA.Office
     *
     * */
    var Office = /** @class */ (function () {
        function Office(data) {
            if (typeof data === 'string') {
                this.id = data;
            }
            else {
                this.id = getValue('id', data);
                this.name = getValue('name', data);
                this.address = getValue('address', data);
                this.telephone = getValue('telephone', data);
                this.fax = getValue('faxNumber', data);
                this.email = getValue('email', data);
                this.url = getValue('sameAs', data);
                this.nwsRegion = getValue('nwsRegion', data);
                this.parentOrganization = getUrlPart(getValue('parentOrganization', data), -1);
                this.responsibleCounties = this.getZones('responsibleCounties', data);
                this.responsibleForecastZones = this.getZones('responsibleForecastZones', data);
                this.responsibleFireZones = this.getZones('responsibleFireZones', data);
                this.approvedObservationStations = this.getStations('approvedObservationStations', data);
            }
        }
        Office.prototype.getZones = function (key, data) {
            var list = [];
            if (data[key]) {
                for (var i = 0; i < data[key].length; i++) {
                    list.push(new Zone(data[key][i]));
                }
            }
            return list;
        };
        Office.prototype.getStations = function (key, data) {
            var list = [];
            if (data[key]) {
                for (var i = 0; i < data[key].length; i++) {
                    list.push(new Station(getUrlPart(data[key][i], -1)));
                }
            }
            return list;
        };
        Office.prototype.getAreaForecastDiscussion = function () {
            return toProducts().get({
                'location': this.id,
                'type': 'AFD'
            });
        };
        Office.prototype.getProductTypes = function () {
            return toProducts().getLocationTypes(this.id);
        };
        Office.prototype.getProducts = function (params) {
            params['location'] = this.id;
            return toProducts().get(params);
        };
        return Office;
    }());

    /* @class Point
     * @aka NOAA.Point
     *
     * Represents response from /points endpoint.
     * */
    var RelativeLocation = /** @class */ (function (_super) {
        __extends(RelativeLocation, _super);
        function RelativeLocation(data) {
            var _this = _super.call(this, data) || this;
            _this.city = getFeatureProperty('city', data);
            _this.state = getFeatureProperty('state', data);
            _this.distance = toValueUnits(getFeatureProperty('distance', data));
            _this.bearing = toValueUnits(getFeatureProperty('bearing', data));
            return _this;
        }
        return RelativeLocation;
    }(Feature));
    function toRelativeLocation(data) {
        if (!data) {
            return null;
        }
        return new RelativeLocation(data);
    }

    var millisecondsPerHour = 60 * 60 * 1000;
    var ValidTimePeriod = /** @class */ (function () {
        function ValidTimePeriod(s) {
            var parts = s.split('/');
            if (parts.length !== 2) {
                throw new Error('Invalid valid time value (' + s + ')');
            }
            this.time = toTime(parts[0]);
            this.hours = 0;
            this.days = 0;
            //period parsing
            var period = parts[1], num = 0;
            if (period[0] !== 'P') {
                throw new Error('Invalid valid time period value (' + parts[1] + ')');
            }
            for (var i = 1; i < period.length; i++) {
                if (period.charAt(i) >= '0' && period.charAt(i) <= '9') {
                    num = num * 10 + (period.charCodeAt(i) - '0'.charCodeAt(0));
                    continue;
                }
                if (period.charAt(i) === 'T') {
                    num = 0;
                    continue;
                }
                if (period.charAt(i) === 'D') {
                    this.days = num;
                    num = 0;
                    continue;
                }
                if (period.charAt(i) === 'H') {
                    this.hours = num;
                    num = 0;
                    continue;
                }
            }
            if (this.days === 0 && this.hours === 0) {
                throw new Error('Invalid valid time period (' + period + ')');
            }
            this.totalHours = this.days * 24 + this.hours;
        }
        ValidTimePeriod.prototype.toArray = function () {
            if (this._array) {
                return this._array;
            }
            this._array = [];
            for (var i = 0; i < this.totalHours; i++) {
                this._array.push(toTime(this.time.milliseconds + (i * millisecondsPerHour)));
            }
            return this._array;
        };
        return ValidTimePeriod;
    }());
    function toValidTimePeriod(a) {
        return new ValidTimePeriod(a);
    }

    /* @class GridPoint
     * @aka NOAA.GridPoint
     *
     * Represents response from /gridpoints endpoint.
     * */
    var GridPoint = /** @class */ (function (_super) {
        __extends(GridPoint, _super);
        function GridPoint(data) {
            var _this = _super.call(this, data) || this;
            _this.xy = toXY(getFeatureProperty('gridX', data), getFeatureProperty('gridY', data));
            _this.office = new Office(getFeatureProperty('gridId', data));
            _this.elevation = toValueUnits(getFeatureProperty('elevation', data));
            _this.updateTime = toTime(getFeatureProperty('updateTime', data));
            _this.validTimes = toValidTimePeriod(getFeatureProperty('validTimes', data));
            _this.values = {};
            for (var i = 0; i < GridPoint.variables.length; i++) {
                _this.values[GridPoint.variables[i]] = _this.getVariable(GridPoint.variables[i], data);
            }
            return _this;
        }
        GridPoint.prototype.getVariable = function (name, data) {
            var variableData = getFeatureProperty(name, data), units, values, item;
            if (variableData['uom']) {
                units = ValueUnits.parseUnit(variableData['uom']);
            }
            if (variableData['values'] && variableData['values'].length > 0) {
                values = [];
                if (variableData['sourceUnit']) {
                    values['sourceUnit'] = variableData['sourceUnit'];
                }
                for (var i = 0; i < variableData['values'].length; i++) {
                    //value can be null
                    if (variableData['values'][i]['value'] !== null) {
                        if (typeof variableData['values'][i]['value'] === 'number') {
                            item = toValueUnits(variableData['values'][i]['value'], units);
                        }
                        else {
                            item = variableData['values'][i]['value'];
                            if (Array.isArray(item)) {
                                item.forEach(function (v) {
                                    for (var key in v) {
                                        if (v[key] && v[key]['unit'] && v[key]['value']) {
                                            v[key] = toValueUnits(v[key]);
                                        }
                                    }
                                });
                            }
                        }
                        item['validTime'] = toValidTimePeriod(variableData['values'][i]['validTime']);
                        values.push(item);
                    }
                }
            }
            return values;
        };
        GridPoint.prototype.mapToValidTimes = function (variable) {
            var timeValueDict = {}, validTime, i, hour;
            if (this.values[variable] !== undefined && this.values[variable].length) {
                for (i = 0; i < this.values[variable].length; i++) {
                    validTime = this.values[variable][i].validTime;
                    for (hour = 0; hour < validTime.totalHours; hour++) {
                        timeValueDict[validTime.time.milliseconds + hour * millisecondsPerHour] = this.values[variable][i];
                    }
                }
                return this.validTimes.toArray().map(function (t) { return timeValueDict[t.milliseconds]; });
            }
        };
        return GridPoint;
    }(Feature));
    GridPoint.variables = [
        'temperature',
        'dewpoint',
        'maxTemperature',
        'minTemperature',
        'relativeHumidity',
        'apparentTemperature',
        'heatIndex',
        'windChill',
        'skyCover',
        'windDirection',
        'windSpeed',
        'windGust',
        'probabilityOfPrecipitation',
        'quantitativePrecipitation',
        'iceAccumulation',
        'snowfallAmount',
        'snowLevel',
        'ceilingHeight',
        'visibility',
        'transportWindSpeed',
        'transportWindDirection',
        'mixingHeight',
        'hainesIndex',
        'lightningActivityLevel',
        'twentyFootWindSpeed',
        'twentyFootWindDirection',
        'waveHeight',
        'wavePeriod',
        'waveDirection',
        'primarySwellHeight',
        'primarySwellDirection',
        'secondarySwellHeight',
        'secondarySwellDirection',
        'wavePeriod2',
        'windWaveHeight',
        'dispersionIndex',
        'pressure',
        'probabilityOfTropicalStormWinds',
        'probabilityOfHurricaneWinds',
        'potentialOf15mphWinds',
        'potentialOf25mphWinds',
        'potentialOf35mphWinds',
        'potentialOf45mphWinds',
        'potentialOf20mphWindGusts',
        'potentialOf30mphWindGusts',
        'potentialOf40mphWindGusts',
        'potentialOf50mphWindGusts',
        'potentialOf60mphWindGusts',
        'grasslandFireDangerIndex',
        'probabilityOfThunder',
        'davisStabilityIndex',
        'atmosphericDispersionIndex',
        'lowVisibilityOccurrenceRiskIndex',
        'stability',
        'redFlagThreatIndex',
        'weather',
        'hazards'
    ];

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
    var ForecastPeriod = /** @class */ (function () {
        function ForecastPeriod(data) {
            this.number = parseInt(getValue('number', data));
            this.name = getValue('name', data);
            this.startTime = toTime(getValue('startTime', data));
            this.endTime = toTime(getValue('endTime', data));
            this.isDaytime = getValue('isDaytime', data);
            this.temperature = toValueUnits(getValue('temperature', data), getValue('temperatureUnit', data));
            this.temperatureTrend = getValue('temperatureTrend', data);
            this.windSpeed = getValue('windSpeed', data);
            this.windDirection = getValue('windDirection', data);
            this.icon = getValue('icon', data);
            this.shortForecast = getValue('shortForecast', data);
            this.detailedForecast = getValue('detailedForecast', data);
        }
        return ForecastPeriod;
    }());

    /* @class Forecast
     * @aka NOAA.Forecast
     *
     * Represents response from /gridpoints/{wfo}/{x},{y}/forecast endpoint.
     * */
    var Forecast = /** @class */ (function (_super) {
        __extends(Forecast, _super);
        function Forecast(data) {
            var _this = _super.call(this, data) || this;
            _this.units = getFeatureProperty('units', data);
            _this.forecastGenerator = getFeatureProperty('forecastGenerator', data);
            _this.generatedAt = toTime(getFeatureProperty('generatedAt', data));
            _this.updateTime = toTime(getFeatureProperty('updateTime', data));
            _this.validTimes = toValidTimePeriod(getFeatureProperty('validTimes', data));
            _this.elevation = toValueUnits(getFeatureProperty('elevation', data));
            _this.periods = [];
            for (var i = 0; i < getFeatureProperty('periods', data).length; i++) {
                _this.periods.push(new ForecastPeriod(getFeatureProperty('periods', data)[i]));
            }
            return _this;
        }
        return Forecast;
    }(Feature));

    /* class GridPoints implements /gridpoints interface
     * */
    var GridPoints = /** @class */ (function (_super) {
        __extends(GridPoints, _super);
        /**
         *
         * @param {string} weatherForecastOffice
         * @param {XY} xy
         */
        function GridPoints(weatherForecastOffice, xy) {
            var _this = _super.call(this, '/gridpoints') || this;
            _this.weatherForecastOffice = weatherForecastOffice;
            _this.xy = xy;
            return _this;
        }
        GridPoints.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [this.weatherForecastOffice, this.xy])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new GridPoint(data)];
                    }
                });
            });
        };
        GridPoints.prototype.getForecast = function (units) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (units === undefined) {
                                units = 'us';
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, [this.weatherForecastOffice, this.xy, 'forecast'], { 'units': units })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Forecast(data)];
                    }
                });
            });
        };
        GridPoints.prototype.getForecastHourly = function (units) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (units === undefined) {
                                units = 'us';
                            }
                            return [4 /*yield*/, _super.prototype.get.call(this, [this.weatherForecastOffice, this.xy, 'forecast', 'hourly'], { 'units': units })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Forecast(data)];
                    }
                });
            });
        };
        GridPoints.prototype.getStations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [this.weatherForecastOffice, this.xy, 'stations'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, stationsToArray(data)];
                    }
                });
            });
        };
        return GridPoints;
    }(Endpoint));
    // @factory NOAA.gridPoints(weatherForecastOffice:string, x: number, y:number): GridPoints
    // Creates an object representing /gridpoints endpoint
    function toGridPoints(weatherForecastOffice, x, y) {
        return new GridPoints(weatherForecastOffice, toXY(x, y));
    }

    /* @class Alert
     * @aka NOAA.Alert
     *
     * Represents response from /points endpoint.
     * */
    var Alert = /** @class */ (function () {
        function Alert(data) {
            this.id = getFeatureProperty('id', data);
            this.areaDescription = getFeatureProperty('areaDesc', data);
            this.geocode = getFeatureProperty('geocode', data);
            this.affectedZones = [];
            var affectedZones = getFeatureProperty('affectedZones', data), i;
            for (i = 0; i < affectedZones.length; i++) {
                this.affectedZones.push(new Zone(affectedZones[i]));
            }
            this.references = getFeatureProperty('references', data);
            this.sent = toTime(getFeatureProperty('sent', data));
            this.effective = toTime(getFeatureProperty('effective', data));
            this.onset = toTime(getFeatureProperty('onset', data));
            this.expires = toTime(getFeatureProperty('expires', data));
            this.ends = toTime(getFeatureProperty('ends', data));
            this.status = getFeatureProperty('status', data);
            this.messageType = getFeatureProperty('messageType', data);
            this.category = getFeatureProperty('category', data);
            this.severity = getFeatureProperty('severity', data);
            this.certainty = getFeatureProperty('certainty', data);
            this.urgency = getFeatureProperty('urgency', data);
            this.event = getFeatureProperty('event', data);
            this.sender = getFeatureProperty('sender', data);
            this.senderName = getFeatureProperty('senderName', data);
            this.headline = getFeatureProperty('headline', data);
            this.description = getFeatureProperty('description', data);
            this.instruction = getFeatureProperty('instruction', data);
            this.response = getFeatureProperty('response', data);
            this.parameters = getFeatureProperty('parameters', data);
        }
        return Alert;
    }());

    /* @class AlertCollection
     * @aka NOAA.AlertCollection
     *
     * Represents response from /alerts endpoint.
     * */
    var AlertCollection = /** @class */ (function () {
        function AlertCollection(data) {
            this.title = data['title'];
            this.updated = toTime(data['updated']);
            this.alerts = [];
            if (data['features']) {
                for (var i = 0; i < data['features'].length; i++) {
                    this.alerts.push(new Alert(data['features'][i]));
                }
            }
            if (data['pagination']) {
                this.next = data['pagination']['next'];
                this.isComplete = false;
            }
            else {
                this.isComplete = true;
            }
        }
        AlertCollection.prototype.getNext = function () {
            return toAlerts().getNext(this.next);
        };
        return AlertCollection;
    }());

    /* class Alerts implements /alerts interface
     * */
    var Alerts = /** @class */ (function (_super) {
        __extends(Alerts, _super);
        function Alerts() {
            return _super.call(this, '/alerts') || this;
        }
        Alerts.prototype.get = function () {
            return __awaiter(this, arguments, void 0, function (params) {
                var data;
                if (params === void 0) { params = {}; }
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, toQueryParameters(params, Alerts.parameterOptions));
                    return [2 /*return*/, new AlertCollection(data)];
                });
            });
        };
        Alerts.prototype.getNext = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, url);
                    return [2 /*return*/, new AlertCollection(data)];
                });
            });
        };
        Alerts.prototype.getActive = function () {
            return __awaiter(this, arguments, void 0, function (params) {
                var data;
                if (params === void 0) { params = {}; }
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, ['active'], toQueryParameters(params, Alerts.parameterOptions));
                    return [2 /*return*/, new AlertCollection(data)];
                });
            });
        };
        Alerts.prototype.getTypes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, ['types']);
                    return [2 /*return*/, data['eventTypes']];
                });
            });
        };
        Alerts.prototype.getAlert = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, [id]);
                    return [2 /*return*/, new Alert(data)];
                });
            });
        };
        Alerts.prototype.getActiveCount = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, ['active', 'count']);
                    return [2 /*return*/, data];
                });
            });
        };
        Alerts.prototype.getZoneActive = function (zoneId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = _super.prototype.get.call(this, ['active', 'zone', zoneId]);
                    return [2 /*return*/, new AlertCollection(data)];
                });
            });
        };
        Alerts.prototype.getAreaActive = function (area) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    if (area in MarineAreaCodes || area in StateAreaCodes) {
                        data = _super.prototype.get.call(this, ['active', 'area', area]);
                        return [2 /*return*/, new AlertCollection(data)];
                    }
                    else {
                        throw new Error('Invalid area code (' + area + ')');
                    }
                });
            });
        };
        Alerts.prototype.getRegionActive = function (region) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    if (region in RegionCodes) {
                        data = _super.prototype.get.call(this, ['active', 'region', region]);
                        return [2 /*return*/, new AlertCollection(data)];
                    }
                    else {
                        throw new Error('Invalid region code (' + region + ')');
                    }
                });
            });
        };
        Alerts.Status = {
            'actual': 'actual',
            'exercise': 'exercise',
            'system': 'system',
            'test': 'test',
            'draft': 'draft'
        };
        Alerts.MessageType = {
            'alert': 'alert',
            'update': 'update',
            'cancel': 'cancel'
        };
        Alerts.RegionType = {
            'land': 'land',
            'marine': 'marine'
        };
        Alerts.Urgency = {
            'unknown': 'unknown',
            'past': 'past',
            'future': 'future',
            'expected': 'expected',
            'immediate': 'immediate'
        };
        Alerts.Severity = {
            'unknown': 'unknown',
            'minor': 'minor',
            'moderate': 'moderate',
            'severe': 'severe',
            'extreme': 'extreme'
        };
        Alerts.Certainty = {
            'unknown': 'unknown',
            'unlikely': 'unlikely',
            'possible': 'possible',
            'likely': 'likely',
            'observed': 'observed'
        };
        Alerts.parameterOptions = {
            'active': {
                'query': 'active',
                'type': 'boolean'
            },
            'start': {
                'query': 'start'
            },
            'end': {
                'query': 'end'
            },
            'status': {
                'query': 'status',
                'allowArray': true,
                'type': 'string',
                'allowedValues': Alerts.Status
            },
            'messageType': {
                'query': 'message_type',
                'allowArray': true,
                'type': 'string'
            },
            'event': {
                'query': 'event',
                'allowArray': true,
                'type': 'string',
                'allowedValues': Alerts.MessageType
            },
            'code': {
                'query': 'code',
                'allowArray': true,
                'type': 'string'
            },
            'regionType': {
                'query': 'region_type',
                'allowArray': false,
                'type': 'string',
                'exclusive': true,
                'allowedValues': Alerts.RegionType
            },
            'point': {
                'type': 'LatLon',
                'query': 'point',
                'exclusive': true
            },
            'region': {
                'query': 'region',
                'allowArray': true,
                'type': 'string',
                'exclusive': true,
                'allowedValues': RegionCodes
            },
            'area': {
                'query': 'area',
                'allowArray': true,
                'type': 'string',
                'exclusive': true,
                'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
            },
            'zone': {
                'query': 'zone',
                'allowArray': true,
                'type': 'string',
                'exclusive': true
            },
            'urgency': {
                'query': 'urgency',
                'allowArray': true,
                'type': 'string',
                'allowedValues': Alerts.Urgency
            },
            'severity': {
                'query': 'severity',
                'allowArray': true,
                'type': 'string',
                'allowedValues': Alerts.Severity
            },
            'certainty': {
                'query': 'certainty',
                'allowArray': true,
                'type': 'string',
                'allowedValues': Alerts.Certainty
            },
            'limit': {
                'query': 'limit',
                'type': 'number'
            },
            'cursor': {
                'query': 'cursor',
                'type': 'string'
            }
        };
        return Alerts;
    }(Endpoint));
    /* @factory NOAA.alerts(): Object
     *
     */
    function toAlerts() {
        return new Alerts();
    }

    /* @class Point
     * @aka NOAA.Point
     *
     * Represents response from /points endpoint.
     * */
    var Point = /** @class */ (function (_super) {
        __extends(Point, _super);
        function Point(data) {
            var _this = _super.call(this, data) || this;
            _this.xy = toXY(getFeatureProperty('gridX', data), getFeatureProperty('gridY', data));
            _this.office = new Office(getFeatureProperty('cwa', data));
            _this.forecastZone = getUrlPart(getFeatureProperty('forecastZone', data), -1);
            _this.timeZone = getFeatureProperty('timeZone', data);
            _this.radarStation = getFeatureProperty('radarStation', data);
            _this.relativeLocation = toRelativeLocation(getFeatureProperty('relativeLocation', data));
            // optional properties
            _this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
            _this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
            return _this;
        }
        Point.prototype.getAlerts = function () {
            return __awaiter(this, arguments, void 0, function (params) {
                if (params === void 0) { params = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params['point'] = this.geometry.latlon;
                            return [4 /*yield*/, toAlerts().get(params)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Point.prototype.getGridPoint = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, toGridPoints(this.office.id, this.xy).get()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Point.prototype.getGridPointForecast = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, toGridPoints(this.office.id, this.xy).getForecast()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Point.prototype.getGridPointForecastHourly = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, toGridPoints(this.office.id, this.xy).getForecastHourly()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Point.prototype.getGridPointStations = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, toGridPoints(this.office.id, this.xy).getStations()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return Point;
    }(Feature));

    /* class Points implements /points interface
     * */
    var Points = /** @class */ (function (_super) {
        __extends(Points, _super);
        /**
         *
         * @param {LatLon} latlon
         */
        function Points(latlon) {
            var _this = _super.call(this, '/points') || this;
            _this.latlon = latlon;
            return _this;
        }
        Points.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [this.latlon])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Point(data)];
                    }
                });
            });
        };
        Points.prototype.getStations = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [this.latlon, 'stations'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, stationsToArray(data)];
                    }
                });
            });
        };
        return Points;
    }(Endpoint));
    // @factory NOAA.points(latlon: LatLon): Points
    // Creates an object representing /points endpoint
    // @alternative
    // @factory NOAA.points(coords: Array): Points
    // @alternative
    // @factory NOAA.points(coords: Object): Points
    function toPoints(a) {
        return new Points(a);
    }

    /* class Glossary implements /glossary interface
     * */
    var Glossary = /** @class */ (function (_super) {
        __extends(Glossary, _super);
        function Glossary() {
            return _super.call(this, '/glossary') || this;
        }
        Glossary.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, terms;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this)];
                        case 1:
                            data = _a.sent();
                            terms = {};
                            data['glossary'].forEach(function (term) {
                                terms[term['term']] = term['definition'];
                            });
                            return [2 /*return*/, terms];
                    }
                });
            });
        };
        return Glossary;
    }(Endpoint));
    // @factory NOAA.glossary(): Object
    // Creates a glossary term dictionary
    function toGlossary() {
        return new Glossary();
    }

    /* class Glossary implements /glossary interface
     * */
    var Icons = /** @class */ (function (_super) {
        __extends(Icons, _super);
        function Icons() {
            return _super.call(this, '/icons') || this;
        }
        Icons.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data['icons']];
                    }
                });
            });
        };
        return Icons;
    }(Endpoint));
    // @factory NOAA.glossary(): Object
    // Creates a glossary term dictionary
    function toIcons() {
        return new Icons();
    }

    /* class Offices implements /alerts interface
     * */
    var Offices = /** @class */ (function (_super) {
        __extends(Offices, _super);
        function Offices(officeId) {
            var _this = _super.call(this, '/offices') || this;
            _this.officeId = officeId;
            return _this;
        }
        Offices.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [this.officeId])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, new Office(data)];
                    }
                });
            });
        };
        Offices.prototype.getHeadlines = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.get.call(this, [this.officeId, 'headlines'])];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        return Offices;
    }(Endpoint));
    /* @factory NOAA.offices(): Object
     *
     */
    function toOffices(officeId) {
        return new Offices(officeId);
    }

    var Weather = {
        Points: Points,
        points: toPoints,
        Glossary: Glossary,
        glossary: toGlossary,
        Icons: Icons,
        icons: toIcons,
        Products: Products,
        products: toProducts,
        Alerts: Alerts,
        alerts: toAlerts,
        Offices: Offices,
        offices: toOffices,
        Stations: Stations,
        stations: toStations,
        Zones: Zones,
        zones: toZones,
        Point: Point,
        GridPoint: GridPoint,
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
    // Example =  units=english
    var Units;
    (function (Units) {
        Units["metric"] = "metric";
        Units["english"] = "english";
    })(Units || (Units = {}));
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
        return toTime(s.replace(' ', 'T') + ':00+00:00');
    }
    function parseFloatValue(value, units) {
        return toValueUnits(parseFloat(value), units);
    }

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
                    'value': parseFloatValue(d['v'], 'm')
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
                    'value': parseFloatValue(d['v'], 'm'),
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
    exports.Time = Time;
    exports.Weather = Weather;
    exports.XY = XY;
    exports.time = toTime;
    exports.xy = toXY;

}));
//# sourceMappingURL=noaa.js.map
