/* @preserve
 * NOAA 1.0.0+master.c123adb, a JS library for https://www.weather.gov/documentation/services-web-api.
 * (c) 2019-2020 Jiri Richter
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NOAA = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
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
      } // @property lat: Number
      // Latitude in degrees


      this.lat = +lat; // @property lng: Number
      // Longitude in degrees

      this.lon = +lon;
    }

    _createClass(LatLon, [{
      key: "toString",
      value: function toString() {
        return "".concat(this.lat, ",").concat(this.lon);
      }
    }]);

    return LatLon;
  }(); // @factory NOAA.latLon(latitude: Number, longitude: Number, altitude?: Number): LatLon
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var moment = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
       module.exports = factory() ;
  }(commonjsGlobal, (function () {
      var hookCallback;

      function hooks() {
          return hookCallback.apply(null, arguments);
      }

      // This is done to register the method called with moment()
      // without creating circular dependencies.
      function setHookCallback(callback) {
          hookCallback = callback;
      }

      function isArray(input) {
          return (
              input instanceof Array ||
              Object.prototype.toString.call(input) === '[object Array]'
          );
      }

      function isObject(input) {
          // IE8 will treat undefined and null as object if it wasn't for
          // input != null
          return (
              input != null &&
              Object.prototype.toString.call(input) === '[object Object]'
          );
      }

      function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
      }

      function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
              return Object.getOwnPropertyNames(obj).length === 0;
          } else {
              var k;
              for (k in obj) {
                  if (hasOwnProp(obj, k)) {
                      return false;
                  }
              }
              return true;
          }
      }

      function isUndefined(input) {
          return input === void 0;
      }

      function isNumber(input) {
          return (
              typeof input === 'number' ||
              Object.prototype.toString.call(input) === '[object Number]'
          );
      }

      function isDate(input) {
          return (
              input instanceof Date ||
              Object.prototype.toString.call(input) === '[object Date]'
          );
      }

      function map(arr, fn) {
          var res = [],
              i;
          for (i = 0; i < arr.length; ++i) {
              res.push(fn(arr[i], i));
          }
          return res;
      }

      function extend(a, b) {
          for (var i in b) {
              if (hasOwnProp(b, i)) {
                  a[i] = b[i];
              }
          }

          if (hasOwnProp(b, 'toString')) {
              a.toString = b.toString;
          }

          if (hasOwnProp(b, 'valueOf')) {
              a.valueOf = b.valueOf;
          }

          return a;
      }

      function createUTC(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, true).utc();
      }

      function defaultParsingFlags() {
          // We need to deep clone this object.
          return {
              empty: false,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: false,
              invalidEra: null,
              invalidMonth: null,
              invalidFormat: false,
              userInvalidated: false,
              iso: false,
              parsedDateParts: [],
              era: null,
              meridiem: null,
              rfc2822: false,
              weekdayMismatch: false,
          };
      }

      function getParsingFlags(m) {
          if (m._pf == null) {
              m._pf = defaultParsingFlags();
          }
          return m._pf;
      }

      var some;
      if (Array.prototype.some) {
          some = Array.prototype.some;
      } else {
          some = function (fun) {
              var t = Object(this),
                  len = t.length >>> 0,
                  i;

              for (i = 0; i < len; i++) {
                  if (i in t && fun.call(this, t[i], i, t)) {
                      return true;
                  }
              }

              return false;
          };
      }

      function isValid(m) {
          if (m._isValid == null) {
              var flags = getParsingFlags(m),
                  parsedParts = some.call(flags.parsedDateParts, function (i) {
                      return i != null;
                  }),
                  isNowValid =
                      !isNaN(m._d.getTime()) &&
                      flags.overflow < 0 &&
                      !flags.empty &&
                      !flags.invalidEra &&
                      !flags.invalidMonth &&
                      !flags.invalidWeekday &&
                      !flags.weekdayMismatch &&
                      !flags.nullInput &&
                      !flags.invalidFormat &&
                      !flags.userInvalidated &&
                      (!flags.meridiem || (flags.meridiem && parsedParts));

              if (m._strict) {
                  isNowValid =
                      isNowValid &&
                      flags.charsLeftOver === 0 &&
                      flags.unusedTokens.length === 0 &&
                      flags.bigHour === undefined;
              }

              if (Object.isFrozen == null || !Object.isFrozen(m)) {
                  m._isValid = isNowValid;
              } else {
                  return isNowValid;
              }
          }
          return m._isValid;
      }

      function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
              extend(getParsingFlags(m), flags);
          } else {
              getParsingFlags(m).userInvalidated = true;
          }

          return m;
      }

      // Plugins that add properties should also add the key here (null value),
      // so we can properly clone ourselves.
      var momentProperties = (hooks.momentProperties = []),
          updateInProgress = false;

      function copyConfig(to, from) {
          var i, prop, val;

          if (!isUndefined(from._isAMomentObject)) {
              to._isAMomentObject = from._isAMomentObject;
          }
          if (!isUndefined(from._i)) {
              to._i = from._i;
          }
          if (!isUndefined(from._f)) {
              to._f = from._f;
          }
          if (!isUndefined(from._l)) {
              to._l = from._l;
          }
          if (!isUndefined(from._strict)) {
              to._strict = from._strict;
          }
          if (!isUndefined(from._tzm)) {
              to._tzm = from._tzm;
          }
          if (!isUndefined(from._isUTC)) {
              to._isUTC = from._isUTC;
          }
          if (!isUndefined(from._offset)) {
              to._offset = from._offset;
          }
          if (!isUndefined(from._pf)) {
              to._pf = getParsingFlags(from);
          }
          if (!isUndefined(from._locale)) {
              to._locale = from._locale;
          }

          if (momentProperties.length > 0) {
              for (i = 0; i < momentProperties.length; i++) {
                  prop = momentProperties[i];
                  val = from[prop];
                  if (!isUndefined(val)) {
                      to[prop] = val;
                  }
              }
          }

          return to;
      }

      // Moment prototype object
      function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (!this.isValid()) {
              this._d = new Date(NaN);
          }
          // Prevent infinite loop in case updateOffset creates new moment
          // objects.
          if (updateInProgress === false) {
              updateInProgress = true;
              hooks.updateOffset(this);
              updateInProgress = false;
          }
      }

      function isMoment(obj) {
          return (
              obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
          );
      }

      function warn(msg) {
          if (
              hooks.suppressDeprecationWarnings === false &&
              typeof console !== 'undefined' &&
              console.warn
          ) {
              console.warn('Deprecation warning: ' + msg);
          }
      }

      function deprecate(msg, fn) {
          var firstTime = true;

          return extend(function () {
              if (hooks.deprecationHandler != null) {
                  hooks.deprecationHandler(null, msg);
              }
              if (firstTime) {
                  var args = [],
                      arg,
                      i,
                      key;
                  for (i = 0; i < arguments.length; i++) {
                      arg = '';
                      if (typeof arguments[i] === 'object') {
                          arg += '\n[' + i + '] ';
                          for (key in arguments[0]) {
                              if (hasOwnProp(arguments[0], key)) {
                                  arg += key + ': ' + arguments[0][key] + ', ';
                              }
                          }
                          arg = arg.slice(0, -2); // Remove trailing comma and space
                      } else {
                          arg = arguments[i];
                      }
                      args.push(arg);
                  }
                  warn(
                      msg +
                          '\nArguments: ' +
                          Array.prototype.slice.call(args).join('') +
                          '\n' +
                          new Error().stack
                  );
                  firstTime = false;
              }
              return fn.apply(this, arguments);
          }, fn);
      }

      var deprecations = {};

      function deprecateSimple(name, msg) {
          if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
              warn(msg);
              deprecations[name] = true;
          }
      }

      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;

      function isFunction(input) {
          return (
              (typeof Function !== 'undefined' && input instanceof Function) ||
              Object.prototype.toString.call(input) === '[object Function]'
          );
      }

      function set(config) {
          var prop, i;
          for (i in config) {
              if (hasOwnProp(config, i)) {
                  prop = config[i];
                  if (isFunction(prop)) {
                      this[i] = prop;
                  } else {
                      this['_' + i] = prop;
                  }
              }
          }
          this._config = config;
          // Lenient ordinal parsing accepts just a number in addition to
          // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
          // TODO: Remove "ordinalParse" fallback in next major release.
          this._dayOfMonthOrdinalParseLenient = new RegExp(
              (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                  '|' +
                  /\d{1,2}/.source
          );
      }

      function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig),
              prop;
          for (prop in childConfig) {
              if (hasOwnProp(childConfig, prop)) {
                  if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                      res[prop] = {};
                      extend(res[prop], parentConfig[prop]);
                      extend(res[prop], childConfig[prop]);
                  } else if (childConfig[prop] != null) {
                      res[prop] = childConfig[prop];
                  } else {
                      delete res[prop];
                  }
              }
          }
          for (prop in parentConfig) {
              if (
                  hasOwnProp(parentConfig, prop) &&
                  !hasOwnProp(childConfig, prop) &&
                  isObject(parentConfig[prop])
              ) {
                  // make sure changes to properties don't modify parent config
                  res[prop] = extend({}, res[prop]);
              }
          }
          return res;
      }

      function Locale(config) {
          if (config != null) {
              this.set(config);
          }
      }

      var keys;

      if (Object.keys) {
          keys = Object.keys;
      } else {
          keys = function (obj) {
              var i,
                  res = [];
              for (i in obj) {
                  if (hasOwnProp(obj, i)) {
                      res.push(i);
                  }
              }
              return res;
          };
      }

      var defaultCalendar = {
          sameDay: '[Today at] LT',
          nextDay: '[Tomorrow at] LT',
          nextWeek: 'dddd [at] LT',
          lastDay: '[Yesterday at] LT',
          lastWeek: '[Last] dddd [at] LT',
          sameElse: 'L',
      };

      function calendar(key, mom, now) {
          var output = this._calendar[key] || this._calendar['sameElse'];
          return isFunction(output) ? output.call(mom, now) : output;
      }

      function zeroFill(number, targetLength, forceSign) {
          var absNumber = '' + Math.abs(number),
              zerosToFill = targetLength - absNumber.length,
              sign = number >= 0;
          return (
              (sign ? (forceSign ? '+' : '') : '-') +
              Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
              absNumber
          );
      }

      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
          localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
          formatFunctions = {},
          formatTokenFunctions = {};

      // token:    'M'
      // padded:   ['MM', 2]
      // ordinal:  'Mo'
      // callback: function () { this.month() + 1 }
      function addFormatToken(token, padded, ordinal, callback) {
          var func = callback;
          if (typeof callback === 'string') {
              func = function () {
                  return this[callback]();
              };
          }
          if (token) {
              formatTokenFunctions[token] = func;
          }
          if (padded) {
              formatTokenFunctions[padded[0]] = function () {
                  return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
              };
          }
          if (ordinal) {
              formatTokenFunctions[ordinal] = function () {
                  return this.localeData().ordinal(
                      func.apply(this, arguments),
                      token
                  );
              };
          }
      }

      function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
              return input.replace(/^\[|\]$/g, '');
          }
          return input.replace(/\\/g, '');
      }

      function makeFormatFunction(format) {
          var array = format.match(formattingTokens),
              i,
              length;

          for (i = 0, length = array.length; i < length; i++) {
              if (formatTokenFunctions[array[i]]) {
                  array[i] = formatTokenFunctions[array[i]];
              } else {
                  array[i] = removeFormattingTokens(array[i]);
              }
          }

          return function (mom) {
              var output = '',
                  i;
              for (i = 0; i < length; i++) {
                  output += isFunction(array[i])
                      ? array[i].call(mom, format)
                      : array[i];
              }
              return output;
          };
      }

      // format date using native date object
      function formatMoment(m, format) {
          if (!m.isValid()) {
              return m.localeData().invalidDate();
          }

          format = expandFormat(format, m.localeData());
          formatFunctions[format] =
              formatFunctions[format] || makeFormatFunction(format);

          return formatFunctions[format](m);
      }

      function expandFormat(format, locale) {
          var i = 5;

          function replaceLongDateFormatTokens(input) {
              return locale.longDateFormat(input) || input;
          }

          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format)) {
              format = format.replace(
                  localFormattingTokens,
                  replaceLongDateFormatTokens
              );
              localFormattingTokens.lastIndex = 0;
              i -= 1;
          }

          return format;
      }

      var defaultLongDateFormat = {
          LTS: 'h:mm:ss A',
          LT: 'h:mm A',
          L: 'MM/DD/YYYY',
          LL: 'MMMM D, YYYY',
          LLL: 'MMMM D, YYYY h:mm A',
          LLLL: 'dddd, MMMM D, YYYY h:mm A',
      };

      function longDateFormat(key) {
          var format = this._longDateFormat[key],
              formatUpper = this._longDateFormat[key.toUpperCase()];

          if (format || !formatUpper) {
              return format;
          }

          this._longDateFormat[key] = formatUpper
              .match(formattingTokens)
              .map(function (tok) {
                  if (
                      tok === 'MMMM' ||
                      tok === 'MM' ||
                      tok === 'DD' ||
                      tok === 'dddd'
                  ) {
                      return tok.slice(1);
                  }
                  return tok;
              })
              .join('');

          return this._longDateFormat[key];
      }

      var defaultInvalidDate = 'Invalid date';

      function invalidDate() {
          return this._invalidDate;
      }

      var defaultOrdinal = '%d',
          defaultDayOfMonthOrdinalParse = /\d{1,2}/;

      function ordinal(number) {
          return this._ordinal.replace('%d', number);
      }

      var defaultRelativeTime = {
          future: 'in %s',
          past: '%s ago',
          s: 'a few seconds',
          ss: '%d seconds',
          m: 'a minute',
          mm: '%d minutes',
          h: 'an hour',
          hh: '%d hours',
          d: 'a day',
          dd: '%d days',
          w: 'a week',
          ww: '%d weeks',
          M: 'a month',
          MM: '%d months',
          y: 'a year',
          yy: '%d years',
      };

      function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction(output)
              ? output(number, withoutSuffix, string, isFuture)
              : output.replace(/%d/i, number);
      }

      function pastFuture(diff, output) {
          var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
          return isFunction(format) ? format(output) : format.replace(/%s/i, output);
      }

      var aliases = {};

      function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
      }

      function normalizeUnits(units) {
          return typeof units === 'string'
              ? aliases[units] || aliases[units.toLowerCase()]
              : undefined;
      }

      function normalizeObjectUnits(inputObject) {
          var normalizedInput = {},
              normalizedProp,
              prop;

          for (prop in inputObject) {
              if (hasOwnProp(inputObject, prop)) {
                  normalizedProp = normalizeUnits(prop);
                  if (normalizedProp) {
                      normalizedInput[normalizedProp] = inputObject[prop];
                  }
              }
          }

          return normalizedInput;
      }

      var priorities = {};

      function addUnitPriority(unit, priority) {
          priorities[unit] = priority;
      }

      function getPrioritizedUnits(unitsObj) {
          var units = [],
              u;
          for (u in unitsObj) {
              if (hasOwnProp(unitsObj, u)) {
                  units.push({ unit: u, priority: priorities[u] });
              }
          }
          units.sort(function (a, b) {
              return a.priority - b.priority;
          });
          return units;
      }

      function isLeapYear(year) {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      }

      function absFloor(number) {
          if (number < 0) {
              // -0 -> 0
              return Math.ceil(number) || 0;
          } else {
              return Math.floor(number);
          }
      }

      function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion,
              value = 0;

          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
              value = absFloor(coercedNumber);
          }

          return value;
      }

      function makeGetSet(unit, keepTime) {
          return function (value) {
              if (value != null) {
                  set$1(this, unit, value);
                  hooks.updateOffset(this, keepTime);
                  return this;
              } else {
                  return get(this, unit);
              }
          };
      }

      function get(mom, unit) {
          return mom.isValid()
              ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
              : NaN;
      }

      function set$1(mom, unit, value) {
          if (mom.isValid() && !isNaN(value)) {
              if (
                  unit === 'FullYear' &&
                  isLeapYear(mom.year()) &&
                  mom.month() === 1 &&
                  mom.date() === 29
              ) {
                  value = toInt(value);
                  mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                      value,
                      mom.month(),
                      daysInMonth(value, mom.month())
                  );
              } else {
                  mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
              }
          }
      }

      // MOMENTS

      function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
              return this[units]();
          }
          return this;
      }

      function stringSet(units, value) {
          if (typeof units === 'object') {
              units = normalizeObjectUnits(units);
              var prioritized = getPrioritizedUnits(units),
                  i;
              for (i = 0; i < prioritized.length; i++) {
                  this[prioritized[i].unit](units[prioritized[i].unit]);
              }
          } else {
              units = normalizeUnits(units);
              if (isFunction(this[units])) {
                  return this[units](value);
              }
          }
          return this;
      }

      var match1 = /\d/, //       0 - 9
          match2 = /\d\d/, //      00 - 99
          match3 = /\d{3}/, //     000 - 999
          match4 = /\d{4}/, //    0000 - 9999
          match6 = /[+-]?\d{6}/, // -999999 - 999999
          match1to2 = /\d\d?/, //       0 - 99
          match3to4 = /\d\d\d\d?/, //     999 - 9999
          match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
          match1to3 = /\d{1,3}/, //       0 - 999
          match1to4 = /\d{1,4}/, //       0 - 9999
          match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
          matchUnsigned = /\d+/, //       0 - inf
          matchSigned = /[+-]?\d+/, //    -inf - inf
          matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
          matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
          matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
          // any word (or two) characters or numbers including two/three word month in arabic.
          // includes scottish gaelic two word and hyphenated months
          matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
          regexes;

      regexes = {};

      function addRegexToken(token, regex, strictRegex) {
          regexes[token] = isFunction(regex)
              ? regex
              : function (isStrict, localeData) {
                    return isStrict && strictRegex ? strictRegex : regex;
                };
      }

      function getParseRegexForToken(token, config) {
          if (!hasOwnProp(regexes, token)) {
              return new RegExp(unescapeFormat(token));
          }

          return regexes[token](config._strict, config._locale);
      }

      // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      function unescapeFormat(s) {
          return regexEscape(
              s
                  .replace('\\', '')
                  .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                      matched,
                      p1,
                      p2,
                      p3,
                      p4
                  ) {
                      return p1 || p2 || p3 || p4;
                  })
          );
      }

      function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      var tokens = {};

      function addParseToken(token, callback) {
          var i,
              func = callback;
          if (typeof token === 'string') {
              token = [token];
          }
          if (isNumber(callback)) {
              func = function (input, array) {
                  array[callback] = toInt(input);
              };
          }
          for (i = 0; i < token.length; i++) {
              tokens[token[i]] = func;
          }
      }

      function addWeekParseToken(token, callback) {
          addParseToken(token, function (input, array, config, token) {
              config._w = config._w || {};
              callback(input, config._w, config, token);
          });
      }

      function addTimeToArrayFromToken(token, input, config) {
          if (input != null && hasOwnProp(tokens, token)) {
              tokens[token](input, config._a, config, token);
          }
      }

      var YEAR = 0,
          MONTH = 1,
          DATE = 2,
          HOUR = 3,
          MINUTE = 4,
          SECOND = 5,
          MILLISECOND = 6,
          WEEK = 7,
          WEEKDAY = 8;

      function mod(n, x) {
          return ((n % x) + x) % x;
      }

      var indexOf;

      if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
      } else {
          indexOf = function (o) {
              // I know
              var i;
              for (i = 0; i < this.length; ++i) {
                  if (this[i] === o) {
                      return i;
                  }
              }
              return -1;
          };
      }

      function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
              return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1
              ? isLeapYear(year)
                  ? 29
                  : 28
              : 31 - ((modMonth % 7) % 2);
      }

      // FORMATTING

      addFormatToken('M', ['MM', 2], 'Mo', function () {
          return this.month() + 1;
      });

      addFormatToken('MMM', 0, 0, function (format) {
          return this.localeData().monthsShort(this, format);
      });

      addFormatToken('MMMM', 0, 0, function (format) {
          return this.localeData().months(this, format);
      });

      // ALIASES

      addUnitAlias('month', 'M');

      // PRIORITY

      addUnitPriority('month', 8);

      // PARSING

      addRegexToken('M', match1to2);
      addRegexToken('MM', match1to2, match2);
      addRegexToken('MMM', function (isStrict, locale) {
          return locale.monthsShortRegex(isStrict);
      });
      addRegexToken('MMMM', function (isStrict, locale) {
          return locale.monthsRegex(isStrict);
      });

      addParseToken(['M', 'MM'], function (input, array) {
          array[MONTH] = toInt(input) - 1;
      });

      addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
          var month = config._locale.monthsParse(input, token, config._strict);
          // if we didn't find a month name, mark the date as invalid.
          if (month != null) {
              array[MONTH] = month;
          } else {
              getParsingFlags(config).invalidMonth = input;
          }
      });

      // LOCALES

      var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
              '_'
          ),
          defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
              '_'
          ),
          MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
          defaultMonthsShortRegex = matchWord,
          defaultMonthsRegex = matchWord;

      function localeMonths(m, format) {
          if (!m) {
              return isArray(this._months)
                  ? this._months
                  : this._months['standalone'];
          }
          return isArray(this._months)
              ? this._months[m.month()]
              : this._months[
                    (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                        ? 'format'
                        : 'standalone'
                ][m.month()];
      }

      function localeMonthsShort(m, format) {
          if (!m) {
              return isArray(this._monthsShort)
                  ? this._monthsShort
                  : this._monthsShort['standalone'];
          }
          return isArray(this._monthsShort)
              ? this._monthsShort[m.month()]
              : this._monthsShort[
                    MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
                ][m.month()];
      }

      function handleStrictParse(monthName, format, strict) {
          var i,
              ii,
              mom,
              llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
              // this is not used
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
              for (i = 0; i < 12; ++i) {
                  mom = createUTC([2000, i]);
                  this._shortMonthsParse[i] = this.monthsShort(
                      mom,
                      ''
                  ).toLocaleLowerCase();
                  this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
              }
          }

          if (strict) {
              if (format === 'MMM') {
                  ii = indexOf.call(this._shortMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._longMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              }
          } else {
              if (format === 'MMM') {
                  ii = indexOf.call(this._shortMonthsParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._longMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._longMonthsParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._shortMonthsParse, llc);
                  return ii !== -1 ? ii : null;
              }
          }
      }

      function localeMonthsParse(monthName, format, strict) {
          var i, mom, regex;

          if (this._monthsParseExact) {
              return handleStrictParse.call(this, monthName, format, strict);
          }

          if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
          }

          // TODO: add sorting
          // Sorting makes sure if one month (or abbr) is a prefix of another
          // see sorting in computeMonthsParse
          for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, i]);
              if (strict && !this._longMonthsParse[i]) {
                  this._longMonthsParse[i] = new RegExp(
                      '^' + this.months(mom, '').replace('.', '') + '$',
                      'i'
                  );
                  this._shortMonthsParse[i] = new RegExp(
                      '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                      'i'
                  );
              }
              if (!strict && !this._monthsParse[i]) {
                  regex =
                      '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                  this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
              }
              // test the regex
              if (
                  strict &&
                  format === 'MMMM' &&
                  this._longMonthsParse[i].test(monthName)
              ) {
                  return i;
              } else if (
                  strict &&
                  format === 'MMM' &&
                  this._shortMonthsParse[i].test(monthName)
              ) {
                  return i;
              } else if (!strict && this._monthsParse[i].test(monthName)) {
                  return i;
              }
          }
      }

      // MOMENTS

      function setMonth(mom, value) {
          var dayOfMonth;

          if (!mom.isValid()) {
              // No op
              return mom;
          }

          if (typeof value === 'string') {
              if (/^\d+$/.test(value)) {
                  value = toInt(value);
              } else {
                  value = mom.localeData().monthsParse(value);
                  // TODO: Another silent failure?
                  if (!isNumber(value)) {
                      return mom;
                  }
              }
          }

          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
          return mom;
      }

      function getSetMonth(value) {
          if (value != null) {
              setMonth(this, value);
              hooks.updateOffset(this, true);
              return this;
          } else {
              return get(this, 'Month');
          }
      }

      function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
      }

      function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
              if (!hasOwnProp(this, '_monthsRegex')) {
                  computeMonthsParse.call(this);
              }
              if (isStrict) {
                  return this._monthsShortStrictRegex;
              } else {
                  return this._monthsShortRegex;
              }
          } else {
              if (!hasOwnProp(this, '_monthsShortRegex')) {
                  this._monthsShortRegex = defaultMonthsShortRegex;
              }
              return this._monthsShortStrictRegex && isStrict
                  ? this._monthsShortStrictRegex
                  : this._monthsShortRegex;
          }
      }

      function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
              if (!hasOwnProp(this, '_monthsRegex')) {
                  computeMonthsParse.call(this);
              }
              if (isStrict) {
                  return this._monthsStrictRegex;
              } else {
                  return this._monthsRegex;
              }
          } else {
              if (!hasOwnProp(this, '_monthsRegex')) {
                  this._monthsRegex = defaultMonthsRegex;
              }
              return this._monthsStrictRegex && isStrict
                  ? this._monthsStrictRegex
                  : this._monthsRegex;
          }
      }

      function computeMonthsParse() {
          function cmpLenRev(a, b) {
              return b.length - a.length;
          }

          var shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom;
          for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, i]);
              shortPieces.push(this.monthsShort(mom, ''));
              longPieces.push(this.months(mom, ''));
              mixedPieces.push(this.months(mom, ''));
              mixedPieces.push(this.monthsShort(mom, ''));
          }
          // Sorting makes sure if one month (or abbr) is a prefix of another it
          // will match the longer piece.
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
              shortPieces[i] = regexEscape(shortPieces[i]);
              longPieces[i] = regexEscape(longPieces[i]);
          }
          for (i = 0; i < 24; i++) {
              mixedPieces[i] = regexEscape(mixedPieces[i]);
          }

          this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp(
              '^(' + longPieces.join('|') + ')',
              'i'
          );
          this._monthsShortStrictRegex = new RegExp(
              '^(' + shortPieces.join('|') + ')',
              'i'
          );
      }

      // FORMATTING

      addFormatToken('Y', 0, 0, function () {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : '+' + y;
      });

      addFormatToken(0, ['YY', 2], 0, function () {
          return this.year() % 100;
      });

      addFormatToken(0, ['YYYY', 4], 0, 'year');
      addFormatToken(0, ['YYYYY', 5], 0, 'year');
      addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

      // ALIASES

      addUnitAlias('year', 'y');

      // PRIORITIES

      addUnitPriority('year', 1);

      // PARSING

      addRegexToken('Y', matchSigned);
      addRegexToken('YY', match1to2, match2);
      addRegexToken('YYYY', match1to4, match4);
      addRegexToken('YYYYY', match1to6, match6);
      addRegexToken('YYYYYY', match1to6, match6);

      addParseToken(['YYYYY', 'YYYYYY'], YEAR);
      addParseToken('YYYY', function (input, array) {
          array[YEAR] =
              input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken('YY', function (input, array) {
          array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken('Y', function (input, array) {
          array[YEAR] = parseInt(input, 10);
      });

      // HELPERS

      function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
      }

      // HOOKS

      hooks.parseTwoDigitYear = function (input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
      };

      // MOMENTS

      var getSetYear = makeGetSet('FullYear', true);

      function getIsLeapYear() {
          return isLeapYear(this.year());
      }

      function createDate(y, m, d, h, M, s, ms) {
          // can't just apply() to create a date:
          // https://stackoverflow.com/q/181348
          var date;
          // the date constructor remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              date = new Date(y + 400, m, d, h, M, s, ms);
              if (isFinite(date.getFullYear())) {
                  date.setFullYear(y);
              }
          } else {
              date = new Date(y, m, d, h, M, s, ms);
          }

          return date;
      }

      function createUTCDate(y) {
          var date, args;
          // the Date.UTC function remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              args = Array.prototype.slice.call(arguments);
              // preserve leap years using a full 400 year cycle, then reset
              args[0] = y + 400;
              date = new Date(Date.UTC.apply(null, args));
              if (isFinite(date.getUTCFullYear())) {
                  date.setUTCFullYear(y);
              }
          } else {
              date = new Date(Date.UTC.apply(null, arguments));
          }

          return date;
      }

      // start-of-first-week - start-of-year
      function firstWeekOffset(year, dow, doy) {
          var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
              fwd = 7 + dow - doy,
              // first-week day local weekday -- which local weekday is fwd
              fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

          return -fwdlw + fwd - 1;
      }

      // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7,
              weekOffset = firstWeekOffset(year, dow, doy),
              dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
              resYear,
              resDayOfYear;

          if (dayOfYear <= 0) {
              resYear = year - 1;
              resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
              resYear = year + 1;
              resDayOfYear = dayOfYear - daysInYear(year);
          } else {
              resYear = year;
              resDayOfYear = dayOfYear;
          }

          return {
              year: resYear,
              dayOfYear: resDayOfYear,
          };
      }

      function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy),
              week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
              resWeek,
              resYear;

          if (week < 1) {
              resYear = mom.year() - 1;
              resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
              resWeek = week - weeksInYear(mom.year(), dow, doy);
              resYear = mom.year() + 1;
          } else {
              resYear = mom.year();
              resWeek = week;
          }

          return {
              week: resWeek,
              year: resYear,
          };
      }

      function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy),
              weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }

      // FORMATTING

      addFormatToken('w', ['ww', 2], 'wo', 'week');
      addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

      // ALIASES

      addUnitAlias('week', 'w');
      addUnitAlias('isoWeek', 'W');

      // PRIORITIES

      addUnitPriority('week', 5);
      addUnitPriority('isoWeek', 5);

      // PARSING

      addRegexToken('w', match1to2);
      addRegexToken('ww', match1to2, match2);
      addRegexToken('W', match1to2);
      addRegexToken('WW', match1to2, match2);

      addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
          input,
          week,
          config,
          token
      ) {
          week[token.substr(0, 1)] = toInt(input);
      });

      // HELPERS

      // LOCALES

      function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }

      var defaultLocaleWeek = {
          dow: 0, // Sunday is the first day of the week.
          doy: 6, // The week that contains Jan 6th is the first week of the year.
      };

      function localeFirstDayOfWeek() {
          return this._week.dow;
      }

      function localeFirstDayOfYear() {
          return this._week.doy;
      }

      // MOMENTS

      function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, 'd');
      }

      function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, 'd');
      }

      // FORMATTING

      addFormatToken('d', 0, 'do', 'day');

      addFormatToken('dd', 0, 0, function (format) {
          return this.localeData().weekdaysMin(this, format);
      });

      addFormatToken('ddd', 0, 0, function (format) {
          return this.localeData().weekdaysShort(this, format);
      });

      addFormatToken('dddd', 0, 0, function (format) {
          return this.localeData().weekdays(this, format);
      });

      addFormatToken('e', 0, 0, 'weekday');
      addFormatToken('E', 0, 0, 'isoWeekday');

      // ALIASES

      addUnitAlias('day', 'd');
      addUnitAlias('weekday', 'e');
      addUnitAlias('isoWeekday', 'E');

      // PRIORITY
      addUnitPriority('day', 11);
      addUnitPriority('weekday', 11);
      addUnitPriority('isoWeekday', 11);

      // PARSING

      addRegexToken('d', match1to2);
      addRegexToken('e', match1to2);
      addRegexToken('E', match1to2);
      addRegexToken('dd', function (isStrict, locale) {
          return locale.weekdaysMinRegex(isStrict);
      });
      addRegexToken('ddd', function (isStrict, locale) {
          return locale.weekdaysShortRegex(isStrict);
      });
      addRegexToken('dddd', function (isStrict, locale) {
          return locale.weekdaysRegex(isStrict);
      });

      addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
          var weekday = config._locale.weekdaysParse(input, token, config._strict);
          // if we didn't get a weekday name, mark the date as invalid
          if (weekday != null) {
              week.d = weekday;
          } else {
              getParsingFlags(config).invalidWeekday = input;
          }
      });

      addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
          week[token] = toInt(input);
      });

      // HELPERS

      function parseWeekday(input, locale) {
          if (typeof input !== 'string') {
              return input;
          }

          if (!isNaN(input)) {
              return parseInt(input, 10);
          }

          input = locale.weekdaysParse(input);
          if (typeof input === 'number') {
              return input;
          }

          return null;
      }

      function parseIsoWeekday(input, locale) {
          if (typeof input === 'string') {
              return locale.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
      }

      // LOCALES
      function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
      }

      var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
              '_'
          ),
          defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
          defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
          defaultWeekdaysRegex = matchWord,
          defaultWeekdaysShortRegex = matchWord,
          defaultWeekdaysMinRegex = matchWord;

      function localeWeekdays(m, format) {
          var weekdays = isArray(this._weekdays)
              ? this._weekdays
              : this._weekdays[
                    m && m !== true && this._weekdays.isFormat.test(format)
                        ? 'format'
                        : 'standalone'
                ];
          return m === true
              ? shiftWeekdays(weekdays, this._week.dow)
              : m
              ? weekdays[m.day()]
              : weekdays;
      }

      function localeWeekdaysShort(m) {
          return m === true
              ? shiftWeekdays(this._weekdaysShort, this._week.dow)
              : m
              ? this._weekdaysShort[m.day()]
              : this._weekdaysShort;
      }

      function localeWeekdaysMin(m) {
          return m === true
              ? shiftWeekdays(this._weekdaysMin, this._week.dow)
              : m
              ? this._weekdaysMin[m.day()]
              : this._weekdaysMin;
      }

      function handleStrictParse$1(weekdayName, format, strict) {
          var i,
              ii,
              mom,
              llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._minWeekdaysParse = [];

              for (i = 0; i < 7; ++i) {
                  mom = createUTC([2000, 1]).day(i);
                  this._minWeekdaysParse[i] = this.weekdaysMin(
                      mom,
                      ''
                  ).toLocaleLowerCase();
                  this._shortWeekdaysParse[i] = this.weekdaysShort(
                      mom,
                      ''
                  ).toLocaleLowerCase();
                  this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
              }
          }

          if (strict) {
              if (format === 'dddd') {
                  ii = indexOf.call(this._weekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else if (format === 'ddd') {
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              }
          } else {
              if (format === 'dddd') {
                  ii = indexOf.call(this._weekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else if (format === 'ddd') {
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._weekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              } else {
                  ii = indexOf.call(this._minWeekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._weekdaysParse, llc);
                  if (ii !== -1) {
                      return ii;
                  }
                  ii = indexOf.call(this._shortWeekdaysParse, llc);
                  return ii !== -1 ? ii : null;
              }
          }
      }

      function localeWeekdaysParse(weekdayName, format, strict) {
          var i, mom, regex;

          if (this._weekdaysParseExact) {
              return handleStrictParse$1.call(this, weekdayName, format, strict);
          }

          if (!this._weekdaysParse) {
              this._weekdaysParse = [];
              this._minWeekdaysParse = [];
              this._shortWeekdaysParse = [];
              this._fullWeekdaysParse = [];
          }

          for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already

              mom = createUTC([2000, 1]).day(i);
              if (strict && !this._fullWeekdaysParse[i]) {
                  this._fullWeekdaysParse[i] = new RegExp(
                      '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                      'i'
                  );
                  this._shortWeekdaysParse[i] = new RegExp(
                      '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                      'i'
                  );
                  this._minWeekdaysParse[i] = new RegExp(
                      '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                      'i'
                  );
              }
              if (!this._weekdaysParse[i]) {
                  regex =
                      '^' +
                      this.weekdays(mom, '') +
                      '|^' +
                      this.weekdaysShort(mom, '') +
                      '|^' +
                      this.weekdaysMin(mom, '');
                  this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
              }
              // test the regex
              if (
                  strict &&
                  format === 'dddd' &&
                  this._fullWeekdaysParse[i].test(weekdayName)
              ) {
                  return i;
              } else if (
                  strict &&
                  format === 'ddd' &&
                  this._shortWeekdaysParse[i].test(weekdayName)
              ) {
                  return i;
              } else if (
                  strict &&
                  format === 'dd' &&
                  this._minWeekdaysParse[i].test(weekdayName)
              ) {
                  return i;
              } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                  return i;
              }
          }
      }

      // MOMENTS

      function getSetDayOfWeek(input) {
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
              input = parseWeekday(input, this.localeData());
              return this.add(input - day, 'd');
          } else {
              return day;
          }
      }

      function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, 'd');
      }

      function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }

          // behaves the same as moment#day except
          // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
          // as a setter, sunday should belong to the previous week.

          if (input != null) {
              var weekday = parseIsoWeekday(input, this.localeData());
              return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
              return this.day() || 7;
          }
      }

      function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                  return this._weekdaysStrictRegex;
              } else {
                  return this._weekdaysRegex;
              }
          } else {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  this._weekdaysRegex = defaultWeekdaysRegex;
              }
              return this._weekdaysStrictRegex && isStrict
                  ? this._weekdaysStrictRegex
                  : this._weekdaysRegex;
          }
      }

      function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                  return this._weekdaysShortStrictRegex;
              } else {
                  return this._weekdaysShortRegex;
              }
          } else {
              if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                  this._weekdaysShortRegex = defaultWeekdaysShortRegex;
              }
              return this._weekdaysShortStrictRegex && isStrict
                  ? this._weekdaysShortStrictRegex
                  : this._weekdaysShortRegex;
          }
      }

      function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
              if (!hasOwnProp(this, '_weekdaysRegex')) {
                  computeWeekdaysParse.call(this);
              }
              if (isStrict) {
                  return this._weekdaysMinStrictRegex;
              } else {
                  return this._weekdaysMinRegex;
              }
          } else {
              if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                  this._weekdaysMinRegex = defaultWeekdaysMinRegex;
              }
              return this._weekdaysMinStrictRegex && isStrict
                  ? this._weekdaysMinStrictRegex
                  : this._weekdaysMinRegex;
          }
      }

      function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
              return b.length - a.length;
          }

          var minPieces = [],
              shortPieces = [],
              longPieces = [],
              mixedPieces = [],
              i,
              mom,
              minp,
              shortp,
              longp;
          for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already
              mom = createUTC([2000, 1]).day(i);
              minp = regexEscape(this.weekdaysMin(mom, ''));
              shortp = regexEscape(this.weekdaysShort(mom, ''));
              longp = regexEscape(this.weekdays(mom, ''));
              minPieces.push(minp);
              shortPieces.push(shortp);
              longPieces.push(longp);
              mixedPieces.push(minp);
              mixedPieces.push(shortp);
              mixedPieces.push(longp);
          }
          // Sorting makes sure if one weekday (or abbr) is a prefix of another it
          // will match the longer piece.
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);

          this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;

          this._weekdaysStrictRegex = new RegExp(
              '^(' + longPieces.join('|') + ')',
              'i'
          );
          this._weekdaysShortStrictRegex = new RegExp(
              '^(' + shortPieces.join('|') + ')',
              'i'
          );
          this._weekdaysMinStrictRegex = new RegExp(
              '^(' + minPieces.join('|') + ')',
              'i'
          );
      }

      // FORMATTING

      function hFormat() {
          return this.hours() % 12 || 12;
      }

      function kFormat() {
          return this.hours() || 24;
      }

      addFormatToken('H', ['HH', 2], 0, 'hour');
      addFormatToken('h', ['hh', 2], 0, hFormat);
      addFormatToken('k', ['kk', 2], 0, kFormat);

      addFormatToken('hmm', 0, 0, function () {
          return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });

      addFormatToken('hmmss', 0, 0, function () {
          return (
              '' +
              hFormat.apply(this) +
              zeroFill(this.minutes(), 2) +
              zeroFill(this.seconds(), 2)
          );
      });

      addFormatToken('Hmm', 0, 0, function () {
          return '' + this.hours() + zeroFill(this.minutes(), 2);
      });

      addFormatToken('Hmmss', 0, 0, function () {
          return (
              '' +
              this.hours() +
              zeroFill(this.minutes(), 2) +
              zeroFill(this.seconds(), 2)
          );
      });

      function meridiem(token, lowercase) {
          addFormatToken(token, 0, 0, function () {
              return this.localeData().meridiem(
                  this.hours(),
                  this.minutes(),
                  lowercase
              );
          });
      }

      meridiem('a', true);
      meridiem('A', false);

      // ALIASES

      addUnitAlias('hour', 'h');

      // PRIORITY
      addUnitPriority('hour', 13);

      // PARSING

      function matchMeridiem(isStrict, locale) {
          return locale._meridiemParse;
      }

      addRegexToken('a', matchMeridiem);
      addRegexToken('A', matchMeridiem);
      addRegexToken('H', match1to2);
      addRegexToken('h', match1to2);
      addRegexToken('k', match1to2);
      addRegexToken('HH', match1to2, match2);
      addRegexToken('hh', match1to2, match2);
      addRegexToken('kk', match1to2, match2);

      addRegexToken('hmm', match3to4);
      addRegexToken('hmmss', match5to6);
      addRegexToken('Hmm', match3to4);
      addRegexToken('Hmmss', match5to6);

      addParseToken(['H', 'HH'], HOUR);
      addParseToken(['k', 'kk'], function (input, array, config) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(['a', 'A'], function (input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
      });
      addParseToken(['h', 'hh'], function (input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
      });
      addParseToken('hmm', function (input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
      });
      addParseToken('hmmss', function (input, array, config) {
          var pos1 = input.length - 4,
              pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
      });
      addParseToken('Hmm', function (input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken('Hmmss', function (input, array, config) {
          var pos1 = input.length - 4,
              pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
      });

      // LOCALES

      function localeIsPM(input) {
          // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
          // Using charAt should be more compatible.
          return (input + '').toLowerCase().charAt(0) === 'p';
      }

      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
          // Setting the hour should keep the time, because the user explicitly
          // specified which hour they want. So trying to maintain the same hour (in
          // a new timezone) makes sense. Adding/subtracting hours does not follow
          // this rule.
          getSetHour = makeGetSet('Hours', true);

      function localeMeridiem(hours, minutes, isLower) {
          if (hours > 11) {
              return isLower ? 'pm' : 'PM';
          } else {
              return isLower ? 'am' : 'AM';
          }
      }

      var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,

          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,

          week: defaultLocaleWeek,

          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,

          meridiemParse: defaultLocaleMeridiemParse,
      };

      // internal storage for locale config files
      var locales = {},
          localeFamilies = {},
          globalLocale;

      function commonPrefix(arr1, arr2) {
          var i,
              minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
              if (arr1[i] !== arr2[i]) {
                  return i;
              }
          }
          return minl;
      }

      function normalizeLocale(key) {
          return key ? key.toLowerCase().replace('_', '-') : key;
      }

      // pick the locale from the array
      // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
      // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
      function chooseLocale(names) {
          var i = 0,
              j,
              next,
              locale,
              split;

          while (i < names.length) {
              split = normalizeLocale(names[i]).split('-');
              j = split.length;
              next = normalizeLocale(names[i + 1]);
              next = next ? next.split('-') : null;
              while (j > 0) {
                  locale = loadLocale(split.slice(0, j).join('-'));
                  if (locale) {
                      return locale;
                  }
                  if (
                      next &&
                      next.length >= j &&
                      commonPrefix(split, next) >= j - 1
                  ) {
                      //the next array item is better than a shallower substring of this one
                      break;
                  }
                  j--;
              }
              i++;
          }
          return globalLocale;
      }

      function loadLocale(name) {
          var oldLocale = null,
              aliasedRequire;
          // TODO: Find a better way to register and load all the locales in Node
          if (
              locales[name] === undefined &&
              'object' !== 'undefined' &&
              module &&
              module.exports
          ) {
              try {
                  oldLocale = globalLocale._abbr;
                  aliasedRequire = commonjsRequire;
                  aliasedRequire('./locale/' + name);
                  getSetGlobalLocale(oldLocale);
              } catch (e) {
                  // mark as not found to avoid repeating expensive file require call causing high CPU
                  // when trying to find en-US, en_US, en-us for every format call
                  locales[name] = null; // null means not found
              }
          }
          return locales[name];
      }

      // This function will load locale and then set the global locale.  If
      // no arguments are passed in, it will simply return the current global
      // locale key.
      function getSetGlobalLocale(key, values) {
          var data;
          if (key) {
              if (isUndefined(values)) {
                  data = getLocale(key);
              } else {
                  data = defineLocale(key, values);
              }

              if (data) {
                  // moment.duration._locale = moment._locale = data;
                  globalLocale = data;
              } else {
                  if (typeof console !== 'undefined' && console.warn) {
                      //warn user if arguments are passed but the locale could not be set
                      console.warn(
                          'Locale ' + key + ' not found. Did you forget to load it?'
                      );
                  }
              }
          }

          return globalLocale._abbr;
      }

      function defineLocale(name, config) {
          if (config !== null) {
              var locale,
                  parentConfig = baseConfig;
              config.abbr = name;
              if (locales[name] != null) {
                  deprecateSimple(
                      'defineLocaleOverride',
                      'use moment.updateLocale(localeName, config) to change ' +
                          'an existing locale. moment.defineLocale(localeName, ' +
                          'config) should only be used for creating a new locale ' +
                          'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                  );
                  parentConfig = locales[name]._config;
              } else if (config.parentLocale != null) {
                  if (locales[config.parentLocale] != null) {
                      parentConfig = locales[config.parentLocale]._config;
                  } else {
                      locale = loadLocale(config.parentLocale);
                      if (locale != null) {
                          parentConfig = locale._config;
                      } else {
                          if (!localeFamilies[config.parentLocale]) {
                              localeFamilies[config.parentLocale] = [];
                          }
                          localeFamilies[config.parentLocale].push({
                              name: name,
                              config: config,
                          });
                          return null;
                      }
                  }
              }
              locales[name] = new Locale(mergeConfigs(parentConfig, config));

              if (localeFamilies[name]) {
                  localeFamilies[name].forEach(function (x) {
                      defineLocale(x.name, x.config);
                  });
              }

              // backwards compat for now: also set the locale
              // make sure we set the locale AFTER all child locales have been
              // created, so we won't end up with the child locale set.
              getSetGlobalLocale(name);

              return locales[name];
          } else {
              // useful for testing
              delete locales[name];
              return null;
          }
      }

      function updateLocale(name, config) {
          if (config != null) {
              var locale,
                  tmpLocale,
                  parentConfig = baseConfig;

              if (locales[name] != null && locales[name].parentLocale != null) {
                  // Update existing child locale in-place to avoid memory-leaks
                  locales[name].set(mergeConfigs(locales[name]._config, config));
              } else {
                  // MERGE
                  tmpLocale = loadLocale(name);
                  if (tmpLocale != null) {
                      parentConfig = tmpLocale._config;
                  }
                  config = mergeConfigs(parentConfig, config);
                  if (tmpLocale == null) {
                      // updateLocale is called for creating a new locale
                      // Set abbr so it will have a name (getters return
                      // undefined otherwise).
                      config.abbr = name;
                  }
                  locale = new Locale(config);
                  locale.parentLocale = locales[name];
                  locales[name] = locale;
              }

              // backwards compat for now: also set the locale
              getSetGlobalLocale(name);
          } else {
              // pass null for config to unupdate, useful for tests
              if (locales[name] != null) {
                  if (locales[name].parentLocale != null) {
                      locales[name] = locales[name].parentLocale;
                      if (name === getSetGlobalLocale()) {
                          getSetGlobalLocale(name);
                      }
                  } else if (locales[name] != null) {
                      delete locales[name];
                  }
              }
          }
          return locales[name];
      }

      // returns locale data
      function getLocale(key) {
          var locale;

          if (key && key._locale && key._locale._abbr) {
              key = key._locale._abbr;
          }

          if (!key) {
              return globalLocale;
          }

          if (!isArray(key)) {
              //short-circuit everything else
              locale = loadLocale(key);
              if (locale) {
                  return locale;
              }
              key = [key];
          }

          return chooseLocale(key);
      }

      function listLocales() {
          return keys(locales);
      }

      function checkOverflow(m) {
          var overflow,
              a = m._a;

          if (a && getParsingFlags(m).overflow === -2) {
              overflow =
                  a[MONTH] < 0 || a[MONTH] > 11
                      ? MONTH
                      : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                      ? DATE
                      : a[HOUR] < 0 ||
                        a[HOUR] > 24 ||
                        (a[HOUR] === 24 &&
                            (a[MINUTE] !== 0 ||
                                a[SECOND] !== 0 ||
                                a[MILLISECOND] !== 0))
                      ? HOUR
                      : a[MINUTE] < 0 || a[MINUTE] > 59
                      ? MINUTE
                      : a[SECOND] < 0 || a[SECOND] > 59
                      ? SECOND
                      : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                      ? MILLISECOND
                      : -1;

              if (
                  getParsingFlags(m)._overflowDayOfYear &&
                  (overflow < YEAR || overflow > DATE)
              ) {
                  overflow = DATE;
              }
              if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                  overflow = WEEK;
              }
              if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                  overflow = WEEKDAY;
              }

              getParsingFlags(m).overflow = overflow;
          }

          return m;
      }

      // iso 8601 regex
      // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
          isoDates = [
              ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
              ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
              ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
              ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
              ['YYYY-DDD', /\d{4}-\d{3}/],
              ['YYYY-MM', /\d{4}-\d\d/, false],
              ['YYYYYYMMDD', /[+-]\d{10}/],
              ['YYYYMMDD', /\d{8}/],
              ['GGGG[W]WWE', /\d{4}W\d{3}/],
              ['GGGG[W]WW', /\d{4}W\d{2}/, false],
              ['YYYYDDD', /\d{7}/],
              ['YYYYMM', /\d{6}/, false],
              ['YYYY', /\d{4}/, false],
          ],
          // iso time formats and regexes
          isoTimes = [
              ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
              ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
              ['HH:mm:ss', /\d\d:\d\d:\d\d/],
              ['HH:mm', /\d\d:\d\d/],
              ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
              ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
              ['HHmmss', /\d\d\d\d\d\d/],
              ['HHmm', /\d\d\d\d/],
              ['HH', /\d\d/],
          ],
          aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
          // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
          rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
          obsOffsets = {
              UT: 0,
              GMT: 0,
              EDT: -4 * 60,
              EST: -5 * 60,
              CDT: -5 * 60,
              CST: -6 * 60,
              MDT: -6 * 60,
              MST: -7 * 60,
              PDT: -7 * 60,
              PST: -8 * 60,
          };

      // date from iso format
      function configFromISO(config) {
          var i,
              l,
              string = config._i,
              match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
              allowTime,
              dateFormat,
              timeFormat,
              tzFormat;

          if (match) {
              getParsingFlags(config).iso = true;

              for (i = 0, l = isoDates.length; i < l; i++) {
                  if (isoDates[i][1].exec(match[1])) {
                      dateFormat = isoDates[i][0];
                      allowTime = isoDates[i][2] !== false;
                      break;
                  }
              }
              if (dateFormat == null) {
                  config._isValid = false;
                  return;
              }
              if (match[3]) {
                  for (i = 0, l = isoTimes.length; i < l; i++) {
                      if (isoTimes[i][1].exec(match[3])) {
                          // match[2] should be 'T' or space
                          timeFormat = (match[2] || ' ') + isoTimes[i][0];
                          break;
                      }
                  }
                  if (timeFormat == null) {
                      config._isValid = false;
                      return;
                  }
              }
              if (!allowTime && timeFormat != null) {
                  config._isValid = false;
                  return;
              }
              if (match[4]) {
                  if (tzRegex.exec(match[4])) {
                      tzFormat = 'Z';
                  } else {
                      config._isValid = false;
                      return;
                  }
              }
              config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
              configFromStringAndFormat(config);
          } else {
              config._isValid = false;
          }
      }

      function extractFromRFC2822Strings(
          yearStr,
          monthStr,
          dayStr,
          hourStr,
          minuteStr,
          secondStr
      ) {
          var result = [
              untruncateYear(yearStr),
              defaultLocaleMonthsShort.indexOf(monthStr),
              parseInt(dayStr, 10),
              parseInt(hourStr, 10),
              parseInt(minuteStr, 10),
          ];

          if (secondStr) {
              result.push(parseInt(secondStr, 10));
          }

          return result;
      }

      function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
              return 2000 + year;
          } else if (year <= 999) {
              return 1900 + year;
          }
          return year;
      }

      function preprocessRFC2822(s) {
          // Remove comments and folding whitespace and replace multiple-spaces with a single space
          return s
              .replace(/\([^)]*\)|[\n\t]/g, ' ')
              .replace(/(\s\s+)/g, ' ')
              .replace(/^\s\s*/, '')
              .replace(/\s\s*$/, '');
      }

      function checkWeekday(weekdayStr, parsedInput, config) {
          if (weekdayStr) {
              // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
              var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                  weekdayActual = new Date(
                      parsedInput[0],
                      parsedInput[1],
                      parsedInput[2]
                  ).getDay();
              if (weekdayProvided !== weekdayActual) {
                  getParsingFlags(config).weekdayMismatch = true;
                  config._isValid = false;
                  return false;
              }
          }
          return true;
      }

      function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
              return obsOffsets[obsOffset];
          } else if (militaryOffset) {
              // the only allowed military tz is Z
              return 0;
          } else {
              var hm = parseInt(numOffset, 10),
                  m = hm % 100,
                  h = (hm - m) / 100;
              return h * 60 + m;
          }
      }

      // date and time from ref 2822 format
      function configFromRFC2822(config) {
          var match = rfc2822.exec(preprocessRFC2822(config._i)),
              parsedArray;
          if (match) {
              parsedArray = extractFromRFC2822Strings(
                  match[4],
                  match[3],
                  match[2],
                  match[5],
                  match[6],
                  match[7]
              );
              if (!checkWeekday(match[1], parsedArray, config)) {
                  return;
              }

              config._a = parsedArray;
              config._tzm = calculateOffset(match[8], match[9], match[10]);

              config._d = createUTCDate.apply(null, config._a);
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

              getParsingFlags(config).rfc2822 = true;
          } else {
              config._isValid = false;
          }
      }

      // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
      function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
              config._d = new Date(+matched[1]);
              return;
          }

          configFromISO(config);
          if (config._isValid === false) {
              delete config._isValid;
          } else {
              return;
          }

          configFromRFC2822(config);
          if (config._isValid === false) {
              delete config._isValid;
          } else {
              return;
          }

          if (config._strict) {
              config._isValid = false;
          } else {
              // Final attempt, use Input Fallback
              hooks.createFromInputFallback(config);
          }
      }

      hooks.createFromInputFallback = deprecate(
          'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
              'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
              'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
          function (config) {
              config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
          }
      );

      // Pick the first defined of two or three arguments.
      function defaults(a, b, c) {
          if (a != null) {
              return a;
          }
          if (b != null) {
              return b;
          }
          return c;
      }

      function currentDateArray(config) {
          // hooks is actually the exported moment object
          var nowValue = new Date(hooks.now());
          if (config._useUTC) {
              return [
                  nowValue.getUTCFullYear(),
                  nowValue.getUTCMonth(),
                  nowValue.getUTCDate(),
              ];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }

      // convert an array to a date.
      // the array should mirror the parameters below
      // note: all values past the year are optional and will default to the lowest possible value.
      // [year, month, day , hour, minute, second, millisecond]
      function configFromArray(config) {
          var i,
              date,
              input = [],
              currentDate,
              expectedWeekday,
              yearToUse;

          if (config._d) {
              return;
          }

          currentDate = currentDateArray(config);

          //compute day of the year from weeks and weekdays
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
              dayOfYearFromWeekInfo(config);
          }

          //if the day of the year is set, figure out what it is
          if (config._dayOfYear != null) {
              yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

              if (
                  config._dayOfYear > daysInYear(yearToUse) ||
                  config._dayOfYear === 0
              ) {
                  getParsingFlags(config)._overflowDayOfYear = true;
              }

              date = createUTCDate(yearToUse, 0, config._dayOfYear);
              config._a[MONTH] = date.getUTCMonth();
              config._a[DATE] = date.getUTCDate();
          }

          // Default to current date.
          // * if no year, month, day of month are given, default to today
          // * if day of month is given, default month and year
          // * if month is given, default only year
          // * if year is given, don't default anything
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
              config._a[i] = input[i] = currentDate[i];
          }

          // Zero out whatever was not defaulted, including time
          for (; i < 7; i++) {
              config._a[i] = input[i] =
                  config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
          }

          // Check for 24:00:00.000
          if (
              config._a[HOUR] === 24 &&
              config._a[MINUTE] === 0 &&
              config._a[SECOND] === 0 &&
              config._a[MILLISECOND] === 0
          ) {
              config._nextDay = true;
              config._a[HOUR] = 0;
          }

          config._d = (config._useUTC ? createUTCDate : createDate).apply(
              null,
              input
          );
          expectedWeekday = config._useUTC
              ? config._d.getUTCDay()
              : config._d.getDay();

          // Apply timezone offset from input. The actual utcOffset can be changed
          // with parseZone.
          if (config._tzm != null) {
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }

          if (config._nextDay) {
              config._a[HOUR] = 24;
          }

          // check for mismatching day of week
          if (
              config._w &&
              typeof config._w.d !== 'undefined' &&
              config._w.d !== expectedWeekday
          ) {
              getParsingFlags(config).weekdayMismatch = true;
          }
      }

      function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
              dow = 1;
              doy = 4;

              // TODO: We need to take the current isoWeekYear, but that depends on
              // how we interpret now (local, utc, fixed offset). So create
              // a now version of current config (take local/utc/offset flags, and
              // create now).
              weekYear = defaults(
                  w.GG,
                  config._a[YEAR],
                  weekOfYear(createLocal(), 1, 4).year
              );
              week = defaults(w.W, 1);
              weekday = defaults(w.E, 1);
              if (weekday < 1 || weekday > 7) {
                  weekdayOverflow = true;
              }
          } else {
              dow = config._locale._week.dow;
              doy = config._locale._week.doy;

              curWeek = weekOfYear(createLocal(), dow, doy);

              weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

              // Default to current week.
              week = defaults(w.w, curWeek.week);

              if (w.d != null) {
                  // weekday -- low day numbers are considered next week
                  weekday = w.d;
                  if (weekday < 0 || weekday > 6) {
                      weekdayOverflow = true;
                  }
              } else if (w.e != null) {
                  // local weekday -- counting starts from beginning of week
                  weekday = w.e + dow;
                  if (w.e < 0 || w.e > 6) {
                      weekdayOverflow = true;
                  }
              } else {
                  // default to beginning of week
                  weekday = dow;
              }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
              getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
              getParsingFlags(config)._overflowWeekday = true;
          } else {
              temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
              config._a[YEAR] = temp.year;
              config._dayOfYear = temp.dayOfYear;
          }
      }

      // constant that refers to the ISO standard
      hooks.ISO_8601 = function () {};

      // constant that refers to the RFC 2822 form
      hooks.RFC_2822 = function () {};

      // date from string and format string
      function configFromStringAndFormat(config) {
          // TODO: Move this to another part of the creation flow to prevent circular deps
          if (config._f === hooks.ISO_8601) {
              configFromISO(config);
              return;
          }
          if (config._f === hooks.RFC_2822) {
              configFromRFC2822(config);
              return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;

          // This array is used to make a Date, either with `new Date` or `Date.UTC`
          var string = '' + config._i,
              i,
              parsedInput,
              tokens,
              token,
              skipped,
              stringLength = string.length,
              totalParsedInputLength = 0,
              era;

          tokens =
              expandFormat(config._f, config._locale).match(formattingTokens) || [];

          for (i = 0; i < tokens.length; i++) {
              token = tokens[i];
              parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                  [])[0];
              if (parsedInput) {
                  skipped = string.substr(0, string.indexOf(parsedInput));
                  if (skipped.length > 0) {
                      getParsingFlags(config).unusedInput.push(skipped);
                  }
                  string = string.slice(
                      string.indexOf(parsedInput) + parsedInput.length
                  );
                  totalParsedInputLength += parsedInput.length;
              }
              // don't parse if it's not a known token
              if (formatTokenFunctions[token]) {
                  if (parsedInput) {
                      getParsingFlags(config).empty = false;
                  } else {
                      getParsingFlags(config).unusedTokens.push(token);
                  }
                  addTimeToArrayFromToken(token, parsedInput, config);
              } else if (config._strict && !parsedInput) {
                  getParsingFlags(config).unusedTokens.push(token);
              }
          }

          // add remaining unparsed input length to the string
          getParsingFlags(config).charsLeftOver =
              stringLength - totalParsedInputLength;
          if (string.length > 0) {
              getParsingFlags(config).unusedInput.push(string);
          }

          // clear _12h flag if hour is <= 12
          if (
              config._a[HOUR] <= 12 &&
              getParsingFlags(config).bigHour === true &&
              config._a[HOUR] > 0
          ) {
              getParsingFlags(config).bigHour = undefined;
          }

          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          // handle meridiem
          config._a[HOUR] = meridiemFixWrap(
              config._locale,
              config._a[HOUR],
              config._meridiem
          );

          // handle era
          era = getParsingFlags(config).era;
          if (era !== null) {
              config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
          }

          configFromArray(config);
          checkOverflow(config);
      }

      function meridiemFixWrap(locale, hour, meridiem) {
          var isPm;

          if (meridiem == null) {
              // nothing to do
              return hour;
          }
          if (locale.meridiemHour != null) {
              return locale.meridiemHour(hour, meridiem);
          } else if (locale.isPM != null) {
              // Fallback
              isPm = locale.isPM(meridiem);
              if (isPm && hour < 12) {
                  hour += 12;
              }
              if (!isPm && hour === 12) {
                  hour = 0;
              }
              return hour;
          } else {
              // this is not supposed to happen
              return hour;
          }
      }

      // date from string and array of format strings
      function configFromStringAndArray(config) {
          var tempConfig,
              bestMoment,
              scoreToBeat,
              i,
              currentScore,
              validFormatFound,
              bestFormatIsValid = false;

          if (config._f.length === 0) {
              getParsingFlags(config).invalidFormat = true;
              config._d = new Date(NaN);
              return;
          }

          for (i = 0; i < config._f.length; i++) {
              currentScore = 0;
              validFormatFound = false;
              tempConfig = copyConfig({}, config);
              if (config._useUTC != null) {
                  tempConfig._useUTC = config._useUTC;
              }
              tempConfig._f = config._f[i];
              configFromStringAndFormat(tempConfig);

              if (isValid(tempConfig)) {
                  validFormatFound = true;
              }

              // if there is any input that was not parsed add a penalty for that format
              currentScore += getParsingFlags(tempConfig).charsLeftOver;

              //or tokens
              currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

              getParsingFlags(tempConfig).score = currentScore;

              if (!bestFormatIsValid) {
                  if (
                      scoreToBeat == null ||
                      currentScore < scoreToBeat ||
                      validFormatFound
                  ) {
                      scoreToBeat = currentScore;
                      bestMoment = tempConfig;
                      if (validFormatFound) {
                          bestFormatIsValid = true;
                      }
                  }
              } else {
                  if (currentScore < scoreToBeat) {
                      scoreToBeat = currentScore;
                      bestMoment = tempConfig;
                  }
              }
          }

          extend(config, bestMoment || tempConfig);
      }

      function configFromObject(config) {
          if (config._d) {
              return;
          }

          var i = normalizeObjectUnits(config._i),
              dayOrDate = i.day === undefined ? i.date : i.day;
          config._a = map(
              [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
              function (obj) {
                  return obj && parseInt(obj, 10);
              }
          );

          configFromArray(config);
      }

      function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
              // Adding is smart enough around DST
              res.add(1, 'd');
              res._nextDay = undefined;
          }

          return res;
      }

      function prepareConfig(config) {
          var input = config._i,
              format = config._f;

          config._locale = config._locale || getLocale(config._l);

          if (input === null || (format === undefined && input === '')) {
              return createInvalid({ nullInput: true });
          }

          if (typeof input === 'string') {
              config._i = input = config._locale.preparse(input);
          }

          if (isMoment(input)) {
              return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
              config._d = input;
          } else if (isArray(format)) {
              configFromStringAndArray(config);
          } else if (format) {
              configFromStringAndFormat(config);
          } else {
              configFromInput(config);
          }

          if (!isValid(config)) {
              config._d = null;
          }

          return config;
      }

      function configFromInput(config) {
          var input = config._i;
          if (isUndefined(input)) {
              config._d = new Date(hooks.now());
          } else if (isDate(input)) {
              config._d = new Date(input.valueOf());
          } else if (typeof input === 'string') {
              configFromString(config);
          } else if (isArray(input)) {
              config._a = map(input.slice(0), function (obj) {
                  return parseInt(obj, 10);
              });
              configFromArray(config);
          } else if (isObject(input)) {
              configFromObject(config);
          } else if (isNumber(input)) {
              // from milliseconds
              config._d = new Date(input);
          } else {
              hooks.createFromInputFallback(config);
          }
      }

      function createLocalOrUTC(input, format, locale, strict, isUTC) {
          var c = {};

          if (format === true || format === false) {
              strict = format;
              format = undefined;
          }

          if (locale === true || locale === false) {
              strict = locale;
              locale = undefined;
          }

          if (
              (isObject(input) && isObjectEmpty(input)) ||
              (isArray(input) && input.length === 0)
          ) {
              input = undefined;
          }
          // object construction must be done this way.
          // https://github.com/moment/moment/issues/1423
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;

          return createFromConfig(c);
      }

      function createLocal(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, false);
      }

      var prototypeMin = deprecate(
              'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
              function () {
                  var other = createLocal.apply(null, arguments);
                  if (this.isValid() && other.isValid()) {
                      return other < this ? this : other;
                  } else {
                      return createInvalid();
                  }
              }
          ),
          prototypeMax = deprecate(
              'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
              function () {
                  var other = createLocal.apply(null, arguments);
                  if (this.isValid() && other.isValid()) {
                      return other > this ? this : other;
                  } else {
                      return createInvalid();
                  }
              }
          );

      // Pick a moment m from moments so that m[fn](other) is true for all
      // other. This relies on the function fn to be transitive.
      //
      // moments should either be an array of moment objects or an array, whose
      // first element is an array of moment objects.
      function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
              moments = moments[0];
          }
          if (!moments.length) {
              return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
              if (!moments[i].isValid() || moments[i][fn](res)) {
                  res = moments[i];
              }
          }
          return res;
      }

      // TODO: Use [].sort instead?
      function min() {
          var args = [].slice.call(arguments, 0);

          return pickBy('isBefore', args);
      }

      function max() {
          var args = [].slice.call(arguments, 0);

          return pickBy('isAfter', args);
      }

      var now = function () {
          return Date.now ? Date.now() : +new Date();
      };

      var ordering = [
          'year',
          'quarter',
          'month',
          'week',
          'day',
          'hour',
          'minute',
          'second',
          'millisecond',
      ];

      function isDurationValid(m) {
          var key,
              unitHasDecimal = false,
              i;
          for (key in m) {
              if (
                  hasOwnProp(m, key) &&
                  !(
                      indexOf.call(ordering, key) !== -1 &&
                      (m[key] == null || !isNaN(m[key]))
                  )
              ) {
                  return false;
              }
          }

          for (i = 0; i < ordering.length; ++i) {
              if (m[ordering[i]]) {
                  if (unitHasDecimal) {
                      return false; // only allow non-integers for smallest unit
                  }
                  if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                      unitHasDecimal = true;
                  }
              }
          }

          return true;
      }

      function isValid$1() {
          return this._isValid;
      }

      function createInvalid$1() {
          return createDuration(NaN);
      }

      function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration),
              years = normalizedInput.year || 0,
              quarters = normalizedInput.quarter || 0,
              months = normalizedInput.month || 0,
              weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
              days = normalizedInput.day || 0,
              hours = normalizedInput.hour || 0,
              minutes = normalizedInput.minute || 0,
              seconds = normalizedInput.second || 0,
              milliseconds = normalizedInput.millisecond || 0;

          this._isValid = isDurationValid(normalizedInput);

          // representation for dateAddRemove
          this._milliseconds =
              +milliseconds +
              seconds * 1e3 + // 1000
              minutes * 6e4 + // 1000 * 60
              hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
          // Because of dateAddRemove treats 24 hours as different from a
          // day when working around DST, we need to store them separately
          this._days = +days + weeks * 7;
          // It is impossible to translate months into days without knowing
          // which months you are are talking about, so we have to store
          // it separately.
          this._months = +months + quarters * 3 + years * 12;

          this._data = {};

          this._locale = getLocale();

          this._bubble();
      }

      function isDuration(obj) {
          return obj instanceof Duration;
      }

      function absRound(number) {
          if (number < 0) {
              return Math.round(-1 * number) * -1;
          } else {
              return Math.round(number);
          }
      }

      // compare two arrays, return the number of differences
      function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length),
              lengthDiff = Math.abs(array1.length - array2.length),
              diffs = 0,
              i;
          for (i = 0; i < len; i++) {
              if (
                  (dontConvert && array1[i] !== array2[i]) ||
                  (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
              ) {
                  diffs++;
              }
          }
          return diffs + lengthDiff;
      }

      // FORMATTING

      function offset(token, separator) {
          addFormatToken(token, 0, 0, function () {
              var offset = this.utcOffset(),
                  sign = '+';
              if (offset < 0) {
                  offset = -offset;
                  sign = '-';
              }
              return (
                  sign +
                  zeroFill(~~(offset / 60), 2) +
                  separator +
                  zeroFill(~~offset % 60, 2)
              );
          });
      }

      offset('Z', ':');
      offset('ZZ', '');

      // PARSING

      addRegexToken('Z', matchShortOffset);
      addRegexToken('ZZ', matchShortOffset);
      addParseToken(['Z', 'ZZ'], function (input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
      });

      // HELPERS

      // timezone chunker
      // '+10:00' > ['10',  '00']
      // '-1530'  > ['-15', '30']
      var chunkOffset = /([\+\-]|\d\d)/gi;

      function offsetFromString(matcher, string) {
          var matches = (string || '').match(matcher),
              chunk,
              parts,
              minutes;

          if (matches === null) {
              return null;
          }

          chunk = matches[matches.length - 1] || [];
          parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
          minutes = +(parts[1] * 60) + toInt(parts[2]);

          return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
      }

      // Return a moment from input, that is local/utc/zone equivalent to model.
      function cloneWithOffset(input, model) {
          var res, diff;
          if (model._isUTC) {
              res = model.clone();
              diff =
                  (isMoment(input) || isDate(input)
                      ? input.valueOf()
                      : createLocal(input).valueOf()) - res.valueOf();
              // Use low-level api, because this fn is low-level api.
              res._d.setTime(res._d.valueOf() + diff);
              hooks.updateOffset(res, false);
              return res;
          } else {
              return createLocal(input).local();
          }
      }

      function getDateOffset(m) {
          // On Firefox.24 Date#getTimezoneOffset returns a floating point.
          // https://github.com/moment/moment/pull/1871
          return -Math.round(m._d.getTimezoneOffset());
      }

      // HOOKS

      // This function will be called whenever a moment is mutated.
      // It is intended to keep the offset in sync with the timezone.
      hooks.updateOffset = function () {};

      // MOMENTS

      // keepLocalTime = true means only change the timezone, without
      // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
      // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
      // +0200, so we adjust the time as needed, to be valid.
      //
      // Keeping the time actually adds/subtracts (one hour)
      // from the actual represented time. That is why we call updateOffset
      // a second time. In case it wants us to change the offset again
      // _changeInProgress == true case, then we have to adjust, because
      // there is no such time in the given timezone.
      function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset = this._offset || 0,
              localAdjust;
          if (!this.isValid()) {
              return input != null ? this : NaN;
          }
          if (input != null) {
              if (typeof input === 'string') {
                  input = offsetFromString(matchShortOffset, input);
                  if (input === null) {
                      return this;
                  }
              } else if (Math.abs(input) < 16 && !keepMinutes) {
                  input = input * 60;
              }
              if (!this._isUTC && keepLocalTime) {
                  localAdjust = getDateOffset(this);
              }
              this._offset = input;
              this._isUTC = true;
              if (localAdjust != null) {
                  this.add(localAdjust, 'm');
              }
              if (offset !== input) {
                  if (!keepLocalTime || this._changeInProgress) {
                      addSubtract(
                          this,
                          createDuration(input - offset, 'm'),
                          1,
                          false
                      );
                  } else if (!this._changeInProgress) {
                      this._changeInProgress = true;
                      hooks.updateOffset(this, true);
                      this._changeInProgress = null;
                  }
              }
              return this;
          } else {
              return this._isUTC ? offset : getDateOffset(this);
          }
      }

      function getSetZone(input, keepLocalTime) {
          if (input != null) {
              if (typeof input !== 'string') {
                  input = -input;
              }

              this.utcOffset(input, keepLocalTime);

              return this;
          } else {
              return -this.utcOffset();
          }
      }

      function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
      }

      function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
              this.utcOffset(0, keepLocalTime);
              this._isUTC = false;

              if (keepLocalTime) {
                  this.subtract(getDateOffset(this), 'm');
              }
          }
          return this;
      }

      function setOffsetToParsedOffset() {
          if (this._tzm != null) {
              this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === 'string') {
              var tZone = offsetFromString(matchOffset, this._i);
              if (tZone != null) {
                  this.utcOffset(tZone);
              } else {
                  this.utcOffset(0, true);
              }
          }
          return this;
      }

      function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
              return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;

          return (this.utcOffset() - input) % 60 === 0;
      }

      function isDaylightSavingTime() {
          return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
          );
      }

      function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
              return this._isDSTShifted;
          }

          var c = {},
              other;

          copyConfig(c, this);
          c = prepareConfig(c);

          if (c._a) {
              other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
              this._isDSTShifted =
                  this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
              this._isDSTShifted = false;
          }

          return this._isDSTShifted;
      }

      function isLocal() {
          return this.isValid() ? !this._isUTC : false;
      }

      function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
      }

      function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }

      // ASP.NET json date format regex
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
          // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
          // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
          // and further modified to allow for strings containing both week and day
          isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

      function createDuration(input, key) {
          var duration = input,
              // matching against regexp is expensive, do it on demand
              match = null,
              sign,
              ret,
              diffRes;

          if (isDuration(input)) {
              duration = {
                  ms: input._milliseconds,
                  d: input._days,
                  M: input._months,
              };
          } else if (isNumber(input) || !isNaN(+input)) {
              duration = {};
              if (key) {
                  duration[key] = +input;
              } else {
                  duration.milliseconds = +input;
              }
          } else if ((match = aspNetRegex.exec(input))) {
              sign = match[1] === '-' ? -1 : 1;
              duration = {
                  y: 0,
                  d: toInt(match[DATE]) * sign,
                  h: toInt(match[HOUR]) * sign,
                  m: toInt(match[MINUTE]) * sign,
                  s: toInt(match[SECOND]) * sign,
                  ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
              };
          } else if ((match = isoRegex.exec(input))) {
              sign = match[1] === '-' ? -1 : 1;
              duration = {
                  y: parseIso(match[2], sign),
                  M: parseIso(match[3], sign),
                  w: parseIso(match[4], sign),
                  d: parseIso(match[5], sign),
                  h: parseIso(match[6], sign),
                  m: parseIso(match[7], sign),
                  s: parseIso(match[8], sign),
              };
          } else if (duration == null) {
              // checks for null or undefined
              duration = {};
          } else if (
              typeof duration === 'object' &&
              ('from' in duration || 'to' in duration)
          ) {
              diffRes = momentsDifference(
                  createLocal(duration.from),
                  createLocal(duration.to)
              );

              duration = {};
              duration.ms = diffRes.milliseconds;
              duration.M = diffRes.months;
          }

          ret = new Duration(duration);

          if (isDuration(input) && hasOwnProp(input, '_locale')) {
              ret._locale = input._locale;
          }

          if (isDuration(input) && hasOwnProp(input, '_isValid')) {
              ret._isValid = input._isValid;
          }

          return ret;
      }

      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;

      function parseIso(inp, sign) {
          // We'd normally use ~~inp for this, but unfortunately it also
          // converts floats to ints.
          // inp may be undefined, so careful calling replace on it.
          var res = inp && parseFloat(inp.replace(',', '.'));
          // apply sign while we're at it
          return (isNaN(res) ? 0 : res) * sign;
      }

      function positiveMomentsDifference(base, other) {
          var res = {};

          res.months =
              other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, 'M').isAfter(other)) {
              --res.months;
          }

          res.milliseconds = +other - +base.clone().add(res.months, 'M');

          return res;
      }

      function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
              return { milliseconds: 0, months: 0 };
          }

          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
              res = positiveMomentsDifference(base, other);
          } else {
              res = positiveMomentsDifference(other, base);
              res.milliseconds = -res.milliseconds;
              res.months = -res.months;
          }

          return res;
      }

      // TODO: remove 'name' arg after deprecation is removed
      function createAdder(direction, name) {
          return function (val, period) {
              var dur, tmp;
              //invert the arguments, but complain about it
              if (period !== null && !isNaN(+period)) {
                  deprecateSimple(
                      name,
                      'moment().' +
                          name +
                          '(period, number) is deprecated. Please use moment().' +
                          name +
                          '(number, period). ' +
                          'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                  );
                  tmp = val;
                  val = period;
                  period = tmp;
              }

              dur = createDuration(val, period);
              addSubtract(this, dur, direction);
              return this;
          };
      }

      function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
              days = absRound(duration._days),
              months = absRound(duration._months);

          if (!mom.isValid()) {
              // No op
              return;
          }

          updateOffset = updateOffset == null ? true : updateOffset;

          if (months) {
              setMonth(mom, get(mom, 'Month') + months * isAdding);
          }
          if (days) {
              set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
          }
          if (milliseconds) {
              mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
          }
          if (updateOffset) {
              hooks.updateOffset(mom, days || months);
          }
      }

      var add = createAdder(1, 'add'),
          subtract = createAdder(-1, 'subtract');

      function isString(input) {
          return typeof input === 'string' || input instanceof String;
      }

      // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
      function isMomentInput(input) {
          return (
              isMoment(input) ||
              isDate(input) ||
              isString(input) ||
              isNumber(input) ||
              isNumberOrStringArray(input) ||
              isMomentInputObject(input) ||
              input === null ||
              input === undefined
          );
      }

      function isMomentInputObject(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input),
              propertyTest = false,
              properties = [
                  'years',
                  'year',
                  'y',
                  'months',
                  'month',
                  'M',
                  'days',
                  'day',
                  'd',
                  'dates',
                  'date',
                  'D',
                  'hours',
                  'hour',
                  'h',
                  'minutes',
                  'minute',
                  'm',
                  'seconds',
                  'second',
                  's',
                  'milliseconds',
                  'millisecond',
                  'ms',
              ],
              i,
              property;

          for (i = 0; i < properties.length; i += 1) {
              property = properties[i];
              propertyTest = propertyTest || hasOwnProp(input, property);
          }

          return objectTest && propertyTest;
      }

      function isNumberOrStringArray(input) {
          var arrayTest = isArray(input),
              dataTypeTest = false;
          if (arrayTest) {
              dataTypeTest =
                  input.filter(function (item) {
                      return !isNumber(item) && isString(input);
                  }).length === 0;
          }
          return arrayTest && dataTypeTest;
      }

      function isCalendarSpec(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input),
              propertyTest = false,
              properties = [
                  'sameDay',
                  'nextDay',
                  'lastDay',
                  'nextWeek',
                  'lastWeek',
                  'sameElse',
              ],
              i,
              property;

          for (i = 0; i < properties.length; i += 1) {
              property = properties[i];
              propertyTest = propertyTest || hasOwnProp(input, property);
          }

          return objectTest && propertyTest;
      }

      function getCalendarFormat(myMoment, now) {
          var diff = myMoment.diff(now, 'days', true);
          return diff < -6
              ? 'sameElse'
              : diff < -1
              ? 'lastWeek'
              : diff < 0
              ? 'lastDay'
              : diff < 1
              ? 'sameDay'
              : diff < 2
              ? 'nextDay'
              : diff < 7
              ? 'nextWeek'
              : 'sameElse';
      }

      function calendar$1(time, formats) {
          // Support for single parameter, formats only overload to the calendar function
          if (arguments.length === 1) {
              if (!arguments[0]) {
                  time = undefined;
                  formats = undefined;
              } else if (isMomentInput(arguments[0])) {
                  time = arguments[0];
                  formats = undefined;
              } else if (isCalendarSpec(arguments[0])) {
                  formats = arguments[0];
                  time = undefined;
              }
          }
          // We want to compare the start of today, vs this.
          // Getting start-of-today depends on whether we're local/utc/offset or not.
          var now = time || createLocal(),
              sod = cloneWithOffset(now, this).startOf('day'),
              format = hooks.calendarFormat(this, sod) || 'sameElse',
              output =
                  formats &&
                  (isFunction(formats[format])
                      ? formats[format].call(this, now)
                      : formats[format]);

          return this.format(
              output || this.localeData().calendar(format, this, createLocal(now))
          );
      }

      function clone() {
          return new Moment(this);
      }

      function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
              return false;
          }
          units = normalizeUnits(units) || 'millisecond';
          if (units === 'millisecond') {
              return this.valueOf() > localInput.valueOf();
          } else {
              return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
      }

      function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
              return false;
          }
          units = normalizeUnits(units) || 'millisecond';
          if (units === 'millisecond') {
              return this.valueOf() < localInput.valueOf();
          } else {
              return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
      }

      function isBetween(from, to, units, inclusivity) {
          var localFrom = isMoment(from) ? from : createLocal(from),
              localTo = isMoment(to) ? to : createLocal(to);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
              return false;
          }
          inclusivity = inclusivity || '()';
          return (
              (inclusivity[0] === '('
                  ? this.isAfter(localFrom, units)
                  : !this.isBefore(localFrom, units)) &&
              (inclusivity[1] === ')'
                  ? this.isBefore(localTo, units)
                  : !this.isAfter(localTo, units))
          );
      }

      function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input),
              inputMs;
          if (!(this.isValid() && localInput.isValid())) {
              return false;
          }
          units = normalizeUnits(units) || 'millisecond';
          if (units === 'millisecond') {
              return this.valueOf() === localInput.valueOf();
          } else {
              inputMs = localInput.valueOf();
              return (
                  this.clone().startOf(units).valueOf() <= inputMs &&
                  inputMs <= this.clone().endOf(units).valueOf()
              );
          }
      }

      function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
      }

      function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
      }

      function diff(input, units, asFloat) {
          var that, zoneDelta, output;

          if (!this.isValid()) {
              return NaN;
          }

          that = cloneWithOffset(input, this);

          if (!that.isValid()) {
              return NaN;
          }

          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

          units = normalizeUnits(units);

          switch (units) {
              case 'year':
                  output = monthDiff(this, that) / 12;
                  break;
              case 'month':
                  output = monthDiff(this, that);
                  break;
              case 'quarter':
                  output = monthDiff(this, that) / 3;
                  break;
              case 'second':
                  output = (this - that) / 1e3;
                  break; // 1000
              case 'minute':
                  output = (this - that) / 6e4;
                  break; // 1000 * 60
              case 'hour':
                  output = (this - that) / 36e5;
                  break; // 1000 * 60 * 60
              case 'day':
                  output = (this - that - zoneDelta) / 864e5;
                  break; // 1000 * 60 * 60 * 24, negate dst
              case 'week':
                  output = (this - that - zoneDelta) / 6048e5;
                  break; // 1000 * 60 * 60 * 24 * 7, negate dst
              default:
                  output = this - that;
          }

          return asFloat ? output : absFloor(output);
      }

      function monthDiff(a, b) {
          if (a.date() < b.date()) {
              // end-of-month calculations work correct when the start month has more
              // days than the end month.
              return -monthDiff(b, a);
          }
          // difference in months
          var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
              // b is in (anchor - 1 month, anchor + 1 month)
              anchor = a.clone().add(wholeMonthDiff, 'months'),
              anchor2,
              adjust;

          if (b - anchor < 0) {
              anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
              // linear across the month
              adjust = (b - anchor) / (anchor - anchor2);
          } else {
              anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
              // linear across the month
              adjust = (b - anchor) / (anchor2 - anchor);
          }

          //check for negative zero, return zero if negative zero
          return -(wholeMonthDiff + adjust) || 0;
      }

      hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
      hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

      function toString() {
          return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      }

      function toISOString(keepOffset) {
          if (!this.isValid()) {
              return null;
          }
          var utc = keepOffset !== true,
              m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
              return formatMoment(
                  m,
                  utc
                      ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                      : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
              );
          }
          if (isFunction(Date.prototype.toISOString)) {
              // native implementation is ~50x faster, use it when we can
              if (utc) {
                  return this.toDate().toISOString();
              } else {
                  return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                      .toISOString()
                      .replace('Z', formatMoment(m, 'Z'));
              }
          }
          return formatMoment(
              m,
              utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
          );
      }

      /**
       * Return a human readable representation of a moment that can
       * also be evaluated to get a new moment which is the same
       *
       * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
       */
      function inspect() {
          if (!this.isValid()) {
              return 'moment.invalid(/* ' + this._i + ' */)';
          }
          var func = 'moment',
              zone = '',
              prefix,
              year,
              datetime,
              suffix;
          if (!this.isLocal()) {
              func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
              zone = 'Z';
          }
          prefix = '[' + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
          datetime = '-MM-DD[T]HH:mm:ss.SSS';
          suffix = zone + '[")]';

          return this.format(prefix + year + datetime + suffix);
      }

      function format(inputString) {
          if (!inputString) {
              inputString = this.isUtc()
                  ? hooks.defaultFormatUtc
                  : hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
      }

      function from(time, withoutSuffix) {
          if (
              this.isValid() &&
              ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
          ) {
              return createDuration({ to: this, from: time })
                  .locale(this.locale())
                  .humanize(!withoutSuffix);
          } else {
              return this.localeData().invalidDate();
          }
      }

      function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
      }

      function to(time, withoutSuffix) {
          if (
              this.isValid() &&
              ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
          ) {
              return createDuration({ from: this, to: time })
                  .locale(this.locale())
                  .humanize(!withoutSuffix);
          } else {
              return this.localeData().invalidDate();
          }
      }

      function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
      }

      // If passed a locale key, it will set the locale for this
      // instance.  Otherwise, it will return the locale configuration
      // variables for this instance.
      function locale(key) {
          var newLocaleData;

          if (key === undefined) {
              return this._locale._abbr;
          } else {
              newLocaleData = getLocale(key);
              if (newLocaleData != null) {
                  this._locale = newLocaleData;
              }
              return this;
          }
      }

      var lang = deprecate(
          'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
          function (key) {
              if (key === undefined) {
                  return this.localeData();
              } else {
                  return this.locale(key);
              }
          }
      );

      function localeData() {
          return this._locale;
      }

      var MS_PER_SECOND = 1000,
          MS_PER_MINUTE = 60 * MS_PER_SECOND,
          MS_PER_HOUR = 60 * MS_PER_MINUTE,
          MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

      // actual modulo - handles negative numbers (for dates before 1970):
      function mod$1(dividend, divisor) {
          return ((dividend % divisor) + divisor) % divisor;
      }

      function localStartOfDate(y, m, d) {
          // the date constructor remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
              return new Date(y, m, d).valueOf();
          }
      }

      function utcStartOfDate(y, m, d) {
          // Date.UTC remaps years 0-99 to 1900-1999
          if (y < 100 && y >= 0) {
              // preserve leap years using a full 400 year cycle, then reset
              return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
              return Date.UTC(y, m, d);
          }
      }

      function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === undefined || units === 'millisecond' || !this.isValid()) {
              return this;
          }

          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

          switch (units) {
              case 'year':
                  time = startOfDate(this.year(), 0, 1);
                  break;
              case 'quarter':
                  time = startOfDate(
                      this.year(),
                      this.month() - (this.month() % 3),
                      1
                  );
                  break;
              case 'month':
                  time = startOfDate(this.year(), this.month(), 1);
                  break;
              case 'week':
                  time = startOfDate(
                      this.year(),
                      this.month(),
                      this.date() - this.weekday()
                  );
                  break;
              case 'isoWeek':
                  time = startOfDate(
                      this.year(),
                      this.month(),
                      this.date() - (this.isoWeekday() - 1)
                  );
                  break;
              case 'day':
              case 'date':
                  time = startOfDate(this.year(), this.month(), this.date());
                  break;
              case 'hour':
                  time = this._d.valueOf();
                  time -= mod$1(
                      time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                      MS_PER_HOUR
                  );
                  break;
              case 'minute':
                  time = this._d.valueOf();
                  time -= mod$1(time, MS_PER_MINUTE);
                  break;
              case 'second':
                  time = this._d.valueOf();
                  time -= mod$1(time, MS_PER_SECOND);
                  break;
          }

          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
      }

      function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === undefined || units === 'millisecond' || !this.isValid()) {
              return this;
          }

          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

          switch (units) {
              case 'year':
                  time = startOfDate(this.year() + 1, 0, 1) - 1;
                  break;
              case 'quarter':
                  time =
                      startOfDate(
                          this.year(),
                          this.month() - (this.month() % 3) + 3,
                          1
                      ) - 1;
                  break;
              case 'month':
                  time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                  break;
              case 'week':
                  time =
                      startOfDate(
                          this.year(),
                          this.month(),
                          this.date() - this.weekday() + 7
                      ) - 1;
                  break;
              case 'isoWeek':
                  time =
                      startOfDate(
                          this.year(),
                          this.month(),
                          this.date() - (this.isoWeekday() - 1) + 7
                      ) - 1;
                  break;
              case 'day':
              case 'date':
                  time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                  break;
              case 'hour':
                  time = this._d.valueOf();
                  time +=
                      MS_PER_HOUR -
                      mod$1(
                          time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                          MS_PER_HOUR
                      ) -
                      1;
                  break;
              case 'minute':
                  time = this._d.valueOf();
                  time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                  break;
              case 'second':
                  time = this._d.valueOf();
                  time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                  break;
          }

          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
      }

      function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 60000;
      }

      function unix() {
          return Math.floor(this.valueOf() / 1000);
      }

      function toDate() {
          return new Date(this.valueOf());
      }

      function toArray() {
          var m = this;
          return [
              m.year(),
              m.month(),
              m.date(),
              m.hour(),
              m.minute(),
              m.second(),
              m.millisecond(),
          ];
      }

      function toObject() {
          var m = this;
          return {
              years: m.year(),
              months: m.month(),
              date: m.date(),
              hours: m.hours(),
              minutes: m.minutes(),
              seconds: m.seconds(),
              milliseconds: m.milliseconds(),
          };
      }

      function toJSON() {
          // new Date(NaN).toJSON() === null
          return this.isValid() ? this.toISOString() : null;
      }

      function isValid$2() {
          return isValid(this);
      }

      function parsingFlags() {
          return extend({}, getParsingFlags(this));
      }

      function invalidAt() {
          return getParsingFlags(this).overflow;
      }

      function creationData() {
          return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict,
          };
      }

      addFormatToken('N', 0, 0, 'eraAbbr');
      addFormatToken('NN', 0, 0, 'eraAbbr');
      addFormatToken('NNN', 0, 0, 'eraAbbr');
      addFormatToken('NNNN', 0, 0, 'eraName');
      addFormatToken('NNNNN', 0, 0, 'eraNarrow');

      addFormatToken('y', ['y', 1], 'yo', 'eraYear');
      addFormatToken('y', ['yy', 2], 0, 'eraYear');
      addFormatToken('y', ['yyy', 3], 0, 'eraYear');
      addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

      addRegexToken('N', matchEraAbbr);
      addRegexToken('NN', matchEraAbbr);
      addRegexToken('NNN', matchEraAbbr);
      addRegexToken('NNNN', matchEraName);
      addRegexToken('NNNNN', matchEraNarrow);

      addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
          input,
          array,
          config,
          token
      ) {
          var era = config._locale.erasParse(input, token, config._strict);
          if (era) {
              getParsingFlags(config).era = era;
          } else {
              getParsingFlags(config).invalidEra = input;
          }
      });

      addRegexToken('y', matchUnsigned);
      addRegexToken('yy', matchUnsigned);
      addRegexToken('yyy', matchUnsigned);
      addRegexToken('yyyy', matchUnsigned);
      addRegexToken('yo', matchEraYearOrdinal);

      addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
      addParseToken(['yo'], function (input, array, config, token) {
          var match;
          if (config._locale._eraYearOrdinalRegex) {
              match = input.match(config._locale._eraYearOrdinalRegex);
          }

          if (config._locale.eraYearOrdinalParse) {
              array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
          } else {
              array[YEAR] = parseInt(input, 10);
          }
      });

      function localeEras(m, format) {
          var i,
              l,
              date,
              eras = this._eras || getLocale('en')._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
              switch (typeof eras[i].since) {
                  case 'string':
                      // truncate time
                      date = hooks(eras[i].since).startOf('day');
                      eras[i].since = date.valueOf();
                      break;
              }

              switch (typeof eras[i].until) {
                  case 'undefined':
                      eras[i].until = +Infinity;
                      break;
                  case 'string':
                      // truncate time
                      date = hooks(eras[i].until).startOf('day').valueOf();
                      eras[i].until = date.valueOf();
                      break;
              }
          }
          return eras;
      }

      function localeErasParse(eraName, format, strict) {
          var i,
              l,
              eras = this.eras(),
              name,
              abbr,
              narrow;
          eraName = eraName.toUpperCase();

          for (i = 0, l = eras.length; i < l; ++i) {
              name = eras[i].name.toUpperCase();
              abbr = eras[i].abbr.toUpperCase();
              narrow = eras[i].narrow.toUpperCase();

              if (strict) {
                  switch (format) {
                      case 'N':
                      case 'NN':
                      case 'NNN':
                          if (abbr === eraName) {
                              return eras[i];
                          }
                          break;

                      case 'NNNN':
                          if (name === eraName) {
                              return eras[i];
                          }
                          break;

                      case 'NNNNN':
                          if (narrow === eraName) {
                              return eras[i];
                          }
                          break;
                  }
              } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                  return eras[i];
              }
          }
      }

      function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? +1 : -1;
          if (year === undefined) {
              return hooks(era.since).year();
          } else {
              return hooks(era.since).year() + (year - era.offset) * dir;
          }
      }

      function getEraName() {
          var i,
              l,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.clone().startOf('day').valueOf();

              if (eras[i].since <= val && val <= eras[i].until) {
                  return eras[i].name;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                  return eras[i].name;
              }
          }

          return '';
      }

      function getEraNarrow() {
          var i,
              l,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.clone().startOf('day').valueOf();

              if (eras[i].since <= val && val <= eras[i].until) {
                  return eras[i].narrow;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                  return eras[i].narrow;
              }
          }

          return '';
      }

      function getEraAbbr() {
          var i,
              l,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              // truncate time
              val = this.clone().startOf('day').valueOf();

              if (eras[i].since <= val && val <= eras[i].until) {
                  return eras[i].abbr;
              }
              if (eras[i].until <= val && val <= eras[i].since) {
                  return eras[i].abbr;
              }
          }

          return '';
      }

      function getEraYear() {
          var i,
              l,
              dir,
              val,
              eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
              dir = eras[i].since <= eras[i].until ? +1 : -1;

              // truncate time
              val = this.clone().startOf('day').valueOf();

              if (
                  (eras[i].since <= val && val <= eras[i].until) ||
                  (eras[i].until <= val && val <= eras[i].since)
              ) {
                  return (
                      (this.year() - hooks(eras[i].since).year()) * dir +
                      eras[i].offset
                  );
              }
          }

          return this.year();
      }

      function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, '_erasNameRegex')) {
              computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
      }

      function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, '_erasAbbrRegex')) {
              computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }

      function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, '_erasNarrowRegex')) {
              computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }

      function matchEraAbbr(isStrict, locale) {
          return locale.erasAbbrRegex(isStrict);
      }

      function matchEraName(isStrict, locale) {
          return locale.erasNameRegex(isStrict);
      }

      function matchEraNarrow(isStrict, locale) {
          return locale.erasNarrowRegex(isStrict);
      }

      function matchEraYearOrdinal(isStrict, locale) {
          return locale._eraYearOrdinalRegex || matchUnsigned;
      }

      function computeErasParse() {
          var abbrPieces = [],
              namePieces = [],
              narrowPieces = [],
              mixedPieces = [],
              i,
              l,
              eras = this.eras();

          for (i = 0, l = eras.length; i < l; ++i) {
              namePieces.push(regexEscape(eras[i].name));
              abbrPieces.push(regexEscape(eras[i].abbr));
              narrowPieces.push(regexEscape(eras[i].narrow));

              mixedPieces.push(regexEscape(eras[i].name));
              mixedPieces.push(regexEscape(eras[i].abbr));
              mixedPieces.push(regexEscape(eras[i].narrow));
          }

          this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
          this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
          this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
          this._erasNarrowRegex = new RegExp(
              '^(' + narrowPieces.join('|') + ')',
              'i'
          );
      }

      // FORMATTING

      addFormatToken(0, ['gg', 2], 0, function () {
          return this.weekYear() % 100;
      });

      addFormatToken(0, ['GG', 2], 0, function () {
          return this.isoWeekYear() % 100;
      });

      function addWeekYearFormatToken(token, getter) {
          addFormatToken(0, [token, token.length], 0, getter);
      }

      addWeekYearFormatToken('gggg', 'weekYear');
      addWeekYearFormatToken('ggggg', 'weekYear');
      addWeekYearFormatToken('GGGG', 'isoWeekYear');
      addWeekYearFormatToken('GGGGG', 'isoWeekYear');

      // ALIASES

      addUnitAlias('weekYear', 'gg');
      addUnitAlias('isoWeekYear', 'GG');

      // PRIORITY

      addUnitPriority('weekYear', 1);
      addUnitPriority('isoWeekYear', 1);

      // PARSING

      addRegexToken('G', matchSigned);
      addRegexToken('g', matchSigned);
      addRegexToken('GG', match1to2, match2);
      addRegexToken('gg', match1to2, match2);
      addRegexToken('GGGG', match1to4, match4);
      addRegexToken('gggg', match1to4, match4);
      addRegexToken('GGGGG', match1to6, match6);
      addRegexToken('ggggg', match1to6, match6);

      addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
          input,
          week,
          config,
          token
      ) {
          week[token.substr(0, 2)] = toInt(input);
      });

      addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
          week[token] = hooks.parseTwoDigitYear(input);
      });

      // MOMENTS

      function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(
              this,
              input,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy
          );
      }

      function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(
              this,
              input,
              this.isoWeek(),
              this.isoWeekday(),
              1,
              4
          );
      }

      function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
      }

      function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
      }

      function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }

      function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }

      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
              return weekOfYear(this, dow, doy).year;
          } else {
              weeksTarget = weeksInYear(input, dow, doy);
              if (week > weeksTarget) {
                  week = weeksTarget;
              }
              return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
      }

      function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
              date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
      }

      // FORMATTING

      addFormatToken('Q', 0, 'Qo', 'quarter');

      // ALIASES

      addUnitAlias('quarter', 'Q');

      // PRIORITY

      addUnitPriority('quarter', 7);

      // PARSING

      addRegexToken('Q', match1);
      addParseToken('Q', function (input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
      });

      // MOMENTS

      function getSetQuarter(input) {
          return input == null
              ? Math.ceil((this.month() + 1) / 3)
              : this.month((input - 1) * 3 + (this.month() % 3));
      }

      // FORMATTING

      addFormatToken('D', ['DD', 2], 'Do', 'date');

      // ALIASES

      addUnitAlias('date', 'D');

      // PRIORITY
      addUnitPriority('date', 9);

      // PARSING

      addRegexToken('D', match1to2);
      addRegexToken('DD', match1to2, match2);
      addRegexToken('Do', function (isStrict, locale) {
          // TODO: Remove "ordinalParse" fallback in next major release.
          return isStrict
              ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
              : locale._dayOfMonthOrdinalParseLenient;
      });

      addParseToken(['D', 'DD'], DATE);
      addParseToken('Do', function (input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
      });

      // MOMENTS

      var getSetDayOfMonth = makeGetSet('Date', true);

      // FORMATTING

      addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

      // ALIASES

      addUnitAlias('dayOfYear', 'DDD');

      // PRIORITY
      addUnitPriority('dayOfYear', 4);

      // PARSING

      addRegexToken('DDD', match1to3);
      addRegexToken('DDDD', match3);
      addParseToken(['DDD', 'DDDD'], function (input, array, config) {
          config._dayOfYear = toInt(input);
      });

      // HELPERS

      // MOMENTS

      function getSetDayOfYear(input) {
          var dayOfYear =
              Math.round(
                  (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
              ) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
      }

      // FORMATTING

      addFormatToken('m', ['mm', 2], 0, 'minute');

      // ALIASES

      addUnitAlias('minute', 'm');

      // PRIORITY

      addUnitPriority('minute', 14);

      // PARSING

      addRegexToken('m', match1to2);
      addRegexToken('mm', match1to2, match2);
      addParseToken(['m', 'mm'], MINUTE);

      // MOMENTS

      var getSetMinute = makeGetSet('Minutes', false);

      // FORMATTING

      addFormatToken('s', ['ss', 2], 0, 'second');

      // ALIASES

      addUnitAlias('second', 's');

      // PRIORITY

      addUnitPriority('second', 15);

      // PARSING

      addRegexToken('s', match1to2);
      addRegexToken('ss', match1to2, match2);
      addParseToken(['s', 'ss'], SECOND);

      // MOMENTS

      var getSetSecond = makeGetSet('Seconds', false);

      // FORMATTING

      addFormatToken('S', 0, 0, function () {
          return ~~(this.millisecond() / 100);
      });

      addFormatToken(0, ['SS', 2], 0, function () {
          return ~~(this.millisecond() / 10);
      });

      addFormatToken(0, ['SSS', 3], 0, 'millisecond');
      addFormatToken(0, ['SSSS', 4], 0, function () {
          return this.millisecond() * 10;
      });
      addFormatToken(0, ['SSSSS', 5], 0, function () {
          return this.millisecond() * 100;
      });
      addFormatToken(0, ['SSSSSS', 6], 0, function () {
          return this.millisecond() * 1000;
      });
      addFormatToken(0, ['SSSSSSS', 7], 0, function () {
          return this.millisecond() * 10000;
      });
      addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
          return this.millisecond() * 100000;
      });
      addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
          return this.millisecond() * 1000000;
      });

      // ALIASES

      addUnitAlias('millisecond', 'ms');

      // PRIORITY

      addUnitPriority('millisecond', 16);

      // PARSING

      addRegexToken('S', match1to3, match1);
      addRegexToken('SS', match1to3, match2);
      addRegexToken('SSS', match1to3, match3);

      var token, getSetMillisecond;
      for (token = 'SSSS'; token.length <= 9; token += 'S') {
          addRegexToken(token, matchUnsigned);
      }

      function parseMs(input, array) {
          array[MILLISECOND] = toInt(('0.' + input) * 1000);
      }

      for (token = 'S'; token.length <= 9; token += 'S') {
          addParseToken(token, parseMs);
      }

      getSetMillisecond = makeGetSet('Milliseconds', false);

      // FORMATTING

      addFormatToken('z', 0, 0, 'zoneAbbr');
      addFormatToken('zz', 0, 0, 'zoneName');

      // MOMENTS

      function getZoneAbbr() {
          return this._isUTC ? 'UTC' : '';
      }

      function getZoneName() {
          return this._isUTC ? 'Coordinated Universal Time' : '';
      }

      var proto = Moment.prototype;

      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== 'undefined' && Symbol.for != null) {
          proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
              return 'Moment<' + this.format() + '>';
          };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate(
          'dates accessor is deprecated. Use date instead.',
          getSetDayOfMonth
      );
      proto.months = deprecate(
          'months accessor is deprecated. Use month instead',
          getSetMonth
      );
      proto.years = deprecate(
          'years accessor is deprecated. Use year instead',
          getSetYear
      );
      proto.zone = deprecate(
          'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
          getSetZone
      );
      proto.isDSTShifted = deprecate(
          'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
          isDaylightSavingTimeShifted
      );

      function createUnix(input) {
          return createLocal(input * 1000);
      }

      function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
      }

      function preParsePostFormat(string) {
          return string;
      }

      var proto$1 = Locale.prototype;

      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;

      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;

      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;

      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;

      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;

      function get$1(format, index, field, setter) {
          var locale = getLocale(),
              utc = createUTC().set(setter, index);
          return locale[field](utc, format);
      }

      function listMonthsImpl(format, index, field) {
          if (isNumber(format)) {
              index = format;
              format = undefined;
          }

          format = format || '';

          if (index != null) {
              return get$1(format, index, field, 'month');
          }

          var i,
              out = [];
          for (i = 0; i < 12; i++) {
              out[i] = get$1(format, i, field, 'month');
          }
          return out;
      }

      // ()
      // (5)
      // (fmt, 5)
      // (fmt)
      // (true)
      // (true, 5)
      // (true, fmt, 5)
      // (true, fmt)
      function listWeekdaysImpl(localeSorted, format, index, field) {
          if (typeof localeSorted === 'boolean') {
              if (isNumber(format)) {
                  index = format;
                  format = undefined;
              }

              format = format || '';
          } else {
              format = localeSorted;
              index = format;
              localeSorted = false;

              if (isNumber(format)) {
                  index = format;
                  format = undefined;
              }

              format = format || '';
          }

          var locale = getLocale(),
              shift = localeSorted ? locale._week.dow : 0,
              i,
              out = [];

          if (index != null) {
              return get$1(format, (index + shift) % 7, field, 'day');
          }

          for (i = 0; i < 7; i++) {
              out[i] = get$1(format, (i + shift) % 7, field, 'day');
          }
          return out;
      }

      function listMonths(format, index) {
          return listMonthsImpl(format, index, 'months');
      }

      function listMonthsShort(format, index) {
          return listMonthsImpl(format, index, 'monthsShort');
      }

      function listWeekdays(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
      }

      function listWeekdaysShort(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
      }

      function listWeekdaysMin(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
      }

      getSetGlobalLocale('en', {
          eras: [
              {
                  since: '0001-01-01',
                  until: +Infinity,
                  offset: 1,
                  name: 'Anno Domini',
                  narrow: 'AD',
                  abbr: 'AD',
              },
              {
                  since: '0000-12-31',
                  until: -Infinity,
                  offset: 1,
                  name: 'Before Christ',
                  narrow: 'BC',
                  abbr: 'BC',
              },
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function (number) {
              var b = number % 10,
                  output =
                      toInt((number % 100) / 10) === 1
                          ? 'th'
                          : b === 1
                          ? 'st'
                          : b === 2
                          ? 'nd'
                          : b === 3
                          ? 'rd'
                          : 'th';
              return number + output;
          },
      });

      // Side effect imports

      hooks.lang = deprecate(
          'moment.lang is deprecated. Use moment.locale instead.',
          getSetGlobalLocale
      );
      hooks.langData = deprecate(
          'moment.langData is deprecated. Use moment.localeData instead.',
          getLocale
      );

      var mathAbs = Math.abs;

      function abs() {
          var data = this._data;

          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);

          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);

          return this;
      }

      function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);

          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;

          return duration._bubble();
      }

      // supports only 2.0-style add(1, 's') or add(duration)
      function add$1(input, value) {
          return addSubtract$1(this, input, value, 1);
      }

      // supports only 2.0-style subtract(1, 's') or subtract(duration)
      function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
      }

      function absCeil(number) {
          if (number < 0) {
              return Math.floor(number);
          } else {
              return Math.ceil(number);
          }
      }

      function bubble() {
          var milliseconds = this._milliseconds,
              days = this._days,
              months = this._months,
              data = this._data,
              seconds,
              minutes,
              hours,
              years,
              monthsFromDays;

          // if we have a mix of positive and negative values, bubble down first
          // check: https://github.com/moment/moment/issues/2166
          if (
              !(
                  (milliseconds >= 0 && days >= 0 && months >= 0) ||
                  (milliseconds <= 0 && days <= 0 && months <= 0)
              )
          ) {
              milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
              days = 0;
              months = 0;
          }

          // The following code bubbles up values, see the tests for
          // examples of what that means.
          data.milliseconds = milliseconds % 1000;

          seconds = absFloor(milliseconds / 1000);
          data.seconds = seconds % 60;

          minutes = absFloor(seconds / 60);
          data.minutes = minutes % 60;

          hours = absFloor(minutes / 60);
          data.hours = hours % 24;

          days += absFloor(hours / 24);

          // convert days to months
          monthsFromDays = absFloor(daysToMonths(days));
          months += monthsFromDays;
          days -= absCeil(monthsToDays(monthsFromDays));

          // 12 months -> 1 year
          years = absFloor(months / 12);
          months %= 12;

          data.days = days;
          data.months = months;
          data.years = years;

          return this;
      }

      function daysToMonths(days) {
          // 400 years have 146097 days (taking into account leap year rules)
          // 400 years have 12 months === 4800
          return (days * 4800) / 146097;
      }

      function monthsToDays(months) {
          // the reverse of daysToMonths
          return (months * 146097) / 4800;
      }

      function as(units) {
          if (!this.isValid()) {
              return NaN;
          }
          var days,
              months,
              milliseconds = this._milliseconds;

          units = normalizeUnits(units);

          if (units === 'month' || units === 'quarter' || units === 'year') {
              days = this._days + milliseconds / 864e5;
              months = this._months + daysToMonths(days);
              switch (units) {
                  case 'month':
                      return months;
                  case 'quarter':
                      return months / 3;
                  case 'year':
                      return months / 12;
              }
          } else {
              // handle milliseconds separately because of floating point math errors (issue #1867)
              days = this._days + Math.round(monthsToDays(this._months));
              switch (units) {
                  case 'week':
                      return days / 7 + milliseconds / 6048e5;
                  case 'day':
                      return days + milliseconds / 864e5;
                  case 'hour':
                      return days * 24 + milliseconds / 36e5;
                  case 'minute':
                      return days * 1440 + milliseconds / 6e4;
                  case 'second':
                      return days * 86400 + milliseconds / 1000;
                  // Math.floor prevents floating point math errors here
                  case 'millisecond':
                      return Math.floor(days * 864e5) + milliseconds;
                  default:
                      throw new Error('Unknown unit ' + units);
              }
          }
      }

      // TODO: Use this.as('ms')?
      function valueOf$1() {
          if (!this.isValid()) {
              return NaN;
          }
          return (
              this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6
          );
      }

      function makeAs(alias) {
          return function () {
              return this.as(alias);
          };
      }

      var asMilliseconds = makeAs('ms'),
          asSeconds = makeAs('s'),
          asMinutes = makeAs('m'),
          asHours = makeAs('h'),
          asDays = makeAs('d'),
          asWeeks = makeAs('w'),
          asMonths = makeAs('M'),
          asQuarters = makeAs('Q'),
          asYears = makeAs('y');

      function clone$1() {
          return createDuration(this);
      }

      function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + 's']() : NaN;
      }

      function makeGetter(name) {
          return function () {
              return this.isValid() ? this._data[name] : NaN;
          };
      }

      var milliseconds = makeGetter('milliseconds'),
          seconds = makeGetter('seconds'),
          minutes = makeGetter('minutes'),
          hours = makeGetter('hours'),
          days = makeGetter('days'),
          months = makeGetter('months'),
          years = makeGetter('years');

      function weeks() {
          return absFloor(this.days() / 7);
      }

      var round = Math.round,
          thresholds = {
              ss: 44, // a few seconds to seconds
              s: 45, // seconds to minute
              m: 45, // minutes to hour
              h: 22, // hours to day
              d: 26, // days to month/week
              w: null, // weeks to month
              M: 11, // months to year
          };

      // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
          return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }

      function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
          var duration = createDuration(posNegDuration).abs(),
              seconds = round(duration.as('s')),
              minutes = round(duration.as('m')),
              hours = round(duration.as('h')),
              days = round(duration.as('d')),
              months = round(duration.as('M')),
              weeks = round(duration.as('w')),
              years = round(duration.as('y')),
              a =
                  (seconds <= thresholds.ss && ['s', seconds]) ||
                  (seconds < thresholds.s && ['ss', seconds]) ||
                  (minutes <= 1 && ['m']) ||
                  (minutes < thresholds.m && ['mm', minutes]) ||
                  (hours <= 1 && ['h']) ||
                  (hours < thresholds.h && ['hh', hours]) ||
                  (days <= 1 && ['d']) ||
                  (days < thresholds.d && ['dd', days]);

          if (thresholds.w != null) {
              a =
                  a ||
                  (weeks <= 1 && ['w']) ||
                  (weeks < thresholds.w && ['ww', weeks]);
          }
          a = a ||
              (months <= 1 && ['M']) ||
              (months < thresholds.M && ['MM', months]) ||
              (years <= 1 && ['y']) || ['yy', years];

          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale;
          return substituteTimeAgo.apply(null, a);
      }

      // This function allows you to set the rounding function for relative time strings
      function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === undefined) {
              return round;
          }
          if (typeof roundingFunction === 'function') {
              round = roundingFunction;
              return true;
          }
          return false;
      }

      // This function allows you to set a threshold for relative time strings
      function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === undefined) {
              return false;
          }
          if (limit === undefined) {
              return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === 's') {
              thresholds.ss = limit - 1;
          }
          return true;
      }

      function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
              return this.localeData().invalidDate();
          }

          var withSuffix = false,
              th = thresholds,
              locale,
              output;

          if (typeof argWithSuffix === 'object') {
              argThresholds = argWithSuffix;
              argWithSuffix = false;
          }
          if (typeof argWithSuffix === 'boolean') {
              withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === 'object') {
              th = Object.assign({}, thresholds, argThresholds);
              if (argThresholds.s != null && argThresholds.ss == null) {
                  th.ss = argThresholds.s - 1;
              }
          }

          locale = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale);

          if (withSuffix) {
              output = locale.pastFuture(+this, output);
          }

          return locale.postformat(output);
      }

      var abs$1 = Math.abs;

      function sign(x) {
          return (x > 0) - (x < 0) || +x;
      }

      function toISOString$1() {
          // for ISO strings we do not use the normal bubbling rules:
          //  * milliseconds bubble up until they become hours
          //  * days do not bubble at all
          //  * months bubble up until they become years
          // This is because there is no context-free conversion between hours and days
          // (think of clock changes)
          // and also not between days and months (28-31 days per month)
          if (!this.isValid()) {
              return this.localeData().invalidDate();
          }

          var seconds = abs$1(this._milliseconds) / 1000,
              days = abs$1(this._days),
              months = abs$1(this._months),
              minutes,
              hours,
              years,
              s,
              total = this.asSeconds(),
              totalSign,
              ymSign,
              daysSign,
              hmsSign;

          if (!total) {
              // this is the same as C#'s (Noda) and python (isodate)...
              // but not other JS (goog.date)
              return 'P0D';
          }

          // 3600 seconds -> 60 minutes -> 1 hour
          minutes = absFloor(seconds / 60);
          hours = absFloor(minutes / 60);
          seconds %= 60;
          minutes %= 60;

          // 12 months -> 1 year
          years = absFloor(months / 12);
          months %= 12;

          // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
          s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

          totalSign = total < 0 ? '-' : '';
          ymSign = sign(this._months) !== sign(total) ? '-' : '';
          daysSign = sign(this._days) !== sign(total) ? '-' : '';
          hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

          return (
              totalSign +
              'P' +
              (years ? ymSign + years + 'Y' : '') +
              (months ? ymSign + months + 'M' : '') +
              (days ? daysSign + days + 'D' : '') +
              (hours || minutes || seconds ? 'T' : '') +
              (hours ? hmsSign + hours + 'H' : '') +
              (minutes ? hmsSign + minutes + 'M' : '') +
              (seconds ? hmsSign + s + 'S' : '')
          );
      }

      var proto$2 = Duration.prototype;

      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;

      proto$2.toIsoString = deprecate(
          'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
          toISOString$1
      );
      proto$2.lang = lang;

      // FORMATTING

      addFormatToken('X', 0, 0, 'unix');
      addFormatToken('x', 0, 0, 'valueOf');

      // PARSING

      addRegexToken('x', matchSigned);
      addRegexToken('X', matchTimestamp);
      addParseToken('X', function (input, array, config) {
          config._d = new Date(parseFloat(input) * 1000);
      });
      addParseToken('x', function (input, array, config) {
          config._d = new Date(toInt(input));
      });

      //! moment.js

      hooks.version = '2.29.1';

      setHookCallback(createLocal);

      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;

      // currently HTML5 input type only supports 24-hour formats
      hooks.HTML5_FMT = {
          DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
          DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
          DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
          DATE: 'YYYY-MM-DD', // <input type="date" />
          TIME: 'HH:mm', // <input type="time" />
          TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
          TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
          WEEK: 'GGGG-[W]WW', // <input type="week" />
          MONTH: 'YYYY-MM', // <input type="month" />
      };

      return hooks;

  })));
  });

  var momentTimezone = createCommonjsModule(function (module) {
  //! moment-timezone.js
  //! version : 0.5.32
  //! Copyright (c) JS Foundation and other contributors
  //! license : MIT
  //! github.com/moment/moment-timezone

  (function (root, factory) {

  	/*global define*/
  	if ( module.exports) {
  		module.exports = factory(moment); // Node
  	} else {
  		factory(root.moment);                        // Browser
  	}
  }(commonjsGlobal, function (moment) {

  	// Resolves es6 module loading issue
  	if (moment.version === undefined && moment.default) {
  		moment = moment.default;
  	}

  	// Do not load moment-timezone a second time.
  	// if (moment.tz !== undefined) {
  	// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
  	// 	return moment;
  	// }

  	var VERSION = "0.5.32",
  		zones = {},
  		links = {},
  		countries = {},
  		names = {},
  		guesses = {},
  		cachedGuess;

  	if (!moment || typeof moment.version !== 'string') {
  		logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
  	}

  	var momentVersion = moment.version.split('.'),
  		major = +momentVersion[0],
  		minor = +momentVersion[1];

  	// Moment.js version check
  	if (major < 2 || (major === 2 && minor < 6)) {
  		logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
  	}

  	/************************************
  		Unpacking
  	************************************/

  	function charCodeToInt(charCode) {
  		if (charCode > 96) {
  			return charCode - 87;
  		} else if (charCode > 64) {
  			return charCode - 29;
  		}
  		return charCode - 48;
  	}

  	function unpackBase60(string) {
  		var i = 0,
  			parts = string.split('.'),
  			whole = parts[0],
  			fractional = parts[1] || '',
  			multiplier = 1,
  			num,
  			out = 0,
  			sign = 1;

  		// handle negative numbers
  		if (string.charCodeAt(0) === 45) {
  			i = 1;
  			sign = -1;
  		}

  		// handle digits before the decimal
  		for (i; i < whole.length; i++) {
  			num = charCodeToInt(whole.charCodeAt(i));
  			out = 60 * out + num;
  		}

  		// handle digits after the decimal
  		for (i = 0; i < fractional.length; i++) {
  			multiplier = multiplier / 60;
  			num = charCodeToInt(fractional.charCodeAt(i));
  			out += num * multiplier;
  		}

  		return out * sign;
  	}

  	function arrayToInt (array) {
  		for (var i = 0; i < array.length; i++) {
  			array[i] = unpackBase60(array[i]);
  		}
  	}

  	function intToUntil (array, length) {
  		for (var i = 0; i < length; i++) {
  			array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
  		}

  		array[length - 1] = Infinity;
  	}

  	function mapIndices (source, indices) {
  		var out = [], i;

  		for (i = 0; i < indices.length; i++) {
  			out[i] = source[indices[i]];
  		}

  		return out;
  	}

  	function unpack (string) {
  		var data = string.split('|'),
  			offsets = data[2].split(' '),
  			indices = data[3].split(''),
  			untils  = data[4].split(' ');

  		arrayToInt(offsets);
  		arrayToInt(indices);
  		arrayToInt(untils);

  		intToUntil(untils, indices.length);

  		return {
  			name       : data[0],
  			abbrs      : mapIndices(data[1].split(' '), indices),
  			offsets    : mapIndices(offsets, indices),
  			untils     : untils,
  			population : data[5] | 0
  		};
  	}

  	/************************************
  		Zone object
  	************************************/

  	function Zone (packedString) {
  		if (packedString) {
  			this._set(unpack(packedString));
  		}
  	}

  	Zone.prototype = {
  		_set : function (unpacked) {
  			this.name       = unpacked.name;
  			this.abbrs      = unpacked.abbrs;
  			this.untils     = unpacked.untils;
  			this.offsets    = unpacked.offsets;
  			this.population = unpacked.population;
  		},

  		_index : function (timestamp) {
  			var target = +timestamp,
  				untils = this.untils,
  				i;

  			for (i = 0; i < untils.length; i++) {
  				if (target < untils[i]) {
  					return i;
  				}
  			}
  		},

  		countries : function () {
  			var zone_name = this.name;
  			return Object.keys(countries).filter(function (country_code) {
  				return countries[country_code].zones.indexOf(zone_name) !== -1;
  			});
  		},

  		parse : function (timestamp) {
  			var target  = +timestamp,
  				offsets = this.offsets,
  				untils  = this.untils,
  				max     = untils.length - 1,
  				offset, offsetNext, offsetPrev, i;

  			for (i = 0; i < max; i++) {
  				offset     = offsets[i];
  				offsetNext = offsets[i + 1];
  				offsetPrev = offsets[i ? i - 1 : i];

  				if (offset < offsetNext && tz.moveAmbiguousForward) {
  					offset = offsetNext;
  				} else if (offset > offsetPrev && tz.moveInvalidForward) {
  					offset = offsetPrev;
  				}

  				if (target < untils[i] - (offset * 60000)) {
  					return offsets[i];
  				}
  			}

  			return offsets[max];
  		},

  		abbr : function (mom) {
  			return this.abbrs[this._index(mom)];
  		},

  		offset : function (mom) {
  			logError("zone.offset has been deprecated in favor of zone.utcOffset");
  			return this.offsets[this._index(mom)];
  		},

  		utcOffset : function (mom) {
  			return this.offsets[this._index(mom)];
  		}
  	};

  	/************************************
  		Country object
  	************************************/

  	function Country (country_name, zone_names) {
  		this.name = country_name;
  		this.zones = zone_names;
  	}

  	/************************************
  		Current Timezone
  	************************************/

  	function OffsetAt(at) {
  		var timeString = at.toTimeString();
  		var abbr = timeString.match(/\([a-z ]+\)/i);
  		if (abbr && abbr[0]) {
  			// 17:56:31 GMT-0600 (CST)
  			// 17:56:31 GMT-0600 (Central Standard Time)
  			abbr = abbr[0].match(/[A-Z]/g);
  			abbr = abbr ? abbr.join('') : undefined;
  		} else {
  			// 17:56:31 CST
  			// 17:56:31 GMT+0800 (台北標準時間)
  			abbr = timeString.match(/[A-Z]{3,5}/g);
  			abbr = abbr ? abbr[0] : undefined;
  		}

  		if (abbr === 'GMT') {
  			abbr = undefined;
  		}

  		this.at = +at;
  		this.abbr = abbr;
  		this.offset = at.getTimezoneOffset();
  	}

  	function ZoneScore(zone) {
  		this.zone = zone;
  		this.offsetScore = 0;
  		this.abbrScore = 0;
  	}

  	ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
  		this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
  		if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
  			this.abbrScore++;
  		}
  	};

  	function findChange(low, high) {
  		var mid, diff;

  		while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
  			mid = new OffsetAt(new Date(low.at + diff));
  			if (mid.offset === low.offset) {
  				low = mid;
  			} else {
  				high = mid;
  			}
  		}

  		return low;
  	}

  	function userOffsets() {
  		var startYear = new Date().getFullYear() - 2,
  			last = new OffsetAt(new Date(startYear, 0, 1)),
  			offsets = [last],
  			change, next, i;

  		for (i = 1; i < 48; i++) {
  			next = new OffsetAt(new Date(startYear, i, 1));
  			if (next.offset !== last.offset) {
  				change = findChange(last, next);
  				offsets.push(change);
  				offsets.push(new OffsetAt(new Date(change.at + 6e4)));
  			}
  			last = next;
  		}

  		for (i = 0; i < 4; i++) {
  			offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
  			offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
  		}

  		return offsets;
  	}

  	function sortZoneScores (a, b) {
  		if (a.offsetScore !== b.offsetScore) {
  			return a.offsetScore - b.offsetScore;
  		}
  		if (a.abbrScore !== b.abbrScore) {
  			return a.abbrScore - b.abbrScore;
  		}
  		if (a.zone.population !== b.zone.population) {
  			return b.zone.population - a.zone.population;
  		}
  		return b.zone.name.localeCompare(a.zone.name);
  	}

  	function addToGuesses (name, offsets) {
  		var i, offset;
  		arrayToInt(offsets);
  		for (i = 0; i < offsets.length; i++) {
  			offset = offsets[i];
  			guesses[offset] = guesses[offset] || {};
  			guesses[offset][name] = true;
  		}
  	}

  	function guessesForUserOffsets (offsets) {
  		var offsetsLength = offsets.length,
  			filteredGuesses = {},
  			out = [],
  			i, j, guessesOffset;

  		for (i = 0; i < offsetsLength; i++) {
  			guessesOffset = guesses[offsets[i].offset] || {};
  			for (j in guessesOffset) {
  				if (guessesOffset.hasOwnProperty(j)) {
  					filteredGuesses[j] = true;
  				}
  			}
  		}

  		for (i in filteredGuesses) {
  			if (filteredGuesses.hasOwnProperty(i)) {
  				out.push(names[i]);
  			}
  		}

  		return out;
  	}

  	function rebuildGuess () {

  		// use Intl API when available and returning valid time zone
  		try {
  			var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  			if (intlName && intlName.length > 3) {
  				var name = names[normalizeName(intlName)];
  				if (name) {
  					return name;
  				}
  				logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
  			}
  		} catch (e) {
  			// Intl unavailable, fall back to manual guessing.
  		}

  		var offsets = userOffsets(),
  			offsetsLength = offsets.length,
  			guesses = guessesForUserOffsets(offsets),
  			zoneScores = [],
  			zoneScore, i, j;

  		for (i = 0; i < guesses.length; i++) {
  			zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
  			for (j = 0; j < offsetsLength; j++) {
  				zoneScore.scoreOffsetAt(offsets[j]);
  			}
  			zoneScores.push(zoneScore);
  		}

  		zoneScores.sort(sortZoneScores);

  		return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
  	}

  	function guess (ignoreCache) {
  		if (!cachedGuess || ignoreCache) {
  			cachedGuess = rebuildGuess();
  		}
  		return cachedGuess;
  	}

  	/************************************
  		Global Methods
  	************************************/

  	function normalizeName (name) {
  		return (name || '').toLowerCase().replace(/\//g, '_');
  	}

  	function addZone (packed) {
  		var i, name, split, normalized;

  		if (typeof packed === "string") {
  			packed = [packed];
  		}

  		for (i = 0; i < packed.length; i++) {
  			split = packed[i].split('|');
  			name = split[0];
  			normalized = normalizeName(name);
  			zones[normalized] = packed[i];
  			names[normalized] = name;
  			addToGuesses(normalized, split[2].split(' '));
  		}
  	}

  	function getZone (name, caller) {

  		name = normalizeName(name);

  		var zone = zones[name];
  		var link;

  		if (zone instanceof Zone) {
  			return zone;
  		}

  		if (typeof zone === 'string') {
  			zone = new Zone(zone);
  			zones[name] = zone;
  			return zone;
  		}

  		// Pass getZone to prevent recursion more than 1 level deep
  		if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
  			zone = zones[name] = new Zone();
  			zone._set(link);
  			zone.name = names[name];
  			return zone;
  		}

  		return null;
  	}

  	function getNames () {
  		var i, out = [];

  		for (i in names) {
  			if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
  				out.push(names[i]);
  			}
  		}

  		return out.sort();
  	}

  	function getCountryNames () {
  		return Object.keys(countries);
  	}

  	function addLink (aliases) {
  		var i, alias, normal0, normal1;

  		if (typeof aliases === "string") {
  			aliases = [aliases];
  		}

  		for (i = 0; i < aliases.length; i++) {
  			alias = aliases[i].split('|');

  			normal0 = normalizeName(alias[0]);
  			normal1 = normalizeName(alias[1]);

  			links[normal0] = normal1;
  			names[normal0] = alias[0];

  			links[normal1] = normal0;
  			names[normal1] = alias[1];
  		}
  	}

  	function addCountries (data) {
  		var i, country_code, country_zones, split;
  		if (!data || !data.length) return;
  		for (i = 0; i < data.length; i++) {
  			split = data[i].split('|');
  			country_code = split[0].toUpperCase();
  			country_zones = split[1].split(' ');
  			countries[country_code] = new Country(
  				country_code,
  				country_zones
  			);
  		}
  	}

  	function getCountry (name) {
  		name = name.toUpperCase();
  		return countries[name] || null;
  	}

  	function zonesForCountry(country, with_offset) {
  		country = getCountry(country);

  		if (!country) return null;

  		var zones = country.zones.sort();

  		if (with_offset) {
  			return zones.map(function (zone_name) {
  				var zone = getZone(zone_name);
  				return {
  					name: zone_name,
  					offset: zone.utcOffset(new Date())
  				};
  			});
  		}

  		return zones;
  	}

  	function loadData (data) {
  		addZone(data.zones);
  		addLink(data.links);
  		addCountries(data.countries);
  		tz.dataVersion = data.version;
  	}

  	function zoneExists (name) {
  		if (!zoneExists.didShowError) {
  			zoneExists.didShowError = true;
  				logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
  		}
  		return !!getZone(name);
  	}

  	function needsOffset (m) {
  		var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
  		return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
  	}

  	function logError (message) {
  		if (typeof console !== 'undefined' && typeof console.error === 'function') {
  			console.error(message);
  		}
  	}

  	/************************************
  		moment.tz namespace
  	************************************/

  	function tz (input) {
  		var args = Array.prototype.slice.call(arguments, 0, -1),
  			name = arguments[arguments.length - 1],
  			zone = getZone(name),
  			out  = moment.utc.apply(null, args);

  		if (zone && !moment.isMoment(input) && needsOffset(out)) {
  			out.add(zone.parse(out), 'minutes');
  		}

  		out.tz(name);

  		return out;
  	}

  	tz.version      = VERSION;
  	tz.dataVersion  = '';
  	tz._zones       = zones;
  	tz._links       = links;
  	tz._names       = names;
  	tz._countries	= countries;
  	tz.add          = addZone;
  	tz.link         = addLink;
  	tz.load         = loadData;
  	tz.zone         = getZone;
  	tz.zoneExists   = zoneExists; // deprecated in 0.1.0
  	tz.guess        = guess;
  	tz.names        = getNames;
  	tz.Zone         = Zone;
  	tz.unpack       = unpack;
  	tz.unpackBase60 = unpackBase60;
  	tz.needsOffset  = needsOffset;
  	tz.moveInvalidForward   = true;
  	tz.moveAmbiguousForward = false;
  	tz.countries    = getCountryNames;
  	tz.zonesForCountry = zonesForCountry;

  	/************************************
  		Interface with Moment.js
  	************************************/

  	var fn = moment.fn;

  	moment.tz = tz;

  	moment.defaultZone = null;

  	moment.updateOffset = function (mom, keepTime) {
  		var zone = moment.defaultZone,
  			offset;

  		if (mom._z === undefined) {
  			if (zone && needsOffset(mom) && !mom._isUTC) {
  				mom._d = moment.utc(mom._a)._d;
  				mom.utc().add(zone.parse(mom), 'minutes');
  			}
  			mom._z = zone;
  		}
  		if (mom._z) {
  			offset = mom._z.utcOffset(mom);
  			if (Math.abs(offset) < 16) {
  				offset = offset / 60;
  			}
  			if (mom.utcOffset !== undefined) {
  				var z = mom._z;
  				mom.utcOffset(-offset, keepTime);
  				mom._z = z;
  			} else {
  				mom.zone(offset, keepTime);
  			}
  		}
  	};

  	fn.tz = function (name, keepTime) {
  		if (name) {
  			if (typeof name !== 'string') {
  				throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
  			}
  			this._z = getZone(name);
  			if (this._z) {
  				moment.updateOffset(this, keepTime);
  			} else {
  				logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
  			}
  			return this;
  		}
  		if (this._z) { return this._z.name; }
  	};

  	function abbrWrap (old) {
  		return function () {
  			if (this._z) { return this._z.abbr(this); }
  			return old.call(this);
  		};
  	}

  	function resetZoneWrap (old) {
  		return function () {
  			this._z = null;
  			return old.apply(this, arguments);
  		};
  	}

  	function resetZoneWrap2 (old) {
  		return function () {
  			if (arguments.length > 0) this._z = null;
  			return old.apply(this, arguments);
  		};
  	}

  	fn.zoneName  = abbrWrap(fn.zoneName);
  	fn.zoneAbbr  = abbrWrap(fn.zoneAbbr);
  	fn.utc       = resetZoneWrap(fn.utc);
  	fn.local     = resetZoneWrap(fn.local);
  	fn.utcOffset = resetZoneWrap2(fn.utcOffset);

  	moment.tz.setDefault = function(name) {
  		if (major < 2 || (major === 2 && minor < 9)) {
  			logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
  		}
  		moment.defaultZone = name ? getZone(name) : null;
  		return moment;
  	};

  	// Cloning a moment should include the _z property.
  	var momentProperties = moment.momentProperties;
  	if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
  		// moment 2.8.1+
  		momentProperties.push('_z');
  		momentProperties.push('_a');
  	} else if (momentProperties) {
  		// moment 2.7.0
  		momentProperties._z = null;
  	}

  	// INJECT DATA

  	return moment;
  }));
  });

  var version = "2020d";
  var zones = [
  	"Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5",
  	"Africa/Accra|LMT GMT +0020|.Q 0 -k|012121212121212121212121212121212121212121212121|-26BbX.8 6tzX.8 MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE|41e5",
  	"Africa/Nairobi|LMT EAT +0230 +0245|-2r.g -30 -2u -2J|01231|-1F3Cr.g 3Dzr.g okMu MFXJ|47e5",
  	"Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5",
  	"Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6",
  	"Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldX0 2xoo0|39e4",
  	"Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5",
  	"Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6",
  	"Africa/Casablanca|LMT +00 +01|u.k 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|32e5",
  	"Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3",
  	"Africa/El_Aaiun|LMT -01 +00 +01|Q.M 10 0 -10|012323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|20e4",
  	"Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5",
  	"Africa/Juba|LMT CAT CAST EAT|-26.s -20 -30 -30|01212121212121212121212121212121213|-1yW26.s 1zK06.s 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0|",
  	"Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|012121212121212121212121212121212131|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5",
  	"Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5",
  	"Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5",
  	"Africa/Sao_Tome|LMT GMT WAT|A.J 0 -10|0121|-2le00 4i6N0 2q00|",
  	"Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5",
  	"Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5",
  	"Africa/Windhoek|+0130 SAST SAST CAT WAT|-1u -20 -30 -20 -10|01213434343434343434343434343434343434343434343434343|-2GJdu 1Ajdu 1cL0 1SqL0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4",
  	"America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326",
  	"America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4",
  	"America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3",
  	"America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4",
  	"America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0|",
  	"America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
  	"America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0|",
  	"America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0|",
  	"America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
  	"America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0|",
  	"America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
  	"America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0|",
  	"America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0|",
  	"America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0|",
  	"America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0|",
  	"America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0|",
  	"America/Curacao|LMT -0430 AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4",
  	"America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5",
  	"America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2",
  	"America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3",
  	"America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5",
  	"America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4",
  	"America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5",
  	"America/Belize|LMT CST -0530 CDT|5Q.M 60 5u 50|01212121212121212121212121212121212121212121212121213131|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1f0Mu qn0 lxB0 mn0|57e3",
  	"America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2",
  	"America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2",
  	"America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5",
  	"America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4",
  	"America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2",
  	"America/Campo_Grande|LMT -04 -03|3C.s 40 30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4",
  	"America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4",
  	"America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5",
  	"America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3",
  	"America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5",
  	"America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5",
  	"America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4",
  	"America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5",
  	"America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2",
  	"America/Cuiaba|LMT -04 -03|3I.k 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|54e4",
  	"America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8",
  	"America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3",
  	"America/Dawson|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|010102304056565656565656565656565656565656565656565656565656565656565656565656565656565656567|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|13e2",
  	"America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5",
  	"America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|0123425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 JxX1 SMX 1cN0 1cL0 aW10 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5",
  	"America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|0121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 XQp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5",
  	"America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3",
  	"America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5",
  	"America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5",
  	"America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2",
  	"America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5",
  	"America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3",
  	"America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3",
  	"America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2",
  	"America/Grand_Turk|KMT EST EDT AST|57.a 50 40 40|01212121212121212121212121212121212121212121212121212121212121212121212121232121212121212121212121212121212121212121|-2l1uQ.O 2HHBQ.O 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2",
  	"America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5",
  	"America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5",
  	"America/Guyana|LMT -0345 -03 -04|3Q.E 3J 30 40|0123|-2dvU7.k 2r6LQ.k Bxbf|80e4",
  	"America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4",
  	"America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5",
  	"America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4",
  	"America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010401054541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 8wn0 1cN0 1cL0 1cN0 1cK0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2",
  	"America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2",
  	"America/Jamaica|KMT EST EDT|57.a 50 40|0121212121212121212121|-2l1uQ.O 2uM1Q.O 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4",
  	"America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3",
  	"America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 1nX1 e0X 9vd0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/La_Paz|CMT BST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5",
  	"America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6",
  	"America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6",
  	"America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4",
  	"America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5",
  	"America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5",
  	"America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4",
  	"America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4",
  	"America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4",
  	"America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2",
  	"America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5",
  	"America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|01203030303030303030303030303030304545450454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2",
  	"America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6",
  	"America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2",
  	"America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3",
  	"America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5",
  	"America/Montevideo|LMT MMT -04 -03 -0330 -0230 -02 -0130|3I.P 3I.P 40 30 3u 2u 20 1u|012343434343434343434343435353636353636375363636363636363636363636363636363636363636363|-2tRUf.9 sVc0 8jcf.9 1db0 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1fAu 1cLu 1o0u 11zu NAu 3jXu zXu Dq0u 19Xu pcu jz0 cm10 19X0 6tB0 1fbu 3o0u jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5",
  	"America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5",
  	"America/Nassau|LMT EST EDT|59.u 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2kNuO.u 26XdO.u 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4",
  	"America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6",
  	"America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2",
  	"America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2",
  	"America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2",
  	"America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3",
  	"America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2",
  	"America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4",
  	"America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5",
  	"America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5",
  	"America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4",
  	"America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4",
  	"America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5",
  	"America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|",
  	"America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842",
  	"America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2",
  	"America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5",
  	"America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4",
  	"America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229",
  	"America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4",
  	"America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|62e5",
  	"America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5",
  	"America/Sao_Paulo|LMT -03 -02|36.s 30 20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6",
  	"America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452",
  	"America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2",
  	"America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4",
  	"America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3",
  	"America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5",
  	"America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656",
  	"America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4",
  	"America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5",
  	"America/Whitehorse|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|010102304056565656565656565656565656565656565656565656565656565656565656565656565656565656567|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|23e3",
  	"America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4",
  	"America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642",
  	"America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3",
  	"Antarctica/Casey|-00 +08 +11|0 -80 -b0|0121212121212|-2q00 1DjS0 T90 40P0 KL0 blz0 3m10 1o30 14k0 1kr0 12l0 1o01|10",
  	"Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70",
  	"Antarctica/DumontDUrville|-00 +10|0 -a0|0101|-U0o0 cfq0 bFm0|80",
  	"Antarctica/Macquarie|AEST AEDT -00|-a0 -b0 0|010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 4SL0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 3Co0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|1",
  	"Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60",
  	"Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5",
  	"Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40",
  	"Antarctica/Rothera|-00 -03|0 30|01|gOo0|130",
  	"Antarctica/Syowa|-00 +03|0 -30|01|-vs00|20",
  	"Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40",
  	"Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25",
  	"Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4",
  	"Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5",
  	"Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5",
  	"Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5",
  	"Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3",
  	"Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4",
  	"Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4",
  	"Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4",
  	"Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|",
  	"Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5",
  	"Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4",
  	"Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5",
  	"Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6",
  	"Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|",
  	"Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5",
  	"Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4",
  	"Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4",
  	"Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6",
  	"Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4",
  	"Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3",
  	"Asia/Shanghai|CST CDT|-80 -90|01010101010101010101010101010|-23uw0 18n0 OjB0 Rz0 11d0 1wL0 A10 8HX0 1G10 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 aL0 1tU30 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6",
  	"Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5",
  	"Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6",
  	"Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5",
  	"Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4",
  	"Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5",
  	"Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4",
  	"Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212312121212121212121212121212121212121212121|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|0101010101010101010101010101010123232323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nA0 1210 1qL0 WN0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5",
  	"Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101012323232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nA0 1210 1qL0 WN0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4",
  	"Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5",
  	"Asia/Hong_Kong|LMT HKT HKST HKWT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5",
  	"Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3",
  	"Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4",
  	"Europe/Istanbul|IMT EET EEST +03 +04|-1U.U -20 -30 -30 -40|0121212121212121212121212121212121212121212121234312121212121212121212121212121212121212121212121212121212121212123|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSN0 CL0 mp0 1Vz0 1gN0 8yn0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1ip0 19X0 1ip0 17b0 qdB0 38L0 1jd0 Tz0 l6O0 11A0 WN0 1qL0 TB0 1tX0 U10 1tz0 11B0 1in0 17d0 z90 cne0 pb0 2Cp0 1800 14o0 1dc0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6",
  	"Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6",
  	"Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4",
  	"Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|012121212121321212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyMk.E 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 3LB0 Em0 or0 1cn0 1dB0 16n0 10O0 1ja0 1tC0 14o0 1cM0 1a00 11A0 1Na0 An0 1MP0 AJ0 1Kp0 LC0 1oo0 Wl0 EQN0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4",
  	"Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5",
  	"Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4",
  	"Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6",
  	"Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5",
  	"Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5",
  	"Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2",
  	"Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5",
  	"Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5",
  	"Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4",
  	"Asia/Macau|LMT CST +09 +10 CDT|-7y.a -80 -90 -a0 -90|012323214141414141414141414141414141414141414141414141414141414141414141|-2CFHy.a 1uqKy.a PX0 1kn0 15B0 11b0 4Qq0 1oM0 11c0 1ko0 1u00 11A0 1cM0 11c0 1o00 11A0 1o00 11A0 1oo0 1400 1o00 11A0 1o00 U00 1tA0 U00 1wo0 Rc0 1wru U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cK0 1cO0 1cK0 1cO0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4",
  	"Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3",
  	"Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5",
  	"Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6",
  	"Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4",
  	"Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4",
  	"Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5",
  	"Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5",
  	"Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4",
  	"Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4",
  	"Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|012313|-2um8n 97XR 1lTzu 2Onc0 6BA0|29e5",
  	"Asia/Qostanay|LMT +04 +05 +06|-4e.s -40 -50 -60|012323232323232323232123232323232323232323232323|-1Pc4e.s eUoe.s 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|",
  	"Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|01232323232323232323232323232323232323232323232|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4",
  	"Asia/Rangoon|RMT +0630 +09|-6o.L -6u -90|0121|-21Jio.L SmnS.L 7j9u|48e5",
  	"Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4",
  	"Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4",
  	"Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -a0 -9u|012343434343151515151515134343|-2um8r.Q 97XV.Q 1m1zu 6CM0 Fz0 1kN0 14n0 1kN0 14L0 1zd0 On0 69B0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6",
  	"Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2",
  	"Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5",
  	"Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5",
  	"Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5",
  	"Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6",
  	"Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3",
  	"Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJJ0 Rc0 1lc0 14o0 1zc0 Oo0 1zc0 Oo0|38e6",
  	"Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5",
  	"Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5",
  	"Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2",
  	"Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4",
  	"Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4",
  	"Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5",
  	"Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5",
  	"Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4",
  	"Atlantic/Bermuda|LMT AST ADT|4j.i 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1BnRE.G 1LTbE.G 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3",
  	"Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
  	"Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2ldW0 1eEo0 7zX0 1djf0|50e4",
  	"Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3",
  	"Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldX0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4",
  	"Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4",
  	"Atlantic/South_Georgia|-02|20|0||30",
  	"Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2",
  	"Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5",
  	"Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5",
  	"Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5",
  	"Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3",
  	"Australia/Currie|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|746",
  	"Australia/Darwin|ACST ACDT|-9u -au|010101010|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0|12e4",
  	"Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293kI xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368",
  	"Australia/Hobart|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 VfB0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4",
  	"Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347",
  	"Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10",
  	"Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5",
  	"Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293jX xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5",
  	"CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|30e2",
  	"CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g600 14o0 1wo0 17c0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"EST|EST|50|0||",
  	"EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"Etc/GMT-0|GMT|0|0||",
  	"Etc/GMT-1|+01|-10|0||",
  	"Pacific/Port_Moresby|+10|-a0|0||25e4",
  	"Etc/GMT-11|+11|-b0|0||",
  	"Pacific/Tarawa|+12|-c0|0||29e3",
  	"Etc/GMT-13|+13|-d0|0||",
  	"Etc/GMT-14|+14|-e0|0||",
  	"Etc/GMT-2|+02|-20|0||",
  	"Etc/GMT-3|+03|-30|0||",
  	"Etc/GMT-4|+04|-40|0||",
  	"Etc/GMT-5|+05|-50|0||",
  	"Etc/GMT-6|+06|-60|0||",
  	"Indian/Christmas|+07|-70|0||21e2",
  	"Etc/GMT-8|+08|-80|0||",
  	"Pacific/Palau|+09|-90|0||21e3",
  	"Etc/GMT+1|-01|10|0||",
  	"Etc/GMT+10|-10|a0|0||",
  	"Etc/GMT+11|-11|b0|0||",
  	"Etc/GMT+12|-12|c0|0||",
  	"Etc/GMT+3|-03|30|0||",
  	"Etc/GMT+4|-04|40|0||",
  	"Etc/GMT+5|-05|50|0||",
  	"Etc/GMT+6|-06|60|0||",
  	"Etc/GMT+7|-07|70|0||",
  	"Etc/GMT+8|-08|80|0||",
  	"Etc/GMT+9|-09|90|0||",
  	"Etc/UTC|UTC|0|0||",
  	"Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5",
  	"Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3",
  	"Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5",
  	"Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5",
  	"Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6",
  	"Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5",
  	"Europe/Prague|CET CEST GMT|-10 -20 0|01010101010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 1qM0 11c0 mp0 xA0 mn0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5",
  	"Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5",
  	"Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5",
  	"Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 1oo0 11c0 1lc0 17c0 O1V0 3Nf0 WM0 1fA0 1cM0 1cM0 1oJ0 1dd0 1020 1fX0 1cp0 1cM0 1cM0 1cM0 1fA0 1a00 bhy0 Rb0 1wr0 Rc0 1C00 LA0 1C00 LA0 SNW0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cO0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5",
  	"Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4",
  	"Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4",
  	"Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3",
  	"Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Kaliningrad|CET CEST EET EEST MSK MSD +03|-10 -20 -20 -30 -30 -40 -30|01010101010101232454545454545454543232323232323232323232323232323232323232323262|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 390 7A0 1en0 12N0 1pbb0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4",
  	"Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5",
  	"Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4",
  	"Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5",
  	"Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
  	"Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5",
  	"Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4",
  	"Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5",
  	"Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2n5c9.l cFX9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3",
  	"Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6",
  	"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6",
  	"Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4",
  	"Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5",
  	"Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5",
  	"Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810|",
  	"Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4",
  	"Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5",
  	"Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4",
  	"Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4",
  	"Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5",
  	"Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4",
  	"Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1ao0 1co0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5",
  	"Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
  	"Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0|10e5",
  	"Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5",
  	"Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4",
  	"HST|HST|a0|0||",
  	"Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2",
  	"Indian/Cocos|+0630|-6u|0||596",
  	"Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130",
  	"Indian/Mahe|LMT +04|-3F.M -40|01|-2yO3F.M|79e3",
  	"Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4",
  	"Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4",
  	"Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4",
  	"Pacific/Kwajalein|+11 +10 +09 -12 +12|-b0 -a0 -90 c0 -c0|012034|-1kln0 akp0 6Up0 12ry0 Wan0|14e3",
  	"MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"MST|MST|70|0||",
  	"MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600",
  	"Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3",
  	"Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4",
  	"Pacific/Chuuk|+10 +09|-a0 -90|01010|-2ewy0 axB0 RVX0 axd0|49e3",
  	"Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|0121212121212121212121|-2l9nd.g 2Szcd.g 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3",
  	"Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B7X0|1",
  	"Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483",
  	"Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 20o0 pc0 2hc0 bc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00|88e4",
  	"Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3",
  	"Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125",
  	"Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4",
  	"Pacific/Guam|GST +09 GDT ChST|-a0 -90 -b0 -a0|01020202020202020203|-18jK0 6pB0 AhB0 3QL0 g2p0 3p91 WOX rX0 1zd0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4",
  	"Pacific/Honolulu|HST HDT HWT HPT HST|au 9u 9u 9u a0|0102304|-1thLu 8x0 lef0 8wWu iAu 46p0|37e4",
  	"Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2",
  	"Pacific/Kosrae|+11 +09 +10 +12|-b0 -90 -a0 -c0|01021030|-2ewz0 axC0 HBy0 akp0 axd0 WOK0 1bdz0|66e2",
  	"Pacific/Majuro|+11 +09 +10 +12|-b0 -90 -a0 -c0|0102103|-2ewz0 axC0 HBy0 akp0 6RB0 12um0|28e3",
  	"Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2",
  	"Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2",
  	"Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E QCnB.E 7mqu 1lnbu|10e3",
  	"Pacific/Niue|-1120 -1130 -11|bk bu b0|012|-KfME 17y0a|12e2",
  	"Pacific/Norfolk|+1112 +1130 +1230 +11 +12|-bc -bu -cu -b0 -c0|012134343434343434343434343434343434343434|-Kgbc W01G Oo0 1COo0 9Jcu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|25e4",
  	"Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3",
  	"Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56",
  	"Pacific/Pohnpei|+11 +09 +10|-b0 -90 -a0|010210|-2ewz0 axC0 HBy0 akp0 axd0|34e3",
  	"Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3",
  	"Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4",
  	"Pacific/Tongatapu|+1220 +13 +14|-ck -d0 -e0|0121212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3",
  	"PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|"
  ];
  var links = [
  	"Africa/Abidjan|Africa/Bamako",
  	"Africa/Abidjan|Africa/Banjul",
  	"Africa/Abidjan|Africa/Conakry",
  	"Africa/Abidjan|Africa/Dakar",
  	"Africa/Abidjan|Africa/Freetown",
  	"Africa/Abidjan|Africa/Lome",
  	"Africa/Abidjan|Africa/Nouakchott",
  	"Africa/Abidjan|Africa/Ouagadougou",
  	"Africa/Abidjan|Africa/Timbuktu",
  	"Africa/Abidjan|Atlantic/St_Helena",
  	"Africa/Cairo|Egypt",
  	"Africa/Johannesburg|Africa/Maseru",
  	"Africa/Johannesburg|Africa/Mbabane",
  	"Africa/Lagos|Africa/Bangui",
  	"Africa/Lagos|Africa/Brazzaville",
  	"Africa/Lagos|Africa/Douala",
  	"Africa/Lagos|Africa/Kinshasa",
  	"Africa/Lagos|Africa/Libreville",
  	"Africa/Lagos|Africa/Luanda",
  	"Africa/Lagos|Africa/Malabo",
  	"Africa/Lagos|Africa/Niamey",
  	"Africa/Lagos|Africa/Porto-Novo",
  	"Africa/Maputo|Africa/Blantyre",
  	"Africa/Maputo|Africa/Bujumbura",
  	"Africa/Maputo|Africa/Gaborone",
  	"Africa/Maputo|Africa/Harare",
  	"Africa/Maputo|Africa/Kigali",
  	"Africa/Maputo|Africa/Lubumbashi",
  	"Africa/Maputo|Africa/Lusaka",
  	"Africa/Nairobi|Africa/Addis_Ababa",
  	"Africa/Nairobi|Africa/Asmara",
  	"Africa/Nairobi|Africa/Asmera",
  	"Africa/Nairobi|Africa/Dar_es_Salaam",
  	"Africa/Nairobi|Africa/Djibouti",
  	"Africa/Nairobi|Africa/Kampala",
  	"Africa/Nairobi|Africa/Mogadishu",
  	"Africa/Nairobi|Indian/Antananarivo",
  	"Africa/Nairobi|Indian/Comoro",
  	"Africa/Nairobi|Indian/Mayotte",
  	"Africa/Tripoli|Libya",
  	"America/Adak|America/Atka",
  	"America/Adak|US/Aleutian",
  	"America/Anchorage|US/Alaska",
  	"America/Argentina/Buenos_Aires|America/Buenos_Aires",
  	"America/Argentina/Catamarca|America/Argentina/ComodRivadavia",
  	"America/Argentina/Catamarca|America/Catamarca",
  	"America/Argentina/Cordoba|America/Cordoba",
  	"America/Argentina/Cordoba|America/Rosario",
  	"America/Argentina/Jujuy|America/Jujuy",
  	"America/Argentina/Mendoza|America/Mendoza",
  	"America/Atikokan|America/Coral_Harbour",
  	"America/Chicago|US/Central",
  	"America/Curacao|America/Aruba",
  	"America/Curacao|America/Kralendijk",
  	"America/Curacao|America/Lower_Princes",
  	"America/Denver|America/Shiprock",
  	"America/Denver|Navajo",
  	"America/Denver|US/Mountain",
  	"America/Detroit|US/Michigan",
  	"America/Edmonton|Canada/Mountain",
  	"America/Fort_Wayne|America/Indiana/Indianapolis",
  	"America/Fort_Wayne|America/Indianapolis",
  	"America/Fort_Wayne|US/East-Indiana",
  	"America/Godthab|America/Nuuk",
  	"America/Halifax|Canada/Atlantic",
  	"America/Havana|Cuba",
  	"America/Indiana/Knox|America/Knox_IN",
  	"America/Indiana/Knox|US/Indiana-Starke",
  	"America/Jamaica|Jamaica",
  	"America/Kentucky/Louisville|America/Louisville",
  	"America/Los_Angeles|US/Pacific",
  	"America/Manaus|Brazil/West",
  	"America/Mazatlan|Mexico/BajaSur",
  	"America/Mexico_City|Mexico/General",
  	"America/New_York|US/Eastern",
  	"America/Noronha|Brazil/DeNoronha",
  	"America/Panama|America/Cayman",
  	"America/Phoenix|US/Arizona",
  	"America/Port_of_Spain|America/Anguilla",
  	"America/Port_of_Spain|America/Antigua",
  	"America/Port_of_Spain|America/Dominica",
  	"America/Port_of_Spain|America/Grenada",
  	"America/Port_of_Spain|America/Guadeloupe",
  	"America/Port_of_Spain|America/Marigot",
  	"America/Port_of_Spain|America/Montserrat",
  	"America/Port_of_Spain|America/St_Barthelemy",
  	"America/Port_of_Spain|America/St_Kitts",
  	"America/Port_of_Spain|America/St_Lucia",
  	"America/Port_of_Spain|America/St_Thomas",
  	"America/Port_of_Spain|America/St_Vincent",
  	"America/Port_of_Spain|America/Tortola",
  	"America/Port_of_Spain|America/Virgin",
  	"America/Regina|Canada/Saskatchewan",
  	"America/Rio_Branco|America/Porto_Acre",
  	"America/Rio_Branco|Brazil/Acre",
  	"America/Santiago|Chile/Continental",
  	"America/Sao_Paulo|Brazil/East",
  	"America/St_Johns|Canada/Newfoundland",
  	"America/Tijuana|America/Ensenada",
  	"America/Tijuana|America/Santa_Isabel",
  	"America/Tijuana|Mexico/BajaNorte",
  	"America/Toronto|America/Montreal",
  	"America/Toronto|Canada/Eastern",
  	"America/Vancouver|Canada/Pacific",
  	"America/Whitehorse|Canada/Yukon",
  	"America/Winnipeg|Canada/Central",
  	"Asia/Ashgabat|Asia/Ashkhabad",
  	"Asia/Bangkok|Asia/Phnom_Penh",
  	"Asia/Bangkok|Asia/Vientiane",
  	"Asia/Dhaka|Asia/Dacca",
  	"Asia/Dubai|Asia/Muscat",
  	"Asia/Ho_Chi_Minh|Asia/Saigon",
  	"Asia/Hong_Kong|Hongkong",
  	"Asia/Jerusalem|Asia/Tel_Aviv",
  	"Asia/Jerusalem|Israel",
  	"Asia/Kathmandu|Asia/Katmandu",
  	"Asia/Kolkata|Asia/Calcutta",
  	"Asia/Kuala_Lumpur|Asia/Singapore",
  	"Asia/Kuala_Lumpur|Singapore",
  	"Asia/Macau|Asia/Macao",
  	"Asia/Makassar|Asia/Ujung_Pandang",
  	"Asia/Nicosia|Europe/Nicosia",
  	"Asia/Qatar|Asia/Bahrain",
  	"Asia/Rangoon|Asia/Yangon",
  	"Asia/Riyadh|Asia/Aden",
  	"Asia/Riyadh|Asia/Kuwait",
  	"Asia/Seoul|ROK",
  	"Asia/Shanghai|Asia/Chongqing",
  	"Asia/Shanghai|Asia/Chungking",
  	"Asia/Shanghai|Asia/Harbin",
  	"Asia/Shanghai|PRC",
  	"Asia/Taipei|ROC",
  	"Asia/Tehran|Iran",
  	"Asia/Thimphu|Asia/Thimbu",
  	"Asia/Tokyo|Japan",
  	"Asia/Ulaanbaatar|Asia/Ulan_Bator",
  	"Asia/Urumqi|Asia/Kashgar",
  	"Atlantic/Faroe|Atlantic/Faeroe",
  	"Atlantic/Reykjavik|Iceland",
  	"Atlantic/South_Georgia|Etc/GMT+2",
  	"Australia/Adelaide|Australia/South",
  	"Australia/Brisbane|Australia/Queensland",
  	"Australia/Broken_Hill|Australia/Yancowinna",
  	"Australia/Darwin|Australia/North",
  	"Australia/Hobart|Australia/Tasmania",
  	"Australia/Lord_Howe|Australia/LHI",
  	"Australia/Melbourne|Australia/Victoria",
  	"Australia/Perth|Australia/West",
  	"Australia/Sydney|Australia/ACT",
  	"Australia/Sydney|Australia/Canberra",
  	"Australia/Sydney|Australia/NSW",
  	"Etc/GMT-0|Etc/GMT",
  	"Etc/GMT-0|Etc/GMT+0",
  	"Etc/GMT-0|Etc/GMT0",
  	"Etc/GMT-0|Etc/Greenwich",
  	"Etc/GMT-0|GMT",
  	"Etc/GMT-0|GMT+0",
  	"Etc/GMT-0|GMT-0",
  	"Etc/GMT-0|GMT0",
  	"Etc/GMT-0|Greenwich",
  	"Etc/UTC|Etc/UCT",
  	"Etc/UTC|Etc/Universal",
  	"Etc/UTC|Etc/Zulu",
  	"Etc/UTC|UCT",
  	"Etc/UTC|UTC",
  	"Etc/UTC|Universal",
  	"Etc/UTC|Zulu",
  	"Europe/Belgrade|Europe/Ljubljana",
  	"Europe/Belgrade|Europe/Podgorica",
  	"Europe/Belgrade|Europe/Sarajevo",
  	"Europe/Belgrade|Europe/Skopje",
  	"Europe/Belgrade|Europe/Zagreb",
  	"Europe/Chisinau|Europe/Tiraspol",
  	"Europe/Dublin|Eire",
  	"Europe/Helsinki|Europe/Mariehamn",
  	"Europe/Istanbul|Asia/Istanbul",
  	"Europe/Istanbul|Turkey",
  	"Europe/Lisbon|Portugal",
  	"Europe/London|Europe/Belfast",
  	"Europe/London|Europe/Guernsey",
  	"Europe/London|Europe/Isle_of_Man",
  	"Europe/London|Europe/Jersey",
  	"Europe/London|GB",
  	"Europe/London|GB-Eire",
  	"Europe/Moscow|W-SU",
  	"Europe/Oslo|Arctic/Longyearbyen",
  	"Europe/Oslo|Atlantic/Jan_Mayen",
  	"Europe/Prague|Europe/Bratislava",
  	"Europe/Rome|Europe/San_Marino",
  	"Europe/Rome|Europe/Vatican",
  	"Europe/Warsaw|Poland",
  	"Europe/Zurich|Europe/Busingen",
  	"Europe/Zurich|Europe/Vaduz",
  	"Indian/Christmas|Etc/GMT-7",
  	"Pacific/Auckland|Antarctica/McMurdo",
  	"Pacific/Auckland|Antarctica/South_Pole",
  	"Pacific/Auckland|NZ",
  	"Pacific/Chatham|NZ-CHAT",
  	"Pacific/Chuuk|Pacific/Truk",
  	"Pacific/Chuuk|Pacific/Yap",
  	"Pacific/Easter|Chile/EasterIsland",
  	"Pacific/Guam|Pacific/Saipan",
  	"Pacific/Honolulu|Pacific/Johnston",
  	"Pacific/Honolulu|US/Hawaii",
  	"Pacific/Kwajalein|Kwajalein",
  	"Pacific/Pago_Pago|Pacific/Midway",
  	"Pacific/Pago_Pago|Pacific/Samoa",
  	"Pacific/Pago_Pago|US/Samoa",
  	"Pacific/Palau|Etc/GMT-9",
  	"Pacific/Pohnpei|Pacific/Ponape",
  	"Pacific/Port_Moresby|Etc/GMT-10",
  	"Pacific/Tarawa|Etc/GMT-12",
  	"Pacific/Tarawa|Pacific/Funafuti",
  	"Pacific/Tarawa|Pacific/Wake",
  	"Pacific/Tarawa|Pacific/Wallis"
  ];
  var countries = [
  	"AD|Europe/Andorra",
  	"AE|Asia/Dubai",
  	"AF|Asia/Kabul",
  	"AG|America/Port_of_Spain America/Antigua",
  	"AI|America/Port_of_Spain America/Anguilla",
  	"AL|Europe/Tirane",
  	"AM|Asia/Yerevan",
  	"AO|Africa/Lagos Africa/Luanda",
  	"AQ|Antarctica/Casey Antarctica/Davis Antarctica/DumontDUrville Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Syowa Antarctica/Troll Antarctica/Vostok Pacific/Auckland Antarctica/McMurdo",
  	"AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia",
  	"AS|Pacific/Pago_Pago",
  	"AT|Europe/Vienna",
  	"AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Currie Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla",
  	"AW|America/Curacao America/Aruba",
  	"AX|Europe/Helsinki Europe/Mariehamn",
  	"AZ|Asia/Baku",
  	"BA|Europe/Belgrade Europe/Sarajevo",
  	"BB|America/Barbados",
  	"BD|Asia/Dhaka",
  	"BE|Europe/Brussels",
  	"BF|Africa/Abidjan Africa/Ouagadougou",
  	"BG|Europe/Sofia",
  	"BH|Asia/Qatar Asia/Bahrain",
  	"BI|Africa/Maputo Africa/Bujumbura",
  	"BJ|Africa/Lagos Africa/Porto-Novo",
  	"BL|America/Port_of_Spain America/St_Barthelemy",
  	"BM|Atlantic/Bermuda",
  	"BN|Asia/Brunei",
  	"BO|America/La_Paz",
  	"BQ|America/Curacao America/Kralendijk",
  	"BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco",
  	"BS|America/Nassau",
  	"BT|Asia/Thimphu",
  	"BW|Africa/Maputo Africa/Gaborone",
  	"BY|Europe/Minsk",
  	"BZ|America/Belize",
  	"CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Blanc-Sablon America/Toronto America/Nipigon America/Thunder_Bay America/Iqaluit America/Pangnirtung America/Atikokan America/Winnipeg America/Rainy_River America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Yellowknife America/Inuvik America/Creston America/Dawson_Creek America/Fort_Nelson America/Vancouver America/Whitehorse America/Dawson",
  	"CC|Indian/Cocos",
  	"CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi",
  	"CF|Africa/Lagos Africa/Bangui",
  	"CG|Africa/Lagos Africa/Brazzaville",
  	"CH|Europe/Zurich",
  	"CI|Africa/Abidjan",
  	"CK|Pacific/Rarotonga",
  	"CL|America/Santiago America/Punta_Arenas Pacific/Easter",
  	"CM|Africa/Lagos Africa/Douala",
  	"CN|Asia/Shanghai Asia/Urumqi",
  	"CO|America/Bogota",
  	"CR|America/Costa_Rica",
  	"CU|America/Havana",
  	"CV|Atlantic/Cape_Verde",
  	"CW|America/Curacao",
  	"CX|Indian/Christmas",
  	"CY|Asia/Nicosia Asia/Famagusta",
  	"CZ|Europe/Prague",
  	"DE|Europe/Zurich Europe/Berlin Europe/Busingen",
  	"DJ|Africa/Nairobi Africa/Djibouti",
  	"DK|Europe/Copenhagen",
  	"DM|America/Port_of_Spain America/Dominica",
  	"DO|America/Santo_Domingo",
  	"DZ|Africa/Algiers",
  	"EC|America/Guayaquil Pacific/Galapagos",
  	"EE|Europe/Tallinn",
  	"EG|Africa/Cairo",
  	"EH|Africa/El_Aaiun",
  	"ER|Africa/Nairobi Africa/Asmara",
  	"ES|Europe/Madrid Africa/Ceuta Atlantic/Canary",
  	"ET|Africa/Nairobi Africa/Addis_Ababa",
  	"FI|Europe/Helsinki",
  	"FJ|Pacific/Fiji",
  	"FK|Atlantic/Stanley",
  	"FM|Pacific/Chuuk Pacific/Pohnpei Pacific/Kosrae",
  	"FO|Atlantic/Faroe",
  	"FR|Europe/Paris",
  	"GA|Africa/Lagos Africa/Libreville",
  	"GB|Europe/London",
  	"GD|America/Port_of_Spain America/Grenada",
  	"GE|Asia/Tbilisi",
  	"GF|America/Cayenne",
  	"GG|Europe/London Europe/Guernsey",
  	"GH|Africa/Accra",
  	"GI|Europe/Gibraltar",
  	"GL|America/Nuuk America/Danmarkshavn America/Scoresbysund America/Thule",
  	"GM|Africa/Abidjan Africa/Banjul",
  	"GN|Africa/Abidjan Africa/Conakry",
  	"GP|America/Port_of_Spain America/Guadeloupe",
  	"GQ|Africa/Lagos Africa/Malabo",
  	"GR|Europe/Athens",
  	"GS|Atlantic/South_Georgia",
  	"GT|America/Guatemala",
  	"GU|Pacific/Guam",
  	"GW|Africa/Bissau",
  	"GY|America/Guyana",
  	"HK|Asia/Hong_Kong",
  	"HN|America/Tegucigalpa",
  	"HR|Europe/Belgrade Europe/Zagreb",
  	"HT|America/Port-au-Prince",
  	"HU|Europe/Budapest",
  	"ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
  	"IE|Europe/Dublin",
  	"IL|Asia/Jerusalem",
  	"IM|Europe/London Europe/Isle_of_Man",
  	"IN|Asia/Kolkata",
  	"IO|Indian/Chagos",
  	"IQ|Asia/Baghdad",
  	"IR|Asia/Tehran",
  	"IS|Atlantic/Reykjavik",
  	"IT|Europe/Rome",
  	"JE|Europe/London Europe/Jersey",
  	"JM|America/Jamaica",
  	"JO|Asia/Amman",
  	"JP|Asia/Tokyo",
  	"KE|Africa/Nairobi",
  	"KG|Asia/Bishkek",
  	"KH|Asia/Bangkok Asia/Phnom_Penh",
  	"KI|Pacific/Tarawa Pacific/Enderbury Pacific/Kiritimati",
  	"KM|Africa/Nairobi Indian/Comoro",
  	"KN|America/Port_of_Spain America/St_Kitts",
  	"KP|Asia/Pyongyang",
  	"KR|Asia/Seoul",
  	"KW|Asia/Riyadh Asia/Kuwait",
  	"KY|America/Panama America/Cayman",
  	"KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral",
  	"LA|Asia/Bangkok Asia/Vientiane",
  	"LB|Asia/Beirut",
  	"LC|America/Port_of_Spain America/St_Lucia",
  	"LI|Europe/Zurich Europe/Vaduz",
  	"LK|Asia/Colombo",
  	"LR|Africa/Monrovia",
  	"LS|Africa/Johannesburg Africa/Maseru",
  	"LT|Europe/Vilnius",
  	"LU|Europe/Luxembourg",
  	"LV|Europe/Riga",
  	"LY|Africa/Tripoli",
  	"MA|Africa/Casablanca",
  	"MC|Europe/Monaco",
  	"MD|Europe/Chisinau",
  	"ME|Europe/Belgrade Europe/Podgorica",
  	"MF|America/Port_of_Spain America/Marigot",
  	"MG|Africa/Nairobi Indian/Antananarivo",
  	"MH|Pacific/Majuro Pacific/Kwajalein",
  	"MK|Europe/Belgrade Europe/Skopje",
  	"ML|Africa/Abidjan Africa/Bamako",
  	"MM|Asia/Yangon",
  	"MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan",
  	"MO|Asia/Macau",
  	"MP|Pacific/Guam Pacific/Saipan",
  	"MQ|America/Martinique",
  	"MR|Africa/Abidjan Africa/Nouakchott",
  	"MS|America/Port_of_Spain America/Montserrat",
  	"MT|Europe/Malta",
  	"MU|Indian/Mauritius",
  	"MV|Indian/Maldives",
  	"MW|Africa/Maputo Africa/Blantyre",
  	"MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Mazatlan America/Chihuahua America/Ojinaga America/Hermosillo America/Tijuana America/Bahia_Banderas",
  	"MY|Asia/Kuala_Lumpur Asia/Kuching",
  	"MZ|Africa/Maputo",
  	"NA|Africa/Windhoek",
  	"NC|Pacific/Noumea",
  	"NE|Africa/Lagos Africa/Niamey",
  	"NF|Pacific/Norfolk",
  	"NG|Africa/Lagos",
  	"NI|America/Managua",
  	"NL|Europe/Amsterdam",
  	"NO|Europe/Oslo",
  	"NP|Asia/Kathmandu",
  	"NR|Pacific/Nauru",
  	"NU|Pacific/Niue",
  	"NZ|Pacific/Auckland Pacific/Chatham",
  	"OM|Asia/Dubai Asia/Muscat",
  	"PA|America/Panama",
  	"PE|America/Lima",
  	"PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier",
  	"PG|Pacific/Port_Moresby Pacific/Bougainville",
  	"PH|Asia/Manila",
  	"PK|Asia/Karachi",
  	"PL|Europe/Warsaw",
  	"PM|America/Miquelon",
  	"PN|Pacific/Pitcairn",
  	"PR|America/Puerto_Rico",
  	"PS|Asia/Gaza Asia/Hebron",
  	"PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores",
  	"PW|Pacific/Palau",
  	"PY|America/Asuncion",
  	"QA|Asia/Qatar",
  	"RE|Indian/Reunion",
  	"RO|Europe/Bucharest",
  	"RS|Europe/Belgrade",
  	"RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Astrakhan Europe/Volgograd Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
  	"RW|Africa/Maputo Africa/Kigali",
  	"SA|Asia/Riyadh",
  	"SB|Pacific/Guadalcanal",
  	"SC|Indian/Mahe",
  	"SD|Africa/Khartoum",
  	"SE|Europe/Stockholm",
  	"SG|Asia/Singapore",
  	"SH|Africa/Abidjan Atlantic/St_Helena",
  	"SI|Europe/Belgrade Europe/Ljubljana",
  	"SJ|Europe/Oslo Arctic/Longyearbyen",
  	"SK|Europe/Prague Europe/Bratislava",
  	"SL|Africa/Abidjan Africa/Freetown",
  	"SM|Europe/Rome Europe/San_Marino",
  	"SN|Africa/Abidjan Africa/Dakar",
  	"SO|Africa/Nairobi Africa/Mogadishu",
  	"SR|America/Paramaribo",
  	"SS|Africa/Juba",
  	"ST|Africa/Sao_Tome",
  	"SV|America/El_Salvador",
  	"SX|America/Curacao America/Lower_Princes",
  	"SY|Asia/Damascus",
  	"SZ|Africa/Johannesburg Africa/Mbabane",
  	"TC|America/Grand_Turk",
  	"TD|Africa/Ndjamena",
  	"TF|Indian/Reunion Indian/Kerguelen",
  	"TG|Africa/Abidjan Africa/Lome",
  	"TH|Asia/Bangkok",
  	"TJ|Asia/Dushanbe",
  	"TK|Pacific/Fakaofo",
  	"TL|Asia/Dili",
  	"TM|Asia/Ashgabat",
  	"TN|Africa/Tunis",
  	"TO|Pacific/Tongatapu",
  	"TR|Europe/Istanbul",
  	"TT|America/Port_of_Spain",
  	"TV|Pacific/Funafuti",
  	"TW|Asia/Taipei",
  	"TZ|Africa/Nairobi Africa/Dar_es_Salaam",
  	"UA|Europe/Simferopol Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye",
  	"UG|Africa/Nairobi Africa/Kampala",
  	"UM|Pacific/Pago_Pago Pacific/Wake Pacific/Honolulu Pacific/Midway",
  	"US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu",
  	"UY|America/Montevideo",
  	"UZ|Asia/Samarkand Asia/Tashkent",
  	"VA|Europe/Rome Europe/Vatican",
  	"VC|America/Port_of_Spain America/St_Vincent",
  	"VE|America/Caracas",
  	"VG|America/Port_of_Spain America/Tortola",
  	"VI|America/Port_of_Spain America/St_Thomas",
  	"VN|Asia/Bangkok Asia/Ho_Chi_Minh",
  	"VU|Pacific/Efate",
  	"WF|Pacific/Wallis",
  	"WS|Pacific/Apia",
  	"YE|Asia/Riyadh Asia/Aden",
  	"YT|Africa/Nairobi Indian/Mayotte",
  	"ZA|Africa/Johannesburg",
  	"ZM|Africa/Maputo Africa/Lusaka",
  	"ZW|Africa/Maputo Africa/Harare"
  ];
  var latest = {
  	version: version,
  	zones: zones,
  	links: links,
  	countries: countries
  };

  var latest$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    version: version,
    zones: zones,
    links: links,
    countries: countries,
    'default': latest
  });

  var require$$1 = getCjsExportFromNamespace(latest$1);

  var momentTimezone$1 = createCommonjsModule(function (module) {
  var moment = module.exports = momentTimezone;
  moment.tz.load(require$$1);
  });

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

    _createClass(Time, [{
      key: "toTimezone",
      value: function toTimezone(timezone) {
        return moment(this.milliseconds).tz(timezone).toDate();
      }
    }, {
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

    return Time;
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
      } // @property x: Number
      // x grid coordinate


      this.x = +x; // @property y: Number
      // y grid coordinate

      this.y = +y;
    }

    _createClass(XY, [{
      key: "toString",
      value: function toString() {
        return "".concat(this.x, ",").concat(this.y);
      }
    }]);

    return XY;
  }(); // @factory NOAA.xy(x: Number, y: Number): XY
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
  var ApiError = function ApiError(data) {
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
  };

  var Endpoint = /*#__PURE__*/function () {
    function Endpoint(path, format) {
      _classCallCheck(this, Endpoint);

      this.path = path;
      this.format = format;
    }

    _createClass(Endpoint, [{
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

    return Endpoint;
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

    _createClass(Geometry, [{
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

    return Geometry;
  }();
  function toGeometry(data) {
    return new Geometry(data);
  }

  /* @class Feature
   * @aka NOAA.Feature
   *
   * Represents base class for API GeoJSON responses.
   * */

  var Feature = function Feature(data) {
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
  };

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

    _createClass(Product, [{
      key: "getProductText",
      value: function getProductText() {
        return toProducts().getProduct(this.id);
      }
    }]);

    return Product;
  }();

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
      return moment(value).format();
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
    _inherits(Products, _Endpoint);

    var _super = _createSuper(Products);

    function Products() {
      _classCallCheck(this, Products);

      return _super.call(this, '/products');
    }
    /**
     * Returns a list of text products
     * @param {object} params
     */


    _createClass(Products, [{
      key: "get",
      value: function get(params) {
        var queryParams = {};
        Object.keys(Products.parameters).forEach(function (key) {
          if (key in params) {
            validateParameter(key, params[key], Products.parameters[key]);
            queryParams[key] = toQueryParamValue(params[key]);
          }
        });
        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, queryParams, function (data) {
          return Products.toProductList(data['@graph']);
        });
      }
      /**
       * Returns a specific text product
       * @param {string} id
       */

    }, {
      key: "getProduct",
      value: function getProduct(id) {
        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, [id], function (data) {
          return new Product(data);
        });
      }
      /**
       * Returns a list of valid text product types and codes
       */

    }, {
      key: "getTypes",
      value: function getTypes() {
        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, ['types'], function (data) {
          // return dictionary when typeId not specified
          return Products.toProductDictionary(data);
        });
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

        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, ['locations', locationId, 'types'], function (data) {
          // return dictionary
          return Products.toProductDictionary(data);
        });
      }
      /**
       * Returns a list of valid text product issuance locations
       */

    }, {
      key: "getLocations",
      value: function getLocations() {
        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, ['locations'], function (data) {
          return data['locations'];
        });
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

        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, ['types', typeId, 'locations'], function (data) {
          return data['locations'];
        });
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

        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, ['types', typeId], function (data) {
          // returns array
          return Products.toProductList(data['@graph']);
        });
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

        return _get(_getPrototypeOf(Products.prototype), "get", this).call(this, ['types', typeId, 'locations', locationId], function (data) {
          // returns array
          return Products.toProductList(data['@graph']);
        });
      }
    }]);

    return Products;
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
    }); // newest first

    products.sort(function (a, b) {
      if (a.issuanceTime.milliseconds == b.issuanceTime.milliseconds) {
        return 0;
      } else if (a.issuanceTime.milliseconds > b.issuanceTime.milliseconds) {
        return 1;
      }

      return -a;
    });
    return products;
  }; // @factory NOAA.glossary(): Products
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
  var ValueUnits = function ValueUnits(value, units) {
    _classCallCheck(this, ValueUnits);

    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    }

    this.value = value;
    this.unit = units;
  };

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
    _inherits(Observation, _Feature);

    var _super = _createSuper(Observation);

    function Observation(data) {
      var _this;

      _classCallCheck(this, Observation);

      _this = _super.call(this, data);
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

    return Observation;
  }(Feature);
  function observationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
      return new Observation(feature);
    });
  }

  /* class Stations implements /stations interface
   * */

  var Stations = /*#__PURE__*/function (_Endpoint) {
    _inherits(Stations, _Endpoint);

    var _super = _createSuper(Stations);

    function Stations() {
      _classCallCheck(this, Stations);

      return _super.call(this, '/stations');
    }
    /**
     * Returns a list of observation stations
     * @param {string|[string]} id
     * @param {string|[string]} state
     * @param {number} limit
     */


    _createClass(Stations, [{
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

        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, queryParameters, function (data) {
          return stationsToArray(data);
        });
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

        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, queryParameters, function (data) {
          return stationsToArray(data);
        });
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

        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, pathParameters, function (data) {
          return data;
        });
      }
    }, {
      key: "getStation",
      value: function getStation(id) {
        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, [id], function (data) {
          return new Station(data);
        });
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

        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, [id, 'observations'], queryParameters, function (data) {
          return observationsToArray(data).sort(function (a, b) {
            if (a.timestamp.milliseconds == b.timestamp.milliseconds) {
              return 0;
            }

            if (a.timestamp.milliseconds > b.timestamp.milliseconds) {
              return 1;
            }

            return -1;
          });
        });
      }
    }, {
      key: "getLatestObservations",
      value: function getLatestObservations(id) {
        validateParameter('id', id, {
          'type': 'string'
        });
        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, [id, 'observations', 'latest'], function (data) {
          return new Observation(data);
        });
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
        return _get(_getPrototypeOf(Stations.prototype), "get", this).call(this, [id, 'observations', time.toISOString()], function (data) {
          return new Observation(data);
        });
      }
    }]);

    return Stations;
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
    _inherits(Station, _Feature);

    var _super = _createSuper(Station);

    function Station(data) {
      var _this;

      _classCallCheck(this, Station);

      if (typeof data === 'string') {
        _this = _super.call(this, undefined);
        _this.id = data;
      } else {
        _this = _super.call(this, data);
        _this.elevation = toValueUnits(getFeatureProperty('elevation', data));
        _this.id = getFeatureProperty('stationIdentifier', data);
        _this.name = getFeatureProperty('name', data);
        _this.timeZone = getFeatureProperty('timeZone', data);
        _this.forecastZone = getUrlPart(getFeatureProperty('forecast', data, true), -1);
        _this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
        _this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
      }

      return _possibleConstructorReturn(_this);
    }

    _createClass(Station, [{
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

    return Station;
  }(Feature);
  function stationsToArray(data) {
    return featureCollectionToArray(data, function (feature) {
      return new Station(feature);
    });
  }

  var ZoneForecastPeriod = function ZoneForecastPeriod(data) {
    _classCallCheck(this, ZoneForecastPeriod);

    this.number = parseInt(getValue('number', data));
    this.name = getValue('name', data);
    this.detailedForecast = getValue('detailedForecast', data);
  };

  /* @class ZoneForecast
   * @aka NOAA.ZoneForecast
   *
   * Represents response from /zones/{type}/{zoneId}/forecast endpoint.
   * */

  var ZoneForecast = function ZoneForecast(data) {
    _classCallCheck(this, ZoneForecast);

    this.updated = toTime(getValue('updated', data));
    this.periods = [];

    if (data['periods']) {
      for (var i = 0; i < data['periods'].length; i++) {
        this.periods.push(new ZoneForecastPeriod(data['periods'][i]));
      }
    }
  };

  /* class Zones implements /zones interface
   * */

  var Zones = /*#__PURE__*/function (_Endpoint) {
    _inherits(Zones, _Endpoint);

    var _super = _createSuper(Zones);

    function Zones() {
      _classCallCheck(this, Zones);

      return _super.call(this, '/zones');
    }
    /**
     * Returns a list of zones
     * @param {object} params
     */


    _createClass(Zones, [{
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

        return _get(_getPrototypeOf(Zones.prototype), "get", this).call(this, queryParams, function (data) {
          return zonesToArray(data);
        });
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

        return _get(_getPrototypeOf(Zones.prototype), "get", this).call(this, [type], queryParams, function (data) {
          return zonesToArray(data);
        });
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
        return _get(_getPrototypeOf(Zones.prototype), "get", this).call(this, [type, id], function (data) {
          return new Zone(data);
        });
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
        return _get(_getPrototypeOf(Zones.prototype), "get", this).call(this, [type, id, 'forecast'], function (data) {
          return new ZoneForecast(data);
        });
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

        if (limit) {
          validateParameter('limit', limit, {
            'type': 'number'
          });
          queryParameters['limit'] = limit;
        }

        return _get(_getPrototypeOf(Zones.prototype), "get", this).call(this, ['forecast', id, 'observations'], function (data) {
          return new observationsToArray(data);
        });
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
        return _get(_getPrototypeOf(Zones.prototype), "get", this).call(this, ['forecast', id, 'stations'], function (data) {
          return stationsToArray(data);
        });
      }
    }]);

    return Zones;
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

    _createClass(Zone, [{
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

    return Zone;
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

    _createClass(Office, [{
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

    return Office;
  }();

  /* @class Point
   * @aka NOAA.Point
   *
   * Represents response from /points endpoint.
   * */

  var RelativeLocation = /*#__PURE__*/function (_Feature) {
    _inherits(RelativeLocation, _Feature);

    var _super = _createSuper(RelativeLocation);

    function RelativeLocation(data) {
      var _this;

      _classCallCheck(this, RelativeLocation);

      _this = _super.call(this, data);
      _this.city = getFeatureProperty('city', data);
      _this.state = getFeatureProperty('state', data);
      _this.distance = toValueUnits(getFeatureProperty('distance', data));
      _this.bearing = toValueUnits(getFeatureProperty('bearing', data));
      return _this;
    }

    return RelativeLocation;
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
      this.days = 0; //period parsing

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

    _createClass(ValidTimePeriod, [{
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

    return ValidTimePeriod;
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
    _inherits(GridPoint, _Feature);

    var _super = _createSuper(GridPoint);

    function GridPoint(data) {
      var _this;

      _classCallCheck(this, GridPoint);

      _this = _super.call(this, data);
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

    _createClass(GridPoint, [{
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

    return GridPoint;
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

  var ForecastPeriod = function ForecastPeriod(data) {
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
  };

  /* @class Forecast
   * @aka NOAA.Forecast
   *
   * Represents response from /gridpoints/{wfo}/{x},{y}/forecast endpoint.
   * */

  var Forecast = /*#__PURE__*/function (_Feature) {
    _inherits(Forecast, _Feature);

    var _super = _createSuper(Forecast);

    function Forecast(data) {
      var _this;

      _classCallCheck(this, Forecast);

      _this = _super.call(this, data);
      _this.updated = toTime(getFeatureProperty('updated', data));
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
  }(Feature);

  /* class GridPoints implements /gridpoints interface
   * */

  var GridPoints = /*#__PURE__*/function (_Endpoint) {
    _inherits(GridPoints, _Endpoint);

    var _super = _createSuper(GridPoints);

    /**
     * 
     * @param {string} weatherForecastOffice
     * @param {XY} xy
     */
    function GridPoints(weatherForecastOffice, xy) {
      var _this;

      _classCallCheck(this, GridPoints);

      _this = _super.call(this, '/gridpoints');
      _this.weatherForecastOffice = weatherForecastOffice;
      _this.xy = xy;
      return _this;
    }

    _createClass(GridPoints, [{
      key: "get",
      value: function get() {
        return _get(_getPrototypeOf(GridPoints.prototype), "get", this).call(this, [this.weatherForecastOffice, this.xy], function (data) {
          return new GridPoint(data);
        });
      }
    }, {
      key: "getForecast",
      value: function getForecast(units) {
        if (units === undefined) {
          units = 'us';
        }

        return _get(_getPrototypeOf(GridPoints.prototype), "get", this).call(this, [this.weatherForecastOffice, this.xy, 'forecast'], {
          'units': units
        }, function (data) {
          return new Forecast(data);
        });
      }
    }, {
      key: "getForecastHourly",
      value: function getForecastHourly(units) {
        if (units === undefined) {
          units = 'us';
        }

        return _get(_getPrototypeOf(GridPoints.prototype), "get", this).call(this, [this.weatherForecastOffice, this.xy, 'forecast', 'hourly'], {
          'units': units
        }, function (data) {
          return new Forecast(data);
        });
      }
    }, {
      key: "getStations",
      value: function getStations() {
        return _get(_getPrototypeOf(GridPoints.prototype), "get", this).call(this, [this.weatherForecastOffice, this.xy, 'stations'], function (data) {
          return stationsToArray(data);
        });
      }
    }]);

    return GridPoints;
  }(Endpoint); // @factory NOAA.gridPoints(weatherForecastOffice:string, x: number, y:number): GridPoints
  // Creates an object representing /gridpoints endpoint

  function toGridPoints(weatherForecastOffice, x, y) {
    return new GridPoints(weatherForecastOffice, toXY(x, y));
  }

  /* @class Alert
   * @aka NOAA.Alert
   *
   * Represents response from /points endpoint.
   * */

  var Alert = function Alert(data) {
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
  };

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

    _createClass(AlertCollection, [{
      key: "getNext",
      value: function getNext() {
        return toAlerts().getNext(this.next);
      }
    }]);

    return AlertCollection;
  }();

  /* class Alerts implements /alerts interface
   * */

  var Alerts = /*#__PURE__*/function (_Endpoint) {
    _inherits(Alerts, _Endpoint);

    var _super = _createSuper(Alerts);

    function Alerts() {
      _classCallCheck(this, Alerts);

      return _super.call(this, '/alerts');
    }

    _createClass(Alerts, [{
      key: "get",
      value: function get() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, toQueryParameters(params, Alerts.parameterOptions), function (data) {
          return new AlertCollection(data);
        });
      }
    }, {
      key: "getNext",
      value: function getNext(url) {
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, url, function (data) {
          return new AlertCollection(data);
        });
      }
    }, {
      key: "getActive",
      value: function getActive() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, ['active'], toQueryParameters(params, Alerts.parameterOptions), function (data) {
          return new AlertCollection(data);
        });
      }
    }, {
      key: "getTypes",
      value: function getTypes() {
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, ['types'], function (data) {
          return data['eventTypes'];
        });
      }
    }, {
      key: "getAlert",
      value: function getAlert(id) {
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, [id], function (data) {
          return new Alert(data);
        });
      }
    }, {
      key: "getActiveCount",
      value: function getActiveCount() {
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, ['active', 'count'], function (data) {
          return data;
        });
      }
    }, {
      key: "getZoneActive",
      value: function getZoneActive(zoneId) {
        return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, ['active', 'zone', zoneId], function (data) {
          return new AlertCollection(data);
        });
      }
    }, {
      key: "getAreaActive",
      value: function getAreaActive(area) {
        if (area in MarineAreaCodes || area in StateAreaCodes) {
          return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, ['active', 'area', area], function (data) {
            return new AlertCollection(data);
          });
        } else {
          throw new Error('Invalid area code (' + area + ')');
        }
      }
    }, {
      key: "getRegionActive",
      value: function getRegionActive(region) {
        if (region in RegionCodes) {
          return _get(_getPrototypeOf(Alerts.prototype), "get", this).call(this, ['active', 'region', region], function (data) {
            return new AlertCollection(data);
          });
        } else {
          throw new Error('Invalid region code (' + region + ')');
        }
      }
    }]);

    return Alerts;
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
    _inherits(Point, _Feature);

    var _super = _createSuper(Point);

    function Point(data) {
      var _this;

      _classCallCheck(this, Point);

      _this = _super.call(this, data);
      _this.xy = toXY(getFeatureProperty('gridX', data), getFeatureProperty('gridY', data));
      _this.office = new Office(getFeatureProperty('cwa', data));
      _this.forecastZone = getUrlPart(getFeatureProperty('forecastZone', data), -1);
      _this.timeZone = getFeatureProperty('timeZone', data);
      _this.radarStation = getFeatureProperty('radarStation', data);
      _this.relativeLocation = toRelativeLocation(getFeatureProperty('relativeLocation', data)); // optional properties

      _this.county = getUrlPart(getFeatureProperty('county', data, true), -1);
      _this.fireWeatherZone = getUrlPart(getFeatureProperty('fireWeatherZone', data, true), -1);
      return _this;
    }

    _createClass(Point, [{
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

    return Point;
  }(Feature);

  /* class Points implements /points interface
   * */

  var Points = /*#__PURE__*/function (_Endpoint) {
    _inherits(Points, _Endpoint);

    var _super = _createSuper(Points);

    /**
     * 
     * @param {LatLon} latlon
     */
    function Points(latlon) {
      var _this;

      _classCallCheck(this, Points);

      _this = _super.call(this, '/points');
      _this.latlon = toLatLon(latlon);
      return _this;
    }

    _createClass(Points, [{
      key: "get",
      value: function get() {
        return _get(_getPrototypeOf(Points.prototype), "get", this).call(this, [this.latlon], function (data) {
          return new Point(data);
        });
      }
    }, {
      key: "getStations",
      value: function getStations() {
        return _get(_getPrototypeOf(Points.prototype), "get", this).call(this, [this.latlon, 'stations'], function (data) {
          return stationsToArray(data);
        });
      }
    }]);

    return Points;
  }(Endpoint); // @factory NOAA.points(latlon: LatLon): Points
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
    _inherits(Glossary, _Endpoint);

    var _super = _createSuper(Glossary);

    function Glossary() {
      _classCallCheck(this, Glossary);

      return _super.call(this, '/glossary');
    }

    _createClass(Glossary, [{
      key: "get",
      value: function get() {
        return _get(_getPrototypeOf(Glossary.prototype), "get", this).call(this, function (data) {
          var terms = {};
          data['glossary'].forEach(function (term) {
            terms[term['term']] = term['definition'];
          });
          return terms;
        });
      }
    }]);

    return Glossary;
  }(Endpoint); // @factory NOAA.glossary(): Object
  // Creates a glossary term dictionary

  function toGlossary() {
    return new Glossary();
  }

  /* class Glossary implements /glossary interface
   * */

  var Icons = /*#__PURE__*/function (_Endpoint) {
    _inherits(Icons, _Endpoint);

    var _super = _createSuper(Icons);

    function Icons() {
      _classCallCheck(this, Icons);

      return _super.call(this, '/icons');
    }

    _createClass(Icons, [{
      key: "get",
      value: function get() {
        return _get(_getPrototypeOf(Icons.prototype), "get", this).call(this, function (data) {
          return data['icons'];
        });
      }
    }]);

    return Icons;
  }(Endpoint); // @factory NOAA.glossary(): Object
  // Creates a glossary term dictionary

  function toIcons() {
    return new Icons();
  }

  /* class Offices implements /alerts interface
   * */

  var Offices = /*#__PURE__*/function (_Endpoint) {
    _inherits(Offices, _Endpoint);

    var _super = _createSuper(Offices);

    function Offices(officeId) {
      var _this;

      _classCallCheck(this, Offices);

      _this = _super.call(this, '/offices');
      _this.officeId = officeId;
      return _this;
    }

    _createClass(Offices, [{
      key: "get",
      value: function get() {
        return _get(_getPrototypeOf(Offices.prototype), "get", this).call(this, [this.officeId], function (data) {
          return new Office(data);
        });
      }
    }, {
      key: "getHeadlines",
      value: function getHeadlines() {
        return _get(_getPrototypeOf(Offices.prototype), "get", this).call(this, [this.officeId, 'headlines'], function (data) {
          return data;
        });
      }
    }]);

    return Offices;
  }(Endpoint);
  /* @factory NOAA.offices(): Object
   *
   */

  function toOffices(officeId) {
    return new Offices(officeId);
  }

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
        'coordinates': [-159.356111111111005, 21.954444444444398]
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
        'coordinates': [-156.476666666667001, 20.895]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kawaihae',
        'id': 1617433
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-155.82936111132301, 20.036583333280401]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Hilo',
        'id': 1617760
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-155.055833333332998, 19.7302777777778]
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
        'coordinates': [-64.703305555555602, 32.373388888888897]
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
        'coordinates': [-75.042999999788094, 40.01194]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Burlington, Delaware River',
        'id': 8539094
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-74.873333333333306, 40.08]
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
        'coordinates': [-75.125027777883702, 39.93331]
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
        'coordinates': [-75.573305555555507, 39.558305555555599]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Brandywine Shoal Light',
        'id': 8555889
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.113333333333301, 38.98667]
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
        'coordinates': [-75.091666666666697, 38.32833]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Snow Hill',
        'id': 8571359
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-89.266777777777804, 30.3501388888889]
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
        'coordinates': [-76.236666666666693, 38.42833]
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
        'coordinates': [-76.578333333333305, 39.26667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Annapolis',
        'id': 8575512
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.481555555131706, 38.98328]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Solomons Island',
        'id': 8577330
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.451666666666696, 38.31667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lower Marlboro',
        'id': 8579542
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-76.683333333333294, 38.655]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Washington',
        'id': 8594900
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-77.021666666666704, 38.87333]
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
        'coordinates': [-75.686666666666696, 37.60667]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Kiptopeke',
        'id': 8632200
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-75.988444444338498, 37.16519]
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
        'coordinates': [-76.464444444444396, 37.996111111111098]
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
        'coordinates': [-76.478333333333296, 37.226666666666702]
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
        'coordinates': [-76.113333333333301, 36.966666666666697]
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
        'coordinates': [-75.746666666666698, 36.183333333333302]
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
        'coordinates': [-82.565555555555605, 27.636666666666699]
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
        'coordinates': [-82.552694444444398, 27.857777777777802]
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
        'coordinates': [-89.956666666666706, 29.2633333333333]
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
        'coordinates': [-90.368333333333297, 30.05]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'West Bank 1, Bayou Gauche',
        'id': 8762482
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-90.418333333333294, 29.776666666666699]
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
        'coordinates': [-122.298333333333005, 37.771666666666697]
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
        'coordinates': [-124.498277777566003, 42.73897]
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
        'coordinates': [-123.918944444391002, 45.55453]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Astoria',
        'id': 9439040
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-123.768305555582003, 46.20731]
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
        'coordinates': [-122.695472222221994, 45.631194444444503]
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
        'coordinates': [-123.966916666659998, 46.70747]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Westport',
        'id': 9441102
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-124.105083333121001, 46.90431]
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
        'coordinates': [-124.611666666667006, 48.36667]
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
        'coordinates': [-122.339305555555995, 47.60264]
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
        'coordinates': [-131.626194444232993, 55.33183]
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
        'coordinates': [-136.346944444444006, 58.19472]
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
        'coordinates': [-149.426666666666989, 60.12]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Seldovia',
        'id': 9455500
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-151.719944444497003, 59.44053]
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
        'coordinates': [-168.871305555767009, 52.94061]
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
        'coordinates': [-170.28516666666701, 57.125305555555599]
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
        'coordinates': [-64.724222222434193, 18.318249999947]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Lime Tree Bay',
        'id': 9751401
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-64.754027777777793, 17.68447]
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
        'coordinates': [-65.302472222116293, 18.30086]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Vieques Island',
        'id': 9752695
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-65.471361111005194, 18.09386]
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
        'coordinates': [-66.116416666242799, 18.45894]
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
        'coordinates': [-67.046416666242806, 17.97008]
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
        'coordinates': [-67.164583333333297, 18.45664]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'name': 'Mona Island',
        'id': 9759938
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [-67.938500000106004, 18.089916666878601]
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

  }; // Specify the type of data with the "product=" option parameter. 

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

  }; // Example: units=english

  var Units = {
    'metric': 'metric',
    //Metric(Celsius, meters, cm/ s) units
    'english': 'english' //English(fahrenheit, feet, knots) units

  }; // gmt, lst or lst_ldt.The time_zone can be specified with the "time_zone=" option parameter.
  // Example: time_zone = gmt
  // Retrieve data with GMT date / times.

  var TimeZone = {
    'gmt': 'gmt',
    //Greenwich Mean Time
    'lst': 'lst',
    //Local Standard Time.The time local to the requested station.
    'lst_ldt': 'lst_ldt' //Local Standard / Local Daylight Time.The time local to the requested station.

  }; //The interval for which Meteorological data is returned
  //Note! The default is 6 minute interval and there is no need to specify it.The hourly interval is supported for Met data and Predictions data only.
  //    Example: interval = h-- - Will retrieve hourly Met data 

  var Interval = {
    'h': 'h',
    //Hourly Met data and predictions data will be returned
    'hilo': 'hilo' //High/ Low tide predictions for subordinate stations.

  }; //Format
  //The output format can be specified with the "format=" option parameter.

  var Format = {
    'json': 'json',
    //Javascript Object Notation.This format is useful for direct import to a javascript plotting library.Parsers are available for other languages such as Java and Perl.
    'xml': 'xml',
    //Extensible Markup Language.This format is an industry standard for data.
    'csv': 'csv' //Comma Separated Values.This format is suitable for export to Microsoft Excel or other spreadsheet programs.This is also the most easily human - readable format.

  };

  var COOPSApi = /*#__PURE__*/function () {
    function COOPSApi(stationId, product) {
      var datum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var units = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'metric';

      _classCallCheck(this, COOPSApi);

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

    _createClass(COOPSApi, [{
      key: "formatDate",
      value: function formatDate(date) {
        return moment(date).utc().format('YYYYMMDD HH:mm');
      }
    }, {
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
        this.params['begin_date'] = this.formatDate(start);
        this.params['range'] = hours;
        return this.get();
      }
    }, {
      key: "getHoursBefore",
      value: function getHoursBefore(end, hours) {
        this.params['end_date'] = this.formatDate(end);
        this.params['range'] = hours;
        return this.get();
      }
    }, {
      key: "getDateRange",
      value: function getDateRange(start, end) {
        this.params['begin_date'] = this.formatDate(start);
        this.params['end_date'] = this.formatDate(end);
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
        return COOPSApi.url + '?' + Object.keys(params).map(function (key) {
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

    return COOPSApi;
  }();
  /** The API end point */

  COOPSApi.url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

  var Datums = /*#__PURE__*/function (_COOPSApi) {
    _inherits(Datums, _COOPSApi);

    var _super = _createSuper(Datums);

    function Datums(stationId) {
      _classCallCheck(this, Datums);

      return _super.call(this, stationId, DataProduct.datums, undefined, undefined, Units.metric);
    }

    _createClass(Datums, [{
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

    return Datums;
  }(COOPSApi);

  var Predictions = /*#__PURE__*/function (_COOPSApi) {
    _inherits(Predictions, _COOPSApi);

    var _super = _createSuper(Predictions);

    function Predictions(stationId, datum) {
      _classCallCheck(this, Predictions);

      if (!datum) {
        datum = Datum.STND;
      }

      return _super.call(this, stationId, DataProduct.predictions, datum, Interval.hilo, Units.metric);
    }

    _createClass(Predictions, [{
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

    return Predictions;
  }(COOPSApi);

  var Wind = /*#__PURE__*/function (_COOPSApi) {
    _inherits(Wind, _COOPSApi);

    var _super = _createSuper(Wind);

    function Wind(stationId, interval) {
      _classCallCheck(this, Wind);

      return _super.call(this, stationId, DataProduct.wind, undefined, interval, Units.metric);
    }

    _createClass(Wind, [{
      key: "parseResponse",
      value: function parseResponse(data) {
        return data;
      }
    }]);

    return Wind;
  }(COOPSApi);

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

  exports.Alerts = Alerts;
  exports.Endpoint = Endpoint;
  exports.Glossary = Glossary;
  exports.GridPoint = GridPoint;
  exports.Icons = Icons;
  exports.LatLon = LatLon;
  exports.MarineAreaCodes = MarineAreaCodes;
  exports.Offices = Offices;
  exports.Point = Point;
  exports.Points = Points;
  exports.Products = Products;
  exports.RegionCodes = RegionCodes;
  exports.StateAreaCodes = StateAreaCodes;
  exports.Stations = Stations;
  exports.TidesAndCurrents = TidesAndCurrents;
  exports.Time = Time;
  exports.XY = XY;
  exports.Zones = Zones;
  exports.alerts = toAlerts;
  exports.glossary = toGlossary;
  exports.icons = toIcons;
  exports.latLon = toLatLon;
  exports.offices = toOffices;
  exports.points = toPoints;
  exports.products = toProducts;
  exports.stations = toStations;
  exports.time = toTime;
  exports.xy = toXY;
  exports.zones = toZones;

  Object.defineProperty(exports, '__esModule', { value: true });

  var oldNOAA = window.NOAA;
  exports.noConflict = function() {
  	window.NOAA = oldNOAA;
  	return this;
  }

  // Always export us to window global (see #2364)
  window.NOAA = exports;

})));
//# sourceMappingURL=noaa.js.map
