/* @preserve
 * Leaflet 1.0.0+master.37d71c9, a JS library for https://www.weather.gov/documentation/services-web-api.
 * (c) 2019-2020 Jiri Richter
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.L = {}));
}(this, function (exports) { 'use strict';

    class Error {
        constructor() {
        }
    }

    exports.Error = Error;

    Object.defineProperty(exports, '__esModule', { value: true });

    var oldNOAA = window.NOAA;
    exports.noConflict = function() {
    	window.NOAA = oldNOAA;
    	return this;
    }

    // Always export us to window global (see #2364)
    window.NOAA = exports;

}));
//# sourceMappingURL=index.js.map
