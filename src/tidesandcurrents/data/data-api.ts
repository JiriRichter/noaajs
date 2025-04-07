import { createQueryString } from '../../utils/request';
import { QueryParameters } from './query-builder';

export class TidesAndCurrentsDataApi {

    /** The API end point */
    static base_url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

    constructor() {
    }

    protected async get(parameters: QueryParameters) : Promise<any> {

        const url = `${TidesAndCurrentsDataApi.base_url}?${createQueryString(parameters)}`;

        const response = await fetch(url);

        if (response.ok === false) {

            try {

                // {"error": {"message":" Wrong Unit:Unit cannot be null or empty  "}}
                const errorData = await response.json();
                if ('error' in errorData && 'message' in errorData['error']) {
                    throw new Error(errorData['error']['message']);
                }
            }
            catch {
                // ignore failure
            }

            throw new Error(`API responded with status ${response.status} (${response.statusText})`);
        }

        return await response.json();
    }
}