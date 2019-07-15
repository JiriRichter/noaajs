import moment from 'moment';
import { LatLon, toLatLon } from '../utils/latlon';

/**
 * Validates API parameter
 * @param {string} name
 * @param {any} value
 * @param {object} validateOptions
 */
export function validateParameter(name, value, validateOptions) {
    if (Array.isArray(value)) {
        if (!validateOptions['allowArray']) {
            throw new Error(name + ' parameter does not allow array of values');
        }
        for (let i = 0; i < value.length; i++) {
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
                if (!(value instanceof LatLon)) {
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

export function toQueryParamValue(value) {
    if (value instanceof Date) {
        return moment(value).format();
    }

    if (Array.isArray(value)) {
        return value.join(',');
    }
    else {
        return value.toString();
    }
}

export function toQueryParameters(params, parameterOptions) {
    let queryParams = {},
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
        }
        else {
            queryParams[key] = toQueryParamValue(params[key]);
        }
    });
    return queryParams;
}