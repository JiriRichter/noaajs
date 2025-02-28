import { ApiError } from '../response/api-error';

class Endpoint {
    constructor(path, format) {
        this.path = path;
        this.format = format;
    }

    get() {
        let urlParameters, queryParameters, parser, url;

        for (let i = 0; i < arguments.length; i++) {
            if (Array.isArray(arguments[i])) {
                urlParameters = arguments[i];
            }
            else if (typeof arguments[i] === 'function') {
                parser = arguments[i];
            }
            else if (typeof arguments[i] === 'string') {
                url = arguments[i];
            }
            else if (arguments[i] instanceof Object) {
                queryParameters = arguments[i];
            }
        }

        if (parser === undefined) {
            parser = this.parseResponse;
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            if (url === undefined) {
                url = this.constructUrl(urlParameters, queryParameters);
            }

            xhr.open('GET', url);

            if (this.format) {
                xhr.setRequestHeader('Accept', Endpoint.formats[this.format]);
            }
            else {
                xhr.setRequestHeader('Accept', Endpoint.formats['GeoJSON']);
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(parser(JSON.parse(xhr.response)));
                } else {
                    reject(new ApiError(JSON.parse(xhr.response)));
                }
            };

            xhr.onerror = () => {
                reject(xhr);
            };

            xhr.send();
        });
    }

    parseResponse(data) {
        return data;
    }

    constructUrl(urlParameters, queryParameters) {
        let url = Endpoint.url;
        if (this.path[0] !== '/') {
            url += '/';
        }
        url += this.path;
        if (urlParameters && Array.isArray(urlParameters)) {
            let first = (url.slice(-1) === '/');
            urlParameters.forEach(function (value) {
                url += (first ? '': '/') + encodeURIComponent(value.toString());
                first = false;
            });
        }
        if (queryParameters && queryParameters instanceof Object) {
            let first = true;
            url += '?';
            Object.keys(queryParameters).forEach(function (key) {
                url += (first ? '' : '&') + key + '=' + encodeURIComponent(queryParameters[key]);
                first = false;
            });
        }
        return url;
    }
}

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

export { Endpoint };