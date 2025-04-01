import { ApiError } from '../response/api-error';

class Endpoint {

    /** The API end point */
    static url = 'https://api.weather.gov';

    public path: string;

    constructor(path) {
        this.path = path;
    }

    async get(url?: string | Object, queryParameters?: object): Promise<any> {

        if (typeof url === "object") {
            url = this.constructUrl(url, queryParameters);
        }

        const response = await fetch(url as string, {
            method: 'GET',
            headers: {
              'Accept': 'application/geo+json'
            }
        });

        if (!response.ok) {
            return new ApiError(await response.json());
        }

        return await response.json();
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

export { Endpoint };