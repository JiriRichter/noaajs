import { ApiError } from '../data/api-error';
import { DataPage } from '../data/data-page';

export class ApiBase {

    /** The API end point */
    private static base_url = 'https://api.weather.gov';

    constructor() {
    }

    private async fetch(absoluteUrl: string): Promise<any> {    
        const response = await fetch(absoluteUrl as string, {
            method: 'GET',
            headers: {
              'Accept': 'application/geo+json'
            }
        });

        if (!response.ok) {
            const error = new ApiError(await response.json());
            throw new Error(error.detail);
        }

        return await response.json();
    }

    protected async get(relativeUrl: string): Promise<any> {

        return this.fetch(`${ApiBase.base_url}/${relativeUrl}`);

    }

    protected async getNext(page: DataPage): Promise<any> {

        return this.fetch(page.nextPageUrl);

    }
}