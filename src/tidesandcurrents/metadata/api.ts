import { appendQueryString } from "../../utils/request";
import { StationType } from "./station-type";

export class TidesAndCurrentsMetadataApi {

    static baseUrl: string = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi';

    constructor() {
    }

    async stations(type?: StationType) : Promise<TidesAndCurrentsStation[]> {

        let relativeUrl: string = 'stations.json';

        if (type) {
            relativeUrl = appendQueryString(relativeUrl, { type: type });
        }

        const response = await this.get(relativeUrl);
        return (response as TidesAndCurrentsStationsResponse).stations;
    }

    async station(id: TidesAndCurrentsStationId) : Promise<TidesAndCurrentsStation> {

        let relativeUrl: string = `stations/${id}.json`;

        const response = await this.get(relativeUrl);
        const stations = (response as TidesAndCurrentsStationsResponse).stations;

        if (stations && stations.length === 1) {
            return stations[0];
        }

        throw new Error(`API did not return any data for station id ${id}`);
    }    

    private async get(relativeUrl: string) : Promise<unknown> {
        const url = `${TidesAndCurrentsMetadataApi.baseUrl}/${relativeUrl}`;
        const response = await fetch(url);

        if (response.ok === false) {

            let errorMessage: string | null = null;

            try {
                const errorData = await response.json();
                if ('errorMsg' in errorData) {
                    errorMessage = errorData.errorMsg;
                }
            }
            catch {
                // ignore failure
            }

            throw new Error(errorMessage ?? `API responded with status ${response.status} (${response.statusText})`);
        }

        return await response.json();
    }
}
