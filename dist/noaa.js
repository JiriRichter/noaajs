(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NOAA = {}));
})(this, (function (exports) { 'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }
  function _superPropGet(t, o, e, r) {
    var p = _get(_getPrototypeOf(t.prototype ), o, e);
    return 2 & r && "function" == typeof p ? function (t) {
      return p.apply(e, t);
    } : p;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  /* @class LatLon
   * @aka NOAA.LatLon
   *
   * Represents a geographical point with a certain latitude and longitude.
   *
   * @example
   *
   * ```
   * let latlon = NOAA.latLon(50.5, 30.5);
   * ```
   */
  var LatLon = /*#__PURE__*/function () {
    function LatLon(lat, lon) {
      _classCallCheck(this, LatLon);
      if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Invalid LatLon object: (' + lat + ', ' + lon + ')');
      }

      // @property lat: Number
      // Latitude in degrees
      this.lat = +lat;

      // @property lng: Number
      // Longitude in degrees
      this.lon = +lon;
    }
    return _createClass(LatLon, [{
      key: "toString",
      value: function toString() {
        return "".concat(this.lat, ",").concat(this.lon);
      }
    }]);
  }();

  // @factory NOAA.latLon(latitude: Number, longitude: Number, altitude?: Number): LatLon
  // Creates an object representing a geographical point with the given latitude and longitude.

  // @alternative
  // @factory NOAA.latLon(coords: Array): LatLon
  // Expects an array of the form `[Number, Number]` instead.

  // @alternative
  // @factory NOAA.latLon(coords: Object): LatLon
  // Expects an plain object of the form `{lat: Number, lon: Number}` or `{lat: Number, lon: Number}` instead.
  function toLatLon(a, b) {
    if (a instanceof LatLon) {
      return a;
    }
    if (Array.isArray(a) && _typeof(a[0]) !== 'object') {
      if (a.length === 2) {
        return new LatLon(a[0], a[1]);
      }
      return null;
    }
    if (a === undefined || a === null) {
      return a;
    }
    if (_typeof(a) === 'object' && 'lat' in a) {
      return new LatLon(a.lat, 'lng' in a ? a.lng : a.lon);
    }
    if (b === undefined) {
      return null;
    }
    return new LatLon(a, b);
  }

  var Time = /*#__PURE__*/function () {
    function Time(t) {
      _classCallCheck(this, Time);
      if (t instanceof Date) {
        this.milliseconds = t.getTime();
      } else if (typeof t === 'string') {
        this.milliseconds = Date.parse(t);
      } else if (typeof t === 'number') {
        this.milliseconds = t;
      } else {
        throw new Error('Invalid time argument (' + t + ')');
      }
    }
    return _createClass(Time, [{
      key: "toString",
      value: function toString() {
        return this.toDate().toISOString();
      }
    }, {
      key: "toDate",
      value: function toDate() {
        return new Date(this.milliseconds);
      }
    }]);
  }();
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
  var XY = /*#__PURE__*/function () {
    function XY(x, y) {
      _classCallCheck(this, XY);
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
    return _createClass(XY, [{
      key: "toString",
      value: function toString() {
        return "".concat(this.x, ",").concat(this.y);
      }
    }]);
  }();

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
    if (Array.isArray(a) && _typeof(a[0]) !== 'object') {
      if (a.length === 2) {
        return new XY(a[0], a[1]);
      }
      return null;
    }
    if (a === undefined || a === null) {
      return a;
    }
    if (_typeof(a) === 'object' && 'x' in a) {
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

  /* @class Error
   * @aka NOAA.Error
   *
   * Represents a API error response.
   * */
  var ApiError = /*#__PURE__*/_createClass(function ApiError(data) {
    _classCallCheck(this, ApiError);
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
  });

  var Endpoint = /*#__PURE__*/function () {
    function Endpoint(path, format) {
      _classCallCheck(this, Endpoint);
      this.path = path;
      this.format = format;
    }
    return _createClass(Endpoint, [{
      key: "get",
      value: function get() {
        var _this = this;
        var urlParameters, queryParameters, parser, url;
        for (var i = 0; i < arguments.length; i++) {
          if (Array.isArray(arguments[i])) {
            urlParameters = arguments[i];
          } else if (typeof arguments[i] === 'function') {
            parser = arguments[i];
          } else if (typeof arguments[i] === 'string') {
            url = arguments[i];
          } else if (arguments[i] instanceof Object) {
            queryParameters = arguments[i];
          }
        }
        if (parser === undefined) {
          parser = this.parseResponse;
        }
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          if (url === undefined) {
            url = _this.constructUrl(urlParameters, queryParameters);
          }
          xhr.open('GET', url);
          if (_this.format) {
            xhr.setRequestHeader('Accept', Endpoint.formats[_this.format]);
          } else {
            xhr.setRequestHeader('Accept', Endpoint.formats['GeoJSON']);
          }
          xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(parser(JSON.parse(xhr.response)));
            } else {
              reject(new ApiError(JSON.parse(xhr.response)));
            }
          };
          xhr.onerror = function () {
            reject(xhr);
          };
          xhr.send();
        });
      }
    }, {
      key: "parseResponse",
      value: function parseResponse(data) {
        return data;
      }
    }, {
      key: "constructUrl",
      value: function constructUrl(urlParameters, queryParameters) {
        var url = Endpoint.url;
        if (this.path[0] !== '/') {
          url += '/';
        }
        url += this.path;
        if (urlParameters && Array.isArray(urlParameters)) {
          var first = url.slice(-1) === '/';
          urlParameters.forEach(function (value) {
            url += (first ? '' : '/') + encodeURIComponent(value.toString());
            first = false;
          });
        }
        if (queryParameters && queryParameters instanceof Object) {
          var _first = true;
          url += '?';
          Object.keys(queryParameters).forEach(function (key) {
            url += (_first ? '' : '&') + key + '=' + encodeURIComponent(queryParameters[key]);
            _first = false;
          });
        }
        return url;
      }
    }]);
  }();
  /** The API end point */
  Endpoint.url = 'https://api.weather.gov';

  /** Endpoints typically have a GeoJSON default format, given the inclusion of geometry data. 
   * Additional formats may be requested using the request header. See the Specification tab for details on each endpoint. 
   * Below are common formats available by the API. */
  Endpoint.formats = {
    'GeoJSON': 'application/geo+json',
    'JSON- LD': 'application/ld+json',
    'DWML': 'application/vnd.noaa.dwml+xml',
    'OXML': 'application/vnd.noaa.obs+xml',
    'CAP': 'application/cap+xml',
    'ATOM': 'application/atom+xml'
  };

  var Geometry = /*#__PURE__*/function () {
    function Geometry(data) {
      _classCallCheck(this, Geometry);
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
    return _createClass(Geometry, [{
      key: "getPolygonRings",
      value: function getPolygonRings(coordinates) {
        var rings = [];
        for (var i = 0; i < coordinates.length; i++) {
          rings.push(this.convertCoordinates(coordinates[i]));
        }
        return rings;
      }

      /**
       * 
       * @param {[]} latlons
       */
    }, {
      key: "convertCoordinates",
      value: function convertCoordinates(coordinates) {
        var result = [],
          i;
        for (i = 0; i < coordinates.length; i++) {
          result.push(toLatLon(coordinates[i][1], coordinates[i][0]));
        }
        return result;
      }
    }]);
  }();
  function toGeometry(data) {
    return new Geometry(data);
  }

  /* @class Feature
   * @aka NOAA.Feature
   *
   * Represents base class for API GeoJSON responses.
   * */
  var Feature = /*#__PURE__*/_createClass(function Feature(data) {
    _classCallCheck(this, Feature);
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
      } else {
        this.geometry = toGeometry(data['geometry']);
      }
    } else {
      throw new Error('Invalid geometry data');
    }
  });

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
  function getValue(key, data) {
    var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
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
  function getFeatureProperty(key, data) {
    var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return getValue(key, data['properties'], optional);
  }

  /* @class Product
   * @aka NOAA.Product
   *
   * */
  var Product = /*#__PURE__*/function () {
    function Product(data) {
      _classCallCheck(this, Product);
      this.id = getValue('id', data);
      this.wmoCollectiveId = getValue('wmoCollectiveId', data);
      this.issuingOffice = getValue('issuingOffice', data);
      this.issuanceTime = toTime(getValue('issuanceTime', data));
      this.productCode = getValue('productCode', data);
      this.productName = getValue('productName', data);
      this.productText = getValue('productText', data, true);
    }
    return _createClass(Product, [{
      key: "getProductText",
      value: function getProductText() {
        return toProducts().getProduct(this.id);
      }
    }]);
  }();

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
    } else {
      if (validateOptions['type']) {
        if (validateOptions['type'] === 'Date') {
          if (!(value instanceof Date)) {
            throw new Error('Invalid ' + name + ' parameter type. Expected ' + validateOptions['type'] + ', value: ' + value);
          }
        } else if (validateOptions['type'] === 'LatLon') {
          if (!(value instanceof LatLon)) {
            throw new Error('Invalid ' + name + ' parameter type. Expected ' + validateOptions['type'] + ', value: ' + value);
          }
        } else if (_typeof(value) !== validateOptions['type']) {
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
    } else {
      return value.toString();
    }
  }
  function toQueryParameters(params, parameterOptions) {
    var queryParams = {},
      exclusiveParam;
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
        params[key] = toLatLon(params[key]);
      }
      validateParameter(key, params[key], parameterOptions[key]);
      if (parameterOptions[key]['query']) {
        queryParams[parameterOptions[key]['query']] = toQueryParamValue(params[key]);
      } else {
        queryParams[key] = toQueryParamValue(params[key]);
      }
    });
    return queryParams;
  }

  /* class Glossary implements /glossary interface
   * */
  var Products = /*#__PURE__*/function (_Endpoint) {
    function Products() {
      _classCallCheck(this, Products);
      return _callSuper(this, Products, ['/products']);
    }

    /**
     * Returns a list of text products
     * @param {object} params
     */
    _inherits(Products, _Endpoint);
    return _createClass(Products, [{
      key: "get",
      value: function get(params) {
        var queryParams = {};
        Object.keys(Products.parameters).forEach(function (key) {
          if (key in params) {
            validateParameter(key, params[key], Products.parameters[key]);
            queryParams[key] = toQueryParamValue(params[key]);
          }
        });
        return _superPropGet(Products, "get", this, 3)([queryParams, function (data) {
          return Products.toProductList(data['@graph']);
        }]);
      }

      /**
       * Returns a specific text product
       * @param {string} id
       */
    }, {
      key: "getProduct",
      value: function getProduct(id) {
        return _superPropGet(Products, "get", this, 3)([[id], function (data) {
          return new Product(data);
        }]);
      }

      /**
       * Returns a list of valid text product types and codes
       */
    }, {
      key: "getTypes",
      value: function getTypes() {
        return _superPropGet(Products, "get", this, 3)([['types'], function (data) {
          // return dictionary when typeId not specified
          return Products.toProductDictionary(data);
        }]);
      }

      /**
       * Returns a list of valid text product types for a given issuance location
       * @param {string} locationId
       */
    }, {
      key: "getLocationTypes",
      value: function getLocationTypes(locationId) {
        if (!locationId) {
          throw new Error('Missing required locationId parameter');
        }
        return _superPropGet(Products, "get", this, 3)([['locations', locationId, 'types'], function (data) {
          // return dictionary
          return Products.toProductDictionary(data);
        }]);
      }

      /**
       * Returns a list of valid text product issuance locations
       */
    }, {
      key: "getLocations",
      value: function getLocations() {
        return _superPropGet(Products, "get", this, 3)([['locations'], function (data) {
          return data['locations'];
        }]);
      }

      /**
       * Returns a list of valid text product issuance locations for a given product type
       * @param {string} typeId
       */
    }, {
      key: "getTypeLocations",
      value: function getTypeLocations(typeId) {
        if (!typeId) {
          throw new Error('Missing required typeId parameter');
        }
        return _superPropGet(Products, "get", this, 3)([['types', typeId, 'locations'], function (data) {
          return data['locations'];
        }]);
      }

      /**
       * Returns a list of text products of a given type
       * @param {string} typeId
       */
    }, {
      key: "getTypeProducts",
      value: function getTypeProducts(typeId) {
        if (!typeId) {
          throw new Error('Missing required typeId parameter');
        }
        return _superPropGet(Products, "get", this, 3)([['types', typeId], function (data) {
          // returns array
          return Products.toProductList(data['@graph']);
        }]);
      }

      /**
       * Returns a list of text products of a given type for a given issuance location
       * @param {string} typeId
       * @param {string} locationId
       */
    }, {
      key: "getTypeAndLocationProducts",
      value: function getTypeAndLocationProducts(typeId, locationId) {
        if (!typeId) {
          throw new Error('Missing required typeId parameter');
        }
        if (!locationId) {
          throw new Error('Missing required locationId parameter');
        }
        return _superPropGet(Products, "get", this, 3)([['types', typeId, 'locations', locationId], function (data) {
          // returns array
          return Products.toProductList(data['@graph']);
        }]);
      }
    }]);
  }(Endpoint);
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
  Products.toProductDictionary = function (data) {
    var products = {};
    data['@graph'].forEach(function (product) {
      products[product['productCode']] = product['productName'];
    });
    return products;
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
      } else if (a.issuanceTime.milliseconds > b.issuanceTime.milliseconds) {
        return 1;
      }
      return -a;
    });
    return products;
  };

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
  var ValueUnits = /*#__PURE__*/_createClass(function ValueUnits(value, units) {
    _classCallCheck(this, ValueUnits);
    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    }
    this.value = value;
    this.unit = units;
  });
  ValueUnits.parseUnit = function (s) {
    return s.split(':')[1];
  };
  function toValueUnits(a, b) {
    if (_typeof(a) === 'object') {
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
  var Observation = /*#__PURE__*/function (_Feature) {
    function Observation(data) {
      var _this;
      _classCallCheck(this, Observation);
      _this = _callSuper(this, Observation, [data]);
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
            'base': cloudLayers['value'] && cloudLayers['unitCode'] ? toValueUnits(cloudLayers['base']) : null,
            'amount': cloudLayers['amount']
          });
        }
      }
      return _this;
    }
    _inherits(Observation, _Feature);
    return _createClass(Observation);
  }(Feature);
  function observationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
      return new Observation(feature);
    });
  }

  /* class Stations implements /stations interface
   * */
  var Stations = /*#__PURE__*/function (_Endpoint) {
    function Stations() {
      _classCallCheck(this, Stations);
      return _callSuper(this, Stations, ['/stations']);
    }

    /**
     * Returns a list of observation stations
     * @param {string|[string]} id
     * @param {string|[string]} state
     * @param {number} limit
     */
    _inherits(Stations, _Endpoint);
    return _createClass(Stations, [{
      key: "getStations",
      value: function getStations(id, state, limit) {
        var queryParameters = {};
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
        return _superPropGet(Stations, "get", this, 3)([queryParameters, function (data) {
          return stationsToArray(data);
        }]);
      }

      /**
       * Returns a list of observation stations for an area
       * @param {string|[string]} area
       * @param {number?} limit
       */
    }, {
      key: "getAreaStations",
      value: function getAreaStations(area, limit) {
        var queryParameters = {};
        validateParameter('area', area, {
          'type': 'string',
          'allowArray': true,
          'allowedValues': Object.assign({}, StateAreaCodes, MarineAreaCodes)
        });
        queryParameters['state'] = toQueryParamValue(area);
        if (limit != undefined) {
          queryParameters['limit'] = limit;
        }
        return _superPropGet(Stations, "get", this, 3)([queryParameters, function (data) {
          return stationsToArray(data);
        }]);
      }

      /**
       * Returns a list of radar stations
       * NOTE: returns 500
       * */
    }, {
      key: "getRadarStations",
      value: function getRadarStations(id) {
        var pathParameters = ['radar'];
        if (id !== undefined) {
          pathParameters.push(id);
        }
        return _superPropGet(Stations, "get", this, 3)([pathParameters, function (data) {
          return data;
        }]);
      }
    }, {
      key: "getStation",
      value: function getStation(id) {
        return _superPropGet(Stations, "get", this, 3)([[id], function (data) {
          return new Station(data);
        }]);
      }

      /**
       * Returns a list of observations for a given station
       * @param {string} id
       * @param {Date?} start
       * @param {Date?} end
       * @param {number?} limit
       */
    }, {
      key: "getObservations",
      value: function getObservations(id) {
        var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
        var queryParameters = {};
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
        return _superPropGet(Stations, "get", this, 3)([[id, 'observations'], queryParameters, function (data) {
          return observationsToArray(data).sort(function (a, b) {
            if (a.timestamp.milliseconds == b.timestamp.milliseconds) {
              return 0;
            }
            if (a.timestamp.milliseconds > b.timestamp.milliseconds) {
              return 1;
            }
            return -1;
          });
        }]);
      }
    }, {
      key: "getLatestObservations",
      value: function getLatestObservations(id) {
        validateParameter('id', id, {
          'type': 'string'
        });
        return _superPropGet(Stations, "get", this, 3)([[id, 'observations', 'latest'], function (data) {
          return new Observation(data);
        }]);
      }
    }, {
      key: "getObservationsAtTime",
      value: function getObservationsAtTime(id, time) {
        validateParameter('id', id, {
          'type': 'string'
        });
        validateParameter('time', id, {
          'type': 'Date'
        });
        return _superPropGet(Stations, "get", this, 3)([[id, 'observations', time.toISOString()], function (data) {
          return new Observation(data);
        }]);
      }
    }]);
  }(Endpoint);

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
  var Station = /*#__PURE__*/function (_Feature) {
    function Station(data) {
      var _this;
      _classCallCheck(this, Station);
      if (typeof data === 'string') {
        _this = _callSuper(this, Station, [undefined]);
        _this.id = data;
      } else {
        _this = _callSuper(this, Station, [data]);
        _this.elevation = toValueUnits(getFeatureProperty('elevation', data));
        _this.id = getFeatureProperty('stationIdentifier', data);
        _this.name = getFeatureProperty('name', data);
        _this.timeZone = getFeatureProperty('timeZone', data);
        _this.forecastZone = getUrlPart(getFeatureProperty('forecast', data, true), -1);
        _this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
        _this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
      }
      return _assertThisInitialized(_this);
    }
    _inherits(Station, _Feature);
    return _createClass(Station, [{
      key: "get",
      value: function get() {
        return toStations().getStation(this.id);
      }
    }, {
      key: "getObservations",
      value: function getObservations(start, end) {
        return toStations().getObservations(this.id, start, end);
      }
    }, {
      key: "getLatestObservations",
      value: function getLatestObservations() {
        return toStations().getLatestObservations(this.id);
      }
    }, {
      key: "getObservationsAtTime",
      value: function getObservationsAtTime(time) {
        return toStations.getObservationsAtTime(this.id, time);
      }
    }]);
  }(Feature);
  function stationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
      return new Station(feature);
    });
  }

  var ZoneForecastPeriod = /*#__PURE__*/_createClass(function ZoneForecastPeriod(data) {
    _classCallCheck(this, ZoneForecastPeriod);
    this.number = parseInt(getValue('number', data));
    this.name = getValue('name', data);
    this.detailedForecast = getValue('detailedForecast', data);
  });

  /* @class ZoneForecast
   * @aka NOAA.ZoneForecast
   *
   * Represents response from /zones/{type}/{zoneId}/forecast endpoint.
   * */
  var ZoneForecast = /*#__PURE__*/_createClass(function ZoneForecast(data) {
    _classCallCheck(this, ZoneForecast);
    this.updated = toTime(getValue('updated', data));
    this.periods = [];
    if (data['periods']) {
      for (var i = 0; i < data['periods'].length; i++) {
        this.periods.push(new ZoneForecastPeriod(data['periods'][i]));
      }
    }
  });

  /* class Zones implements /zones interface
   * */
  var Zones = /*#__PURE__*/function (_Endpoint) {
    function Zones() {
      _classCallCheck(this, Zones);
      return _callSuper(this, Zones, ['/zones']);
    }

    /**
     * Returns a list of zones
     * @param {object} params
     */
    _inherits(Zones, _Endpoint);
    return _createClass(Zones, [{
      key: "get",
      value: function get(params, includeGeometry) {
        var queryParams;
        if (params) {
          queryParams = toQueryParameters(params, Zones.parameterOptions);
        } else {
          queryParams = {};
        }
        if (includeGeometry) {
          validateParameter('includeGeometry', includeGeometry, {
            'type': 'boolean',
            'allowArray': false
          });
          queryParams['include_geometry'] = includeGeometry;
        }
        return _superPropGet(Zones, "get", this, 3)([queryParams, function (data) {
          return zonesToArray(data);
        }]);
      }

      /**
       * Returns a list of zones of a given type
       * @param {object} params
       */
    }, {
      key: "getTypeZones",
      value: function getTypeZones(type, params, includeGeometry) {
        var queryParams;
        if (params) {
          queryParams = toQueryParameters(params, Zones.parameterOptions);
          if (params['type']) {
            throw new Error('type parameter is not allowed for this call');
          }
        } else {
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
        return _superPropGet(Zones, "get", this, 3)([[type], queryParams, function (data) {
          return zonesToArray(data);
        }]);
      }

      /**
       * Returns metadata about a given zone
       * @param {string} type
       * @param {string} id
       */
    }, {
      key: "getZone",
      value: function getZone(type, id) {
        validateParameter('id', type, {
          'type': 'string'
        });
        validateParameter('type', type, {
          'type': 'string',
          'allowedValues': Zones.Types
        });
        return _superPropGet(Zones, "get", this, 3)([[type, id], function (data) {
          return new Zone(data);
        }]);
      }

      /**
       * Returns the current zone forecast for a given zone
       * @param {string} type
       * @param {string} id
       */
    }, {
      key: "getZoneForecast",
      value: function getZoneForecast(type, id) {
        validateParameter('id', type, {
          'type': 'string'
        });
        validateParameter('type', type, {
          'type': 'string',
          'allowedValues': Zones.Types
        });
        return _superPropGet(Zones, "get", this, 3)([[type, id, 'forecast'], function (data) {
          return new ZoneForecast(data);
        }]);
      }

      /**
       * Returns a list of observations for a given zone
       * @param {string} type
       * @param {string} id
       * @param {Date?} start
       * @param {Date?} end
       * @param {number} limit
       */
    }, {
      key: "getZoneObservations",
      value: function getZoneObservations(id, start, end, limit) {
        validateParameter('id', id, {
          'type': 'string'
        });
        if (start) {
          validateParameter('start', start, {
            'type': 'Date'
          });
          toQueryParamValue(start);
        }
        if (end) {
          validateParameter('end', end, {
            'type': 'Date'
          });
          toQueryParamValue(end);
        }
        if (limit) {
          validateParameter('limit', limit, {
            'type': 'number'
          });
        }
        return _superPropGet(Zones, "get", this, 3)([['forecast', id, 'observations'], function (data) {
          return new observationsToArray(data);
        }]);
      }

      /**
       * Returns a list of observation stations for a given zone
       * @param {string} id
       */
    }, {
      key: "getZoneStations",
      value: function getZoneStations(id) {
        validateParameter('id', id, {
          'type': 'string'
        });
        return _superPropGet(Zones, "get", this, 3)([['forecast', id, 'stations'], function (data) {
          return stationsToArray(data);
        }]);
      }
    }]);
  }(Endpoint);
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
      'allowArray': true
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
  var Zone = /*#__PURE__*/function () {
    function Zone(data) {
      _classCallCheck(this, Zone);
      if (typeof data === 'string') {
        this.type = getUrlPart(data, -2);
        this.id = getUrlPart(data, -1);
      } else {
        var i;
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
    return _createClass(Zone, [{
      key: "getZone",
      value: function getZone() {
        return toZones().getZone(this.type, this.id);
      }
    }, {
      key: "getZoneForecast",
      value: function getZoneForecast() {
        return toZones().getZoneForecast(this.type, this.id);
      }
    }, {
      key: "getZoneStations",
      value: function getZoneStations() {
        return toZones().getZoneStations(this.id);
      }
    }, {
      key: "getZoneObservations",
      value: function getZoneObservations(start, end, limit) {
        return toZones().getZoneObservations(this.id, start, end, limit);
      }
    }]);
  }();
  function zonesToArray(data) {
    return featureCollectionToArray(data, function (feature) {
      return new Zone(feature);
    });
  }

  /* @class Office
   * @aka NOAA.Office
   *
   * */
  var Office = /*#__PURE__*/function () {
    function Office(data) {
      _classCallCheck(this, Office);
      if (typeof data === 'string') {
        this.id = data;
      } else {
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
    return _createClass(Office, [{
      key: "getZones",
      value: function getZones(key, data) {
        var list = [];
        if (data[key]) {
          for (var i = 0; i < data[key].length; i++) {
            list.push(new Zone(data[key][i]));
          }
        }
        return list;
      }
    }, {
      key: "getStations",
      value: function getStations(key, data) {
        var list = [];
        if (data[key]) {
          for (var i = 0; i < data[key].length; i++) {
            list.push(new Station(getUrlPart(data[key][i], -1)));
          }
        }
        return list;
      }
    }, {
      key: "getAreaForecastDiscussion",
      value: function getAreaForecastDiscussion() {
        return toProducts().get({
          'location': this.id,
          'type': 'AFD'
        });
      }
    }, {
      key: "getProductTypes",
      value: function getProductTypes() {
        return toProducts().getLocationTypes(this.id);
      }
    }, {
      key: "getProducts",
      value: function getProducts(params) {
        params['location'] = this.id;
        return toProducts().get(params);
      }
    }]);
  }();

  /* @class Point
   * @aka NOAA.Point
   *
   * Represents response from /points endpoint.
   * */
  var RelativeLocation = /*#__PURE__*/function (_Feature) {
    function RelativeLocation(data) {
      var _this;
      _classCallCheck(this, RelativeLocation);
      _this = _callSuper(this, RelativeLocation, [data]);
      _this.city = getFeatureProperty('city', data);
      _this.state = getFeatureProperty('state', data);
      _this.distance = toValueUnits(getFeatureProperty('distance', data));
      _this.bearing = toValueUnits(getFeatureProperty('bearing', data));
      return _this;
    }
    _inherits(RelativeLocation, _Feature);
    return _createClass(RelativeLocation);
  }(Feature);
  function toRelativeLocation(data) {
    if (!data) {
      return null;
    }
    return new RelativeLocation(data);
  }

  var millisecondsPerHour = 60 * 60 * 1000;
  var ValidTimePeriod = /*#__PURE__*/function () {
    function ValidTimePeriod(s) {
      _classCallCheck(this, ValidTimePeriod);
      var parts = s.split('/');
      if (parts.length !== 2) {
        throw new Error('Invalid valid time value (' + s + ')');
      }
      this.time = toTime(parts[0]);
      this.hours = 0;
      this.days = 0;

      //period parsing
      var period = parts[1],
        num = 0;
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
    return _createClass(ValidTimePeriod, [{
      key: "toArray",
      value: function toArray() {
        if (this._array) {
          return this._array;
        }
        this._array = [];
        for (var i = 0; i < this.totalHours; i++) {
          this._array.push(toTime(this.time.milliseconds + i * millisecondsPerHour));
        }
        return this._array;
      }
    }]);
  }();
  function toValidTimePeriod(a) {
    return new ValidTimePeriod(a);
  }

  /* @class GridPoint
   * @aka NOAA.GridPoint
   *
   * Represents response from /gridpoints endpoint.
   * */
  var GridPoint = /*#__PURE__*/function (_Feature) {
    function GridPoint(data) {
      var _this;
      _classCallCheck(this, GridPoint);
      _this = _callSuper(this, GridPoint, [data]);
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
    _inherits(GridPoint, _Feature);
    return _createClass(GridPoint, [{
      key: "getVariable",
      value: function getVariable(name, data) {
        var variableData = getFeatureProperty(name, data),
          units,
          values,
          item;
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
              } else {
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
      }
    }, {
      key: "mapToValidTimes",
      value: function mapToValidTimes(variable) {
        var timeValueDict = {},
          validTime,
          i,
          hour;
        if (this.values[variable] !== undefined && this.values[variable].length) {
          for (i = 0; i < this.values[variable].length; i++) {
            validTime = this.values[variable][i].validTime;
            for (hour = 0; hour < validTime.totalHours; hour++) {
              timeValueDict[validTime.time.milliseconds + hour * millisecondsPerHour] = this.values[variable][i];
            }
          }
          return this.validTimes.toArray().map(function (t) {
            return timeValueDict[t.milliseconds];
          });
        }
      }
    }]);
  }(Feature);
  GridPoint.variables = ['temperature', 'dewpoint', 'maxTemperature', 'minTemperature', 'relativeHumidity', 'apparentTemperature', 'heatIndex', 'windChill', 'skyCover', 'windDirection', 'windSpeed', 'windGust', 'probabilityOfPrecipitation', 'quantitativePrecipitation', 'iceAccumulation', 'snowfallAmount', 'snowLevel', 'ceilingHeight', 'visibility', 'transportWindSpeed', 'transportWindDirection', 'mixingHeight', 'hainesIndex', 'lightningActivityLevel', 'twentyFootWindSpeed', 'twentyFootWindDirection', 'waveHeight', 'wavePeriod', 'waveDirection', 'primarySwellHeight', 'primarySwellDirection', 'secondarySwellHeight', 'secondarySwellDirection', 'wavePeriod2', 'windWaveHeight', 'dispersionIndex', 'pressure', 'probabilityOfTropicalStormWinds', 'probabilityOfHurricaneWinds', 'potentialOf15mphWinds', 'potentialOf25mphWinds', 'potentialOf35mphWinds', 'potentialOf45mphWinds', 'potentialOf20mphWindGusts', 'potentialOf30mphWindGusts', 'potentialOf40mphWindGusts', 'potentialOf50mphWindGusts', 'potentialOf60mphWindGusts', 'grasslandFireDangerIndex', 'probabilityOfThunder', 'davisStabilityIndex', 'atmosphericDispersionIndex', 'lowVisibilityOccurrenceRiskIndex', 'stability', 'redFlagThreatIndex', 'weather', 'hazards'];

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

  var ForecastPeriod = /*#__PURE__*/_createClass(function ForecastPeriod(data) {
    _classCallCheck(this, ForecastPeriod);
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
  });

  /* @class Forecast
   * @aka NOAA.Forecast
   *
   * Represents response from /gridpoints/{wfo}/{x},{y}/forecast endpoint.
   * */
  var Forecast = /*#__PURE__*/function (_Feature) {
    function Forecast(data) {
      var _this;
      _classCallCheck(this, Forecast);
      _this = _callSuper(this, Forecast, [data]);
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
    _inherits(Forecast, _Feature);
    return _createClass(Forecast);
  }(Feature);

  /* class GridPoints implements /gridpoints interface
   * */
  var GridPoints = /*#__PURE__*/function (_Endpoint) {
    /**
     * 
     * @param {string} weatherForecastOffice
     * @param {XY} xy
     */
    function GridPoints(weatherForecastOffice, xy) {
      var _this;
      _classCallCheck(this, GridPoints);
      _this = _callSuper(this, GridPoints, ['/gridpoints']);
      _this.weatherForecastOffice = weatherForecastOffice;
      _this.xy = xy;
      return _this;
    }
    _inherits(GridPoints, _Endpoint);
    return _createClass(GridPoints, [{
      key: "get",
      value: function get() {
        return _superPropGet(GridPoints, "get", this, 3)([[this.weatherForecastOffice, this.xy], function (data) {
          return new GridPoint(data);
        }]);
      }
    }, {
      key: "getForecast",
      value: function getForecast(units) {
        if (units === undefined) {
          units = 'us';
        }
        return _superPropGet(GridPoints, "get", this, 3)([[this.weatherForecastOffice, this.xy, 'forecast'], {
          'units': units
        }, function (data) {
          return new Forecast(data);
        }]);
      }
    }, {
      key: "getForecastHourly",
      value: function getForecastHourly(units) {
        if (units === undefined) {
          units = 'us';
        }
        return _superPropGet(GridPoints, "get", this, 3)([[this.weatherForecastOffice, this.xy, 'forecast', 'hourly'], {
          'units': units
        }, function (data) {
          return new Forecast(data);
        }]);
      }
    }, {
      key: "getStations",
      value: function getStations() {
        return _superPropGet(GridPoints, "get", this, 3)([[this.weatherForecastOffice, this.xy, 'stations'], function (data) {
          return stationsToArray(data);
        }]);
      }
    }]);
  }(Endpoint);

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
  var Alert = /*#__PURE__*/_createClass(function Alert(data) {
    _classCallCheck(this, Alert);
    this.id = getFeatureProperty('id', data);
    this.areaDescription = getFeatureProperty('areaDesc', data);
    this.geocode = getFeatureProperty('geocode', data);
    this.affectedZones = [];
    var affectedZones = getFeatureProperty('affectedZones', data),
      i;
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
  });

  /* @class AlertCollection
   * @aka NOAA.AlertCollection
   *
   * Represents response from /alerts endpoint.
   * */
  var AlertCollection = /*#__PURE__*/function () {
    function AlertCollection(data) {
      _classCallCheck(this, AlertCollection);
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
      } else {
        this.isComplete = true;
      }
    }
    return _createClass(AlertCollection, [{
      key: "getNext",
      value: function getNext() {
        return toAlerts().getNext(this.next);
      }
    }]);
  }();

  /* class Alerts implements /alerts interface
   * */
  var Alerts = /*#__PURE__*/function (_Endpoint) {
    function Alerts() {
      _classCallCheck(this, Alerts);
      return _callSuper(this, Alerts, ['/alerts']);
    }
    _inherits(Alerts, _Endpoint);
    return _createClass(Alerts, [{
      key: "get",
      value: function get() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _superPropGet(Alerts, "get", this, 3)([toQueryParameters(params, Alerts.parameterOptions), function (data) {
          return new AlertCollection(data);
        }]);
      }
    }, {
      key: "getNext",
      value: function getNext(url) {
        return _superPropGet(Alerts, "get", this, 3)([url, function (data) {
          return new AlertCollection(data);
        }]);
      }
    }, {
      key: "getActive",
      value: function getActive() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _superPropGet(Alerts, "get", this, 3)([['active'], toQueryParameters(params, Alerts.parameterOptions), function (data) {
          return new AlertCollection(data);
        }]);
      }
    }, {
      key: "getTypes",
      value: function getTypes() {
        return _superPropGet(Alerts, "get", this, 3)([['types'], function (data) {
          return data['eventTypes'];
        }]);
      }
    }, {
      key: "getAlert",
      value: function getAlert(id) {
        return _superPropGet(Alerts, "get", this, 3)([[id], function (data) {
          return new Alert(data);
        }]);
      }
    }, {
      key: "getActiveCount",
      value: function getActiveCount() {
        return _superPropGet(Alerts, "get", this, 3)([['active', 'count'], function (data) {
          return data;
        }]);
      }
    }, {
      key: "getZoneActive",
      value: function getZoneActive(zoneId) {
        return _superPropGet(Alerts, "get", this, 3)([['active', 'zone', zoneId], function (data) {
          return new AlertCollection(data);
        }]);
      }
    }, {
      key: "getAreaActive",
      value: function getAreaActive(area) {
        if (area in MarineAreaCodes || area in StateAreaCodes) {
          return _superPropGet(Alerts, "get", this, 3)([['active', 'area', area], function (data) {
            return new AlertCollection(data);
          }]);
        } else {
          throw new Error('Invalid area code (' + area + ')');
        }
      }
    }, {
      key: "getRegionActive",
      value: function getRegionActive(region) {
        if (region in RegionCodes) {
          return _superPropGet(Alerts, "get", this, 3)([['active', 'region', region], function (data) {
            return new AlertCollection(data);
          }]);
        } else {
          throw new Error('Invalid region code (' + region + ')');
        }
      }
    }]);
  }(Endpoint);
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

  /* @factory NOAA.alerts(): Object
   *
   */
  function toAlerts(params) {
    return new Alerts(params);
  }

  /* @class Point
   * @aka NOAA.Point
   *
   * Represents response from /points endpoint.
   * */
  var Point = /*#__PURE__*/function (_Feature) {
    function Point(data) {
      var _this;
      _classCallCheck(this, Point);
      _this = _callSuper(this, Point, [data]);
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
    _inherits(Point, _Feature);
    return _createClass(Point, [{
      key: "getAlerts",
      value: function getAlerts() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        params['point'] = this.geometry.latlon;
        return toAlerts().get(params);
      }
    }, {
      key: "getGridPoint",
      value: function getGridPoint() {
        return toGridPoints(this.office.id, this.xy).get();
      }
    }, {
      key: "getRadar",
      value: function getRadar() {
        if (this.radarStation) {
          return toStations().getRadar(this.radarStation);
        } else {
          return null;
        }
      }
    }, {
      key: "getGridPointForecast",
      value: function getGridPointForecast() {
        return toGridPoints(this.office.id, this.xy).getForecast();
      }
    }, {
      key: "getGridPointForecastHourly",
      value: function getGridPointForecastHourly() {
        return toGridPoints(this.office.id, this.xy).getForecastHourly();
      }
    }, {
      key: "getGridPointStations",
      value: function getGridPointStations() {
        return toGridPoints(this.office.id, this.xy).getStations();
      }
    }]);
  }(Feature);

  /* class Points implements /points interface
   * */
  var Points = /*#__PURE__*/function (_Endpoint) {
    /**
     * 
     * @param {LatLon} latlon
     */
    function Points(latlon) {
      var _this;
      _classCallCheck(this, Points);
      _this = _callSuper(this, Points, ['/points']);
      _this.latlon = toLatLon(latlon);
      return _this;
    }
    _inherits(Points, _Endpoint);
    return _createClass(Points, [{
      key: "get",
      value: function get() {
        return _superPropGet(Points, "get", this, 3)([[this.latlon], function (data) {
          return new Point(data);
        }]);
      }
    }, {
      key: "getStations",
      value: function getStations() {
        return _superPropGet(Points, "get", this, 3)([[this.latlon, 'stations'], function (data) {
          return stationsToArray(data);
        }]);
      }
    }]);
  }(Endpoint);

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
  var Glossary = /*#__PURE__*/function (_Endpoint) {
    function Glossary() {
      _classCallCheck(this, Glossary);
      return _callSuper(this, Glossary, ['/glossary']);
    }
    _inherits(Glossary, _Endpoint);
    return _createClass(Glossary, [{
      key: "get",
      value: function get() {
        return _superPropGet(Glossary, "get", this, 3)([function (data) {
          var terms = {};
          data['glossary'].forEach(function (term) {
            terms[term['term']] = term['definition'];
          });
          return terms;
        }]);
      }
    }]);
  }(Endpoint);

  // @factory NOAA.glossary(): Object
  // Creates a glossary term dictionary
  function toGlossary() {
    return new Glossary();
  }

  /* class Glossary implements /glossary interface
   * */
  var Icons = /*#__PURE__*/function (_Endpoint) {
    function Icons() {
      _classCallCheck(this, Icons);
      return _callSuper(this, Icons, ['/icons']);
    }
    _inherits(Icons, _Endpoint);
    return _createClass(Icons, [{
      key: "get",
      value: function get() {
        return _superPropGet(Icons, "get", this, 3)([function (data) {
          return data['icons'];
        }]);
      }
    }]);
  }(Endpoint);

  // @factory NOAA.glossary(): Object
  // Creates a glossary term dictionary
  function toIcons() {
    return new Icons();
  }

  /* class Offices implements /alerts interface
   * */
  var Offices = /*#__PURE__*/function (_Endpoint) {
    function Offices(officeId) {
      var _this;
      _classCallCheck(this, Offices);
      _this = _callSuper(this, Offices, ['/offices']);
      _this.officeId = officeId;
      return _this;
    }
    _inherits(Offices, _Endpoint);
    return _createClass(Offices, [{
      key: "get",
      value: function get() {
        return _superPropGet(Offices, "get", this, 3)([[this.officeId], function (data) {
          return new Office(data);
        }]);
      }
    }, {
      key: "getHeadlines",
      value: function getHeadlines() {
        return _superPropGet(Offices, "get", this, 3)([[this.officeId, 'headlines'], function (data) {
          return data;
        }]);
      }
    }]);
  }(Endpoint);

  /* @factory NOAA.offices(): Object
   *
   */
  function toOffices(officeId) {
    return new Offices(officeId);
  }

  var Weather = {};
  Weather.Points = Points;
  Weather.points = toPoints;
  Weather.Glossary = Glossary;
  Weather.glossary = toGlossary;
  Weather.Icons = Icons;
  Weather.icons = toIcons;
  Weather.Products = Products;
  Weather.products = toProducts;
  Weather.Alerts = Alerts;
  Weather.alerts = toAlerts;
  Weather.Alerts = Alerts;
  Weather.alerts = toAlerts;
  Weather.Offices = Offices;
  Weather.offices = toOffices;
  Weather.Stations = Stations;
  Weather.stations = toStations;
  Weather.Zones = Zones;
  Weather.zones = toZones;
  Weather.Point = Point;
  Weather.GridPoint = GridPoint;

  var stations = {
    'type': 'FeatureCollection',
    'name': 'Reference Stations',
    'crs': {
      'type': 'name',
      'properties': {
        'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'
      }
    },
    'features': [{
      'type': 'Feature',
      'properties': {
        'name': 'Port Allen, Hanapepe Bay',
        'id': 1611347
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-159.592, 21.9033]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Nawiliwili',
        'id': 1611400
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-159.356111111111, 21.954444444444398]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Honolulu',
        'id': 1612340
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-157.8685, 26.458027777777801]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mokuoloe',
        'id': 1612480
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-157.79, 21.433055555555601]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kahului',
        'id': 1615680
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-156.476666666667, 20.895]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kawaihae',
        'id': 1617433
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-155.829361111323, 20.036583333280401]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Hilo',
        'id': 1617760
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-155.055833333333, 19.7302777777778]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Johnston Atoll',
        'id': 1619000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-169.53, 16.7383]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sand Island, Midway Islands',
        'id': 1619910
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-177.36, 28.2117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Guam',
        'id': 1630000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [144.653944444390987, 13.43872]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Pago Bay, Guam',
        'id': 1631428
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [144.797, 13.4283]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Saipan',
        'id': 1633227
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [145.737, 15.2267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fare Ute Point',
        'id': 1732417
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-149.572, -17.535]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Pago Pago',
        'id': 1770000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-170.69, -14.28]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kwajalein, Marshall Islands',
        'id': 1820000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [167.736222222115998, 8.73161]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'CHUUK, Moen Island',
        'id': 1840000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [151.847, 7.44667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wake Island',
        'id': 1890000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [166.618, 19.29]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bermuda Esso Pier',
        'id': 2695540
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-64.7033055555556, 32.373388888888897]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Eastport',
        'id': 8410140
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-66.985, 44.9033]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cutler Naval Base',
        'id': 8411250
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-67.2967, 44.6417]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bar Harbor',
        'id': 8413320
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-68.205, 44.3917]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bangor',
        'id': 8414612
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-68.7667, 44.785]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rockland',
        'id': 8415490
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-69.1017, 44.105]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Gardiner',
        'id': 8417134
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-69.7667, 44.2333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Hunniwell Point',
        'id': 8417177
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-69.785, 43.755]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Richmond',
        'id': 8417208
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-69.7983, 44.0883]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Portland',
        'id': 8418150
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.2467, 43.6567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wells',
        'id': 8419317
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.5633, 43.32]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Seavey Island',
        'id': 8419870
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.7417, 43.08]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fort Point',
        'id': 8423898
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.7117, 43.0717]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Boston',
        'id': 8443970
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.0517, 42.355]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Buzzards Bay',
        'id': 8447270
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.6167, 41.7417]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fall River',
        'id': 8447386
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.1633, 41.705]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Woods Hole',
        'id': 8447930
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.6717, 41.5233]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Edgartown',
        'id': 8448558
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.5117, 41.3883]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Menemsha Harbor, MA',
        'id': 8448725
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.7678333333333, 41.354444444444397]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Nantucket Island',
        'id': 8449130
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-70.0967, 41.285]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Newport',
        'id': 8452660
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.3267, 41.505]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Conimicut Light',
        'id': 8452944
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.3433, 41.7167]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Providence',
        'id': 8454000
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.4017, 41.8067]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Quonset Point',
        'id': 8454049
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.4083, 41.585]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Block Island',
        'id': 8459681
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.61, 41.1633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'New London',
        'id': 8461490
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-72.0867, 41.355]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'New Haven',
        'id': 8465705
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-72.9083, 41.2833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bridgeport',
        'id': 8467150
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-73.1817, 41.1733]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Montauk',
        'id': 8510560
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-71.96, 41.0483]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Silver Eel Pond',
        'id': 8510719
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-72.03, 41.2567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mattituck Inlet',
        'id': 8512668
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-72.5617, 41.015]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'South Jamesport',
        'id': 8512735
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-72.5817, 40.935]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Eatons Neck',
        'id': 8515786
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-73.4, 40.9533]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kings Point',
        'id': 8516945
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-73.765, 40.81]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Willets Point',
        'id': 8516990
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-73.7817, 40.7933]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Horns Hook',
        'id': 8518668
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-73.9417, 40.7767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'The Battery',
        'id': 8518750
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.015, 40.7]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bergen Point West Reach',
        'id': 8519483
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.1467, 40.64]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Elizabeth',
        'id': 8530882
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.14, 40.6733]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sandy Hook',
        'id': 8531680
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.01, 40.4667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Atlantic City',
        'id': 8534720
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.4183, 39.355]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cape May',
        'id': 8536110
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.96, 38.968333333333298]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ship John Shoal',
        'id': 8537121
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.375, 39.305]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tacony-Palmyra Bridge',
        'id': 8538886
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.0429999997881, 40.01194]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Burlington, Delaware River',
        'id': 8539094
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.8733333333333, 40.08]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Marcus Hook',
        'id': 8540433
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.41, 39.8117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Philadelphia',
        'id': 8545240
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.1250277778837, 39.93331]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Philadelphia, Municipal Pier 11, Pa.',
        'id': 8545530
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.1383, 39.9533]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Newbold',
        'id': 8548989
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.7517, 40.1367]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Delaware City',
        'id': 8551762
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.5883, 39.5817]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Reedy Point',
        'id': 8551910
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.5733055555555, 39.558305555555599]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Brandywine Shoal Light',
        'id': 8555889
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.1133333333333, 38.98667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lewes',
        'id': 8557380
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.12, 38.781694444444398]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Indian River Inlet (Coast Guard Station)',
        'id': 8558690
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.07, 38.61]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'OCEAN CITY (FISHING PIER)',
        'id': 8570280
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.0833, 38.3267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ocean City Inlet',
        'id': 8570283
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.0916666666667, 38.32833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Snow Hill',
        'id': 8571359
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.2667777777778, 30.3501388888889]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bishops Head',
        'id': 8571421
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.0383, 38.22]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mc Creadys Creek',
        'id': 8571559
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.005, 38.3]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Beaverdam Creek',
        'id': 8571702
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.2366666666667, 38.42833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Vienna',
        'id': 8571773
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.8183333333333, 38.48333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cambridge',
        'id': 8571892
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.0683, 38.5733]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Hillsboro',
        'id': 8572669
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.945, 38.9167]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Crumpton',
        'id': 8573349
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.925, 39.245]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tolchester Beach',
        'id': 8573364
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.245, 39.21333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Chesapeake City',
        'id': 8573927
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.81, 39.5267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Havre De Grace',
        'id': 8574070
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.09, 39.5367]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Baltimore',
        'id': 8574680
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.5783333333333, 39.26667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Annapolis',
        'id': 8575512
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.4815555551317, 38.98328]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Solomons Island',
        'id': 8577330
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.4516666666667, 38.31667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lower Marlboro',
        'id': 8579542
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.6833333333333, 38.655]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Washington',
        'id': 8594900
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.0216666666667, 38.87333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Chincoteague Channel (south end)',
        'id': 8630308
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.405, 37.9067]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wachapreague',
        'id': 8631044
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.6866666666667, 37.60667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kiptopeke',
        'id': 8632200
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.9884444443385, 37.16519]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rappahannock Light',
        'id': 8632837
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.015, 37.5383]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Gaskins Point, Occohannock Creek',
        'id': 8632869
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.9167, 37.5567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tangier Island',
        'id': 8633532
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.9933, 37.8283]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Colonial Beach',
        'id': 8635150
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.96, 38.2517]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rappahannock Bend',
        'id': 8635257
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.2433, 38.2133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lewisetta',
        'id': 8635750
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.4644444444444, 37.996111111111098]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wares Wharf',
        'id': 8635985
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.7833, 37.8733]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Windmill Point',
        'id': 8636580
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.29, 37.615]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lester Manor',
        'id': 8636653
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.99, 37.5833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Gloucester Point',
        'id': 8637624
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.5, 37.2467]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Yorktown USCG Training Center',
        'id': 8637689
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.4783333333333, 37.226666666666702]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kingsmill',
        'id': 8638424
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.6633, 37.22]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Scotland',
        'id': 8638433
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.7833, 37.185]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Puddledock',
        'id': 8638489
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.3717, 37.2667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Richmond River Locks, James River',
        'id': 8638495
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.42, 37.525]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sewells Point',
        'id': 8638610
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.33, 36.946666666666701]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Portsmouth, Naval Shipyard',
        'id': 8638660
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.2933, 36.8217]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Chesapeake Bay Bridge Tunnel',
        'id': 8638863
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.1133333333333, 36.966666666666697]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rudee Inlet',
        'id': 8639207
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.9733, 36.8317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Money Point',
        'id': 8639348
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.3017, 36.7783]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Duck',
        'id': 8651370
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.7466666666667, 36.183333333333302]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Oregon Inlet Marina',
        'id': 8652587
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.5483, 35.795]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cape Hatteras Fishing Pier',
        'id': 8654400
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.635, 35.2233]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ocracoke, Ocracoke Island',
        'id': 8654792
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.9883, 35.115]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sea Level',
        'id': 8655875
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.3433, 34.875]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Beaufort',
        'id': 8656483
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.67, 34.72]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wilmington',
        'id': 8658120
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.9533, 34.2267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wrightsville Beach',
        'id': 8658163
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.7867, 34.2133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Southport',
        'id': 8659084
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-78.0183, 33.915]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sunset Beach',
        'id': 8659897
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-78.5067, 33.865]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Springmaid Pier',
        'id': 8661070
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-78.9183, 33.655]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Oyster Landing (North Inlet Estuary)',
        'id': 8662245
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-79.1867, 33.3517]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'General Dynamics Pier',
        'id': 8664022
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-79.9233, 33.0083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'South Capers Island',
        'id': 8664941
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-79.7067, 32.8567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Charleston',
        'id': 8665530
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-79.925, 32.7817]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Clarendon Plantation',
        'id': 8667633
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.785, 32.5]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fripps Inlet',
        'id': 8668498
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.465, 32.34]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fort Pulaski',
        'id': 8670870
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.9017, 32.0333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'St.Simons Island',
        'id': 8677344
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.3967, 31.1317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kings Bay, Navy Base',
        'id': 8679511
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.515, 30.7967]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fernandina Beach',
        'id': 8720030
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.465, 30.6717]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Edwards Creek',
        'id': 8720145
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.5417, 30.5017]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mayport Naval Sta., St Johns River',
        'id': 8720211
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.4133, 30.4]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mayport (Bar Pilots Dock)',
        'id': 8720218
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.43, 30.3967]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Dame Point',
        'id': 8720219
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.5583, 30.3867]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mayport (Ferry Depot)',
        'id': 8720220
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.4317, 30.3933]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Main Street Bridge, St Johns River',
        'id': 8720226
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.6583, 30.32]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Longbranch',
        'id': 8720242
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.62, 30.36]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'I-295 Bridge, St Johns River',
        'id': 8720357
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.6917, 30.1917]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Red Bay Point, St Johns River',
        'id': 8720503
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.6283, 29.9783]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Vilano Beach ICWW',
        'id': 8720554
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.3, 29.9167]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'State Road 312, Matanzas River',
        'id': 8720582
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.3067, 29.8667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'St. Augustine Beach',
        'id': 8720587
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.2633, 29.8567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Racy Point, St Johns River',
        'id': 8720625
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.5483, 29.8017]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Crescent Beach, Matanzas River',
        'id': 8720651
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.2583, 29.7683]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bings Landing, Matanzas River',
        'id': 8720757
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.205, 29.615]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Buffalo Bluff, St Johns River',
        'id': 8720767
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.6817, 29.595]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Palatka, St Johns River',
        'id': 8720774
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.6317, 29.6433]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Welaka',
        'id': 8720832
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.675, 29.4767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ponce De Leon Inlet South',
        'id': 8721147
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.915, 29.0633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Trident Pier',
        'id': 8721604
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.5933, 28.415]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'PGA BOULEVARD BRIDGE, PALM BEACH',
        'id': 8722548
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.0667, 26.8433]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port of West Palm Beach',
        'id': 8722588
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.0517, 26.77]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lake Worth Pier',
        'id': 8722670
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.0333, 26.6117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Haulover Pier, N. Miami Beach',
        'id': 8723080
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.12, 25.9033]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Miami Beach',
        'id': 8723170
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.1317, 25.7683]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'GOVERNMENT CUT, MIAMI HARBOR ENTRANCE',
        'id': 8723178
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.13, 25.7633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Virginia Key',
        'id': 8723214
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-80.1617, 25.7317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Key Colony Beach',
        'id': 8723962
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.0167, 24.7183]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Vaca Key',
        'id': 8723970
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.105, 24.7117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Key West',
        'id': 8724580
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.8083, 24.5533]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Loggerhead Key',
        'id': 8724698
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.92, 24.6317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Naples',
        'id': 8725110
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.8067, 26.13]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Fort Myers',
        'id': 8725520
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-81.8717, 26.6467]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Manatee',
        'id': 8726384
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.5655555555556, 27.636666666666699]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'St. Petersburg',
        'id': 8726520
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.625, 27.758333333333301]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Old Port Tampa',
        'id': 8726607
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.5526944444444, 27.857777777777802]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mckay Bay Entrance',
        'id': 8726667
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.425, 27.913333333333298]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Clearwater Beach',
        'id': 8726724
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.8317, 27.9783]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Johns Island, Chassahowitzka Bay',
        'id': 8727235
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6383, 28.6917]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Chassahowitzka, Chassahowitzka River',
        'id': 8727246
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.5767, 28.715]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mason Creek, Homosassa Bay',
        'id': 8727274
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6383, 28.7617]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tuckers Island, Homosassa River',
        'id': 8727277
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.695, 28.7717]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Halls River bridge, Homosassa River',
        'id': 8727293
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6033, 28.8]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ozello, St. Martins River',
        'id': 8727306
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6583, 28.825]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ozello north, Crystal Bay',
        'id': 8727328
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6667, 28.8633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mangrove Point',
        'id': 8727333
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.7233, 28.87]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'WHITE CITY',
        'id': 8728853
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-85.2233, 29.88]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Dixie Bay, Salt River, Crystal Bay',
        'id': 8727336
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.635, 28.8817]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kings Bay',
        'id': 8727343
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.5983, 28.8983]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Twin Rivers Marina',
        'id': 8727348
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6383, 28.905]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Shell Island, north end',
        'id': 8727359
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-82.6917, 28.9233]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cedar Key',
        'id': 8727520
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-83.0317, 29.135]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'ST. MARKS RIVER ENTRANCE',
        'id': 8728130
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-84.1783, 30.0783]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Shell Point, Walker Creek',
        'id': 8728229
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-84.29, 30.06]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Turkey Point, St. James Island',
        'id': 8728360
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-84.5117, 29.915]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Apalachicola',
        'id': 8728690
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-84.9817, 29.7267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Panama City',
        'id': 8729108
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-85.6667, 30.1517]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Panama City Beach',
        'id': 8729210
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-85.8783, 30.2133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Valparaiso',
        'id': 8729501
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-86.4933, 30.5033]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Navarre Beach',
        'id': 8729678
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-86.865, 30.3767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Pensacola',
        'id': 8729840
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-87.2117, 30.4033]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Millview, Perdido Bay',
        'id': 8729905
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-87.3567, 30.4183]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'ALABAMA POINT, PERDIDO PASS',
        'id': 8730667
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-87.555, 30.2786111111111]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Dauphin Island',
        'id': 8735180
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.075, 30.25]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Dauphin Island Hydro',
        'id': 8735181
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.075, 30.25]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mobile State Docks',
        'id': 8737048
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.0433, 30.7083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lower Bryant Landing',
        'id': 8737373
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-87.8733, 30.9783]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Pascagoula Point',
        'id': 8741196
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.5333, 30.34]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Pascagoula NOAA Lab',
        'id': 8741533
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.5667, 30.3583]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Horn Island',
        'id': 8742221
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.6667, 30.2383]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ocean Springs',
        'id': 8743281
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.7983, 30.3917]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Biloxi',
        'id': 8744117
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-88.9033, 30.4117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Gulfport Harbor',
        'id': 8745557
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.0817, 30.36]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bay Waveland Yacht Club',
        'id': 8747437
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.325, 30.325]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Waveland',
        'id': 8747766
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.3667, 30.2817]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'South Pass',
        'id': 8760551
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.14, 28.99]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Pilots Station East, SW Pass',
        'id': 8760922
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.4067, 28.9317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'SW Pass',
        'id': 8760943
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.4183, 28.925]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Shell Beach',
        'id': 8761305
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.6733, 29.8683]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Grand Isle',
        'id': 8761724
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.9566666666667, 29.2633333333333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'TEXACO DOCK, HACKBERRY BAY',
        'id': 8761819
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-90.0383, 29.4017]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'New Canal Station',
        'id': 8761927
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-90.1133, 30.0267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Fourchon',
        'id': 8762075
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-90.2, 29.115]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'East Bank 1, Norco, B. LaBranche',
        'id': 8762372
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-90.3683333333333, 30.05]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'West Bank 1, Bayou Gauche',
        'id': 8762482
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-90.4183333333333, 29.776666666666699]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Stouts Pass at Six Mile Lake',
        'id': 8764025
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-91.23, 29.7433]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tesoro Marine Terminal',
        'id': 8764044
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-91.2367, 29.6667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'LAWMA, Amerada Pass',
        'id': 8764227
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-91.34, 29.45]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cypremort Point',
        'id': 8765251
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-91.88, 29.7133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Freshwater Canal Locks',
        'id': 8766072
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-92.305, 29.555]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lake Charles',
        'id': 8767816
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-93.2217, 30.225]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Calcasieu Pass',
        'id': 8768094
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-93.3433, 29.765]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Arthur',
        'id': 8770475
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-93.93, 29.8667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rainbow Bridge',
        'id': 8770520
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-93.8817, 29.98]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mesquite Point',
        'id': 8770539
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-93.895, 29.7667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Round Point',
        'id': 8770559
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.69, 29.7133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sabine Pass North',
        'id': 8770570
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-93.87, 29.73]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Morgans Point',
        'id': 8770613
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.985, 29.6817]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lynchburg Landing',
        'id': 8770733
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-95.0783, 29.765]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Battleship Texas State Park',
        'id': 8770743
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-95.09, 29.7567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Manchester',
        'id': 8770777
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-95.2517, 29.7183]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Clear Lake',
        'id': 8770933
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-95.0667, 29.5633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rollover Pass',
        'id': 8770971
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.5133, 29.515]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Eagle Point',
        'id': 8771013
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.9183, 29.48]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Bolivar',
        'id': 8771328
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.78, 29.365]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Galveston Bay Entrance, North Jetty',
        'id': 8771341
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.725, 29.3583]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Galveston Pier 21',
        'id': 8771450
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.7933, 29.31]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Galveston Pleasure Pier',
        'id': 8771510
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-94.7883, 29.285]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Freeport',
        'id': 8772440
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-95.3083, 28.9483]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'USCG Freeport',
        'id': 8772447
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-95.3, 28.9333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Seadrift',
        'id': 8773037
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-96.7117, 28.4083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Lavaca',
        'id': 8773259
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-96.595, 28.64]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port O\'Connor',
        'id': 8773701
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-96.3883, 28.4517]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Copano Bay',
        'id': 8774513
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.0217, 28.1183]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rockport',
        'id': 8774770
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.0467, 28.0217]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'White Point',
        'id': 8775188
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.475, 27.8583]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Aransas',
        'id': 8775237
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.0733, 27.8383]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Aransas (H. Caldwell Pier)',
        'id': 8775270
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.05, 27.8267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Ingleside, Corpus Christi Bay',
        'id': 8775283
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.2033, 27.8217]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Texas State Aquarium',
        'id': 8775296
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.39, 27.8117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Naval Air Station',
        'id': 8775421
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.28, 27.705]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Packery Channel',
        'id': 8775792
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.2367, 27.6333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Corpus Christi',
        'id': 8775870
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.2167, 27.58]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'South Padre Island C.G Station',
        'id': 8779748
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.1767, 26.0767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'PADRE ISLAND (south end)',
        'id': 8779750
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.1567, 26.0683]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Isabel',
        'id': 8779770
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.215, 26.06]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'San Diego',
        'id': 9410170
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-117.173583333227, 32.71419]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'La Jolla',
        'id': 9410230
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-117.258, 32.8667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Newport Bay Entrance, Corona del Mar',
        'id': 9410580
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-117.883, 33.6033]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Los Angeles',
        'id': 9410660
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-118.272, 33.72]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Long Beach, Terminal Island',
        'id': 9410680
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-118.227, 33.7517]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Santa Monica',
        'id': 9410840
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-118.5, 34.0083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Santa Barbara',
        'id': 9411340
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-119.685, 34.4083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Oil Platform Harvest',
        'id': 9411406
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-120.673, 34.4683]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port San Luis',
        'id': 9412110
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-120.76, 35.1767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Monterey',
        'id': 9413450
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-121.888, 36.605]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'San Francisco',
        'id': 9414290
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.465, 37.806694444444503]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rincon Point, Pier 22 1\/2',
        'id': 9414317
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.387, 37.79]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Hunters Point',
        'id': 9414358
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.357, 37.73]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Oyster Point Marina',
        'id': 9414392
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.377, 37.665]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'San Mateo Bridge',
        'id': 9414458
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.253, 37.58]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Dumbarton Bridge',
        'id': 9414509
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.115, 37.5067]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Redwood City',
        'id': 9414523
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.21, 37.5067]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Coyote Creek',
        'id': 9414575
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.023, 37.465]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'San Leandro Marina',
        'id': 9414688
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.192, 37.695]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Alameda',
        'id': 9414750
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.298333333333, 37.771666666666697]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bradmoor Island',
        'id': 9414811
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-121.923, 38.1833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Richmond',
        'id': 9414863
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.4, 37.9283]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Point Reyes',
        'id': 9415020
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.9767, 37.9961]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Chicago',
        'id': 9415144
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.038, 38.0567]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mare Island',
        'id': 9415218
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.25, 38.07]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Arena Cove',
        'id': 9416841
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.708, 38.9133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'North Spit',
        'id': 9418767
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.217, 40.7667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Crescent City',
        'id': 9419750
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.183, 41.745]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Orford',
        'id': 9431647
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.498277777566, 42.73897]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Charleston',
        'id': 9432780
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.322, 43.345]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'South Beach',
        'id': 9435380
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.043, 44.625]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Depoe Bay',
        'id': 9435827
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.058, 44.81]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Garibaldi',
        'id': 9437540
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.918944444391, 45.55453]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Astoria',
        'id': 9439040
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.768305555582, 46.20731]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wauna',
        'id': 9439099
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.405, 46.16]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Rocky Point',
        'id': 9439189
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.868, 45.6967]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Saint Helens',
        'id': 9439201
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.797, 45.865]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Portland Morrison Street Bridge',
        'id': 9439221
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.673, 45.51]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Vancouver',
        'id': 9440083
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.695472222222, 45.631194444444503]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Longview',
        'id': 9440422
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.957, 46.1083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Skamokawa',
        'id': 9440569
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.452, 46.2667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Nahcotta',
        'id': 9440747
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.023, 46.5017]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'South Bend, Willapa River',
        'id': 9440875
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.798, 46.6633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Toke Point',
        'id': 9440910
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.96691666666, 46.70747]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Westport',
        'id': 9441102
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.105083333121, 46.90431]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Aberdeen',
        'id': 9441187
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.853, 46.9683]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'La Push',
        'id': 9442396
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.637, 47.9133]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Neah Bay',
        'id': 9443090
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.611666666667, 48.36667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Angeles',
        'id': 9444090
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.44, 48.125]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Townsend',
        'id': 9444900
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.758, 48.1117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Bangor',
        'id': 9445133
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.727, 47.7483]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tacoma',
        'id': 9446484
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.413333333333, 47.26667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Seattle',
        'id': 9447130
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.339305555556, 47.60264]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cherry Point',
        'id': 9449424
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-122.758, 48.8633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Friday Harbor',
        'id': 9449880
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.01, 48.546666666666702]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Ketchikan',
        'id': 9450460
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-131.626194444233, 55.33183]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Craig',
        'id': 9450551
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-133.142, 55.4883]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Big Salt Lake',
        'id': 9450623
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-132.95, 55.6]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Thoms Point',
        'id': 9450970
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-132.078, 56.1183]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Alexander',
        'id': 9451054
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-134.647, 56.2467]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Monte Carlo Island',
        'id': 9451247
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-133.767, 55.535]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'The Summit',
        'id': 9451349
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-133.735, 56.6817]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Turn Point',
        'id': 9451434
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-132.98, 56.8]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Entrance Island',
        'id': 9451438
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-133.787, 56.8117]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sitka',
        'id': 9451600
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-135.342, 57.0517]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Juneau',
        'id': 9452210
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-134.412, 58.2983]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Skagway',
        'id': 9452400
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-135.327, 59.45]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Elfin Cove',
        'id': 9452634
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-136.346944444444, 58.19472]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Yakutat',
        'id': 9453220
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-139.735, 59.5483]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Cordova',
        'id': 9454050
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-145.753, 60.5583]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Valdez',
        'id': 9454240
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-146.362, 61.125]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Wooded Island',
        'id': 9454562
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-147.403, 59.875]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Whittier',
        'id': 9454949
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-148.665, 60.7783]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Seward',
        'id': 9455090
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-149.426666666667, 60.12]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Seldovia',
        'id': 9455500
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-151.719944444497, 59.44053]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Nikiski',
        'id': 9455760
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-151.398, 60.6833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Anchorage',
        'id': 9455920
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-149.89, 61.238305555555598]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kodiak Island',
        'id': 9457292
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-152.512, 57.7317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Alitak',
        'id': 9457804
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-154.247, 56.8983]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Chirikof Island',
        'id': 9458293
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-155.74, 55.8083]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mitrofania Island',
        'id': 9459016
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-158.82, 55.89]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Sand Point',
        'id': 9459450
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-160.502, 55.3367]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Dolgoi Harbor, Dolgoi Island',
        'id': 9459758
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-161.792, 55.1217]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'King Cove',
        'id': 9459881
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-162.327, 55.0617]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Adak Island',
        'id': 9461380
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-176.632, 51.8633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Atka',
        'id': 9461710
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-174.173, 52.2317]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Nikolski',
        'id': 9462450
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-168.871305555767, 52.94061]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Unalaska',
        'id': 9462620
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-166.537, 53.88]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Port Moller',
        'id': 9463502
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-160.562, 55.99]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Village Cove, St. Paul Island',
        'id': 9464212
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-170.285166666667, 57.125305555555599]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Snag Point, Dillingham',
        'id': 9465374
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-158.447, 59.04]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Nome, Norton Sound',
        'id': 9468756
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-165.43, 64.5]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Tin City, Bering Sea',
        'id': 9469439
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-167.975, 65.5583]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Shishmaref Inlet 2',
        'id': 9469854
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-166.02, 66.2633]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kotzebue',
        'id': 9490424
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-162.582, 66.9017]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Red Dog Dock',
        'id': 9491094
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-164.065, 67.5767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kivalina',
        'id': 9491253
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-164.592, 67.7267]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Prudhoe Bay',
        'id': 9497645
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-148.527, 70.4]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Madero, Tampico Harbor, Mexico',
        'id': 9500966
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-97.795, 22.2617]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Settlement Point',
        'id': 9710441
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-78.9967, 26.71]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Christiansted Harbor, St Croix',
        'id': 9751364
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-64.705, 17.75]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lameshur Bay, St. Johns',
        'id': 9751381
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-64.7242222224342, 18.318249999947]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lime Tree Bay',
        'id': 9751401
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-64.7540277777778, 17.68447]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Charlotte Amalie',
        'id': 9751639
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-64.92, 18.335833333333301]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Culebra',
        'id': 9752235
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-65.3024722221163, 18.30086]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Vieques Island',
        'id': 9752695
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-65.4713611110052, 18.09386]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'YABUCOA HARBOR',
        'id': 9754228
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-65.833, 18.0550833333333]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'San Juan',
        'id': 9755371
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-66.1164166662428, 18.45894]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Punta Guayanilla',
        'id': 9758053
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-66.7617, 17.9767]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Magueyes Island',
        'id': 9759110
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-67.0464166662428, 17.97008]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mayaguez',
        'id': 9759394
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-67.16, 18.22]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Aguadilla',
        'id': 9759412
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-67.1645833333333, 18.45664]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mona Island',
        'id': 9759938
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-67.938500000106, 18.089916666878601]
      }
    }]
  };

  var toRad = function toRad(x) {
    return x * Math.PI / 180;
  };

  /**
   * Calculates the haversine distance between point A, and B.
   * @param {LatLon} latlng1 point A
   * @param {LatLon} latlng2 point B
   * @returns {Number} distance in metres between points
  */
  var haversineDistance = function haversineDistance(latlng1, latlng2) {
    var R = 6378137; // m

    var lat1 = toRad(latlng1.lat),
      lat2 = toRad(latlng2.lat),
      sinDLat = Math.sin(toRad(latlng2.lat - latlng1.lat) / 2),
      sinDLon = Math.sin(toRad(latlng2.lon - latlng1.lon) / 2),
      a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  /**
   * Converts feature to latLon
   * @param {any} f
   */
  var getStationLatLon = function getStationLatLon(station) {
    return toLatLon(station['geometry']['coordinates'][1], station['geometry']['coordinates'][0]);
  };

  /**
   * Finds closest tidal stations to a point
   * @param {LatLon} latlon
   */
  function findClosestStation(latlon) {
    var minDistance = -1,
      distance,
      closestStation,
      stationLatLon;
    stations['features'].forEach(function (station) {
      stationLatLon = getStationLatLon(station);
      distance = haversineDistance(latlon, stationLatLon);
      if (minDistance < 0 || distance < minDistance) {
        minDistance = distance;
        closestStation = station['properties'];
        closestStation['latlon'] = stationLatLon;
      }
    });
    closestStation['distance'] = toValueUnits(minDistance, 'm');
    return closestStation;
  }

  // https://tidesandcurrents.noaa.gov/api/

  //The datum can be specified with the "datum=" option parameter. Note! Datum is mandatory for all water level products. 
  var Datum = {
    'CRD': 'CRD',
    //Columbia River Datum
    'IGLD': 'IGLD',
    //International Great Lakes Datum
    'LWD': 'LWD',
    //Great Lakes Low Water Datum(Chart Datum)
    'MHHW': 'MHHW',
    //Mean Higher High Water
    'MHW': 'MHW',
    //Mean High Water
    'MTL': 'MTL',
    //Mean Tide Level
    'MSL': 'MSL',
    //Mean Sea Level
    'MLW': 'MLW',
    //Mean Low Water
    'MLLW': 'MLLW',
    //Mean Lower Low Water
    'NAVD': 'NAVD',
    //North American Vertical Datum
    'STND': 'STND' //Station Datum
  };

  // Specify the type of data with the "product=" option parameter. 
  var DataProduct = {
    'water_level': 'water_level',
    //Preliminary or verified water levels, depending on availability.
    'air_temperature': 'air_temperature',
    //Air temperature as measured at the station.
    'water_temperature': 'water_temperature',
    //Water temperature as measured at the station.
    'wind': 'wind',
    //Wind speed, direction, and gusts as measured at the station.
    'air_pressure': 'air_pressure',
    //Barometric pressure as measured at the station.
    'air_gap': 'air_gap',
    //Air Gap(distance between a bridge and the water's surface) at the station.
    'conductivity': 'conductivity',
    //The water's conductivity as measured at the station.
    'visibility': 'visibility',
    //Visibility from the station's visibility sensor. A measure of atmospheric clarity.
    'humidity': 'humidity',
    //Relative humidity as measured at the station.
    'salinity': 'salinity',
    //Salinity and specific gravity data for the station.
    'hourly_height': 'hourly_height',
    //Verified hourly height water level data for the station.
    'high_low': 'high_low',
    //Verified high/ low water level data for the station.
    'daily_mean': 'daily_mean',
    //Verified daily mean water level data for the station.
    'monthly_mean': 'monthly_mean',
    //Verified monthly mean water level data for the station.
    'one_minute_water_level': 'one_minute_water_level',
    //One minute water level data for the station.
    'predictions': 'predictions',
    //6 minute predictions water level data for the station.
    'datums': 'datums',
    //datums data for the stations.
    'currents': 'currents' //Currents data for currents stations.
  };

  // Example: units=english
  var Units = {
    'metric': 'metric',
    //Metric(Celsius, meters, cm/ s) units
    'english': 'english' //English(fahrenheit, feet, knots) units
  };

  // gmt, lst or lst_ldt.The time_zone can be specified with the "time_zone=" option parameter.
  // Example: time_zone = gmt
  // Retrieve data with GMT date / times.
  var TimeZone = {
    'gmt': 'gmt'};

  //The interval for which Meteorological data is returned
  //Note! The default is 6 minute interval and there is no need to specify it.The hourly interval is supported for Met data and Predictions data only.
  //    Example: interval = h-- - Will retrieve hourly Met data 
  var Interval = {
    'h': 'h',
    //Hourly Met data and predictions data will be returned
    'hilo': 'hilo' //High/ Low tide predictions for subordinate stations.
  };

  //Format
  //The output format can be specified with the "format=" option parameter.
  var Format = {
    'json': 'json',
    //Javascript Object Notation.This format is useful for direct import to a javascript plotting library.Parsers are available for other languages such as Java and Perl.
    'xml': 'xml',
    //Extensible Markup Language.This format is an industry standard for data.
    'csv': 'csv' //Comma Separated Values.This format is suitable for export to Microsoft Excel or other spreadsheet programs.This is also the most easily human - readable format.
  };

  // returns date formatted as YYYYMMDD HH:mm in UTC
  function formatDate(date) {
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    return "".concat(year).concat(month.toString().padStart(2, "0")).concat(day.toString().padStart(2, "0"), " ").concat(hours.toString().padStart(2, "0"), ":").concat(minutes.toString().padStart(2, "0"));
  }

  var TidesAndCurrentsApi = /*#__PURE__*/function () {
    function TidesAndCurrentsApi(stationId, product) {
      var datum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var units = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'metric';
      _classCallCheck(this, TidesAndCurrentsApi);
      var validStation = false,
        i;
      if (!(product in DataProduct)) {
        throw new Error('Invalid data product');
      }
      if (!(units in Units)) {
        throw new Error('Invalid units');
      }
      for (i = 0; i < stations['features'].length; i++) {
        if (stations['features'][i]['properties']['id'] === stationId) {
          validStation = true;
          break;
        }
      }
      if (!validStation) {
        throw new Error('Invalid station ID');
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
    return _createClass(TidesAndCurrentsApi, [{
      key: "getLatest",
      value: function getLatest() {
        this.params['date'] = 'latest';
        return this.get();
      }
    }, {
      key: "getRecent",
      value: function getRecent() {
        this.params['date'] = 'recent';
        return this.get();
      }
    }, {
      key: "getToday",
      value: function getToday() {
        this.params['date'] = 'today';
        return this.get();
      }
    }, {
      key: "getLastHours",
      value: function getLastHours(hours) {
        this.params['range'] = hours;
        return this.get();
      }
    }, {
      key: "getHoursAfter",
      value: function getHoursAfter(start, hours) {
        this.params['begin_date'] = formatDate(start);
        this.params['range'] = hours;
        return this.get();
      }
    }, {
      key: "getHoursBefore",
      value: function getHoursBefore(end, hours) {
        this.params['end_date'] = formatDate(end);
        this.params['range'] = hours;
        return this.get();
      }
    }, {
      key: "getDateRange",
      value: function getDateRange(start, end) {
        this.params['begin_date'] = formatDate(start);
        this.params['end_date'] = formatDate(end);
        return this.get();
      }
    }, {
      key: "get",
      value: function get() {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          var url = _this.constructUrl();
          xhr.open('GET', url);
          xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
              var json = JSON.parse(xhr.response);
              if (json['error']) {
                reject(json['error']);
              } else {
                var data = self.parseResponse(json);
                data['parameters'] = Object.assign({}, self.params);
                resolve(data);
              }
            } else {
              reject(xhr);
            }
          };
          xhr.onerror = function () {
            reject(xhr);
          };
          xhr.send();
        });
      }
    }, {
      key: "parseResponse",
      value: function parseResponse(data) {
        return data;
      }
    }, {
      key: "constructUrl",
      value: function constructUrl() {
        var params = this.params;
        return TidesAndCurrentsApi.url + '?' + Object.keys(params).map(function (key) {
          return key + '=' + encodeURIComponent(params[key]);
        }).join('&');
      }
    }, {
      key: "parseTime",
      value: function parseTime(s) {
        //2019-06-20 03:30
        //2019-06-22T23:58:22+00:00
        return toTime(s.replace(' ', 'T') + ':00+00:00');
      }
    }, {
      key: "parseFloatValue",
      value: function parseFloatValue(value, units) {
        return toValueUnits(parseFloat(value), units);
      }
    }]);
  }();

  /** The API end point */
  TidesAndCurrentsApi.url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

  var Datums = /*#__PURE__*/function (_TidesAndCurrentsApi) {
    function Datums(stationId) {
      _classCallCheck(this, Datums);
      return _callSuper(this, Datums, [stationId, DataProduct.datums, undefined, undefined, Units.metric]);
    }
    _inherits(Datums, _TidesAndCurrentsApi);
    return _createClass(Datums, [{
      key: "parseResponse",
      value: function parseResponse(data) {
        var datums = [],
          self = this;
        data['datums'].forEach(function (d) {
          datums.push({
            'name': d['n'],
            'value': self.parseFloatValue(d['v'], 'm')
          });
        });
        return datums;
      }
    }]);
  }(TidesAndCurrentsApi);

  var Predictions = /*#__PURE__*/function (_TidesAndCurrentsApi) {
    function Predictions(stationId, datum) {
      _classCallCheck(this, Predictions);
      if (!datum) {
        datum = Datum.STND;
      }
      return _callSuper(this, Predictions, [stationId, DataProduct.predictions, datum, Interval.hilo, Units.metric]);
    }
    _inherits(Predictions, _TidesAndCurrentsApi);
    return _createClass(Predictions, [{
      key: "parseResponse",
      value: function parseResponse(data) {
        var predictions = [],
          self = this;
        data['predictions'].forEach(function (d) {
          predictions.push({
            'time': self.parseTime(d['t']),
            'value': self.parseFloatValue(d['v'], 'm'),
            'type': d['type']
          });
        });
        return predictions;
      }
    }]);
  }(TidesAndCurrentsApi);

  var Wind = /*#__PURE__*/function (_TidesAndCurrentsApi) {
    function Wind(stationId, interval) {
      _classCallCheck(this, Wind);
      return _callSuper(this, Wind, [stationId, DataProduct.wind, undefined, interval, Units.metric]);
    }
    _inherits(Wind, _TidesAndCurrentsApi);
    return _createClass(Wind, [{
      key: "parseResponse",
      value: function parseResponse(data) {
        return data;
      }
    }]);
  }(TidesAndCurrentsApi);

  var TidesAndCurrents = {};
  TidesAndCurrents.api = {};
  TidesAndCurrents.api.format = Format;
  TidesAndCurrents.api.datum = Datum;
  TidesAndCurrents.api.product = DataProduct;
  TidesAndCurrents.api.units = Units;
  TidesAndCurrents.api.interval = Interval;
  TidesAndCurrents.stations = stations;
  TidesAndCurrents.stations.findClosest = findClosestStation;
  TidesAndCurrents.products = {};
  TidesAndCurrents.products.predictions = function (stationId, datum) {
    return new Predictions(stationId, datum);
  };
  TidesAndCurrents.products.datums = function (stationId) {
    return new Datums(stationId);
  };
  TidesAndCurrents.products.wind = function (stationId, interval) {
    return new Wind(stationId, interval);
  };

  exports.LatLon = LatLon;
  exports.MarineAreaCodes = MarineAreaCodes;
  exports.RegionCodes = RegionCodes;
  exports.StateAreaCodes = StateAreaCodes;
  exports.TidesAndCurrents = TidesAndCurrents;
  exports.Time = Time;
  exports.Weather = Weather;
  exports.XY = XY;
  exports.latLon = toLatLon;
  exports.time = toTime;
  exports.xy = toXY;

}));
//# sourceMappingURL=noaa.js.map
