import { getProperty, getStringValue } from "../../utils/json";
import { getStringValueFromUrl } from "./utils";

export class Office {

    id: string;
    name: string;
    address: any;
    telephone: string;
    fax: string;
    email: string;
    url: string;
    nwsRegion: string;
    parentOrganization: string;
    responsibleCounties: string[];
    responsibleForecastZones: string[];
    responsibleFireZones: string[];
    approvedObservationStations: string[];
    
    constructor(data: any) {

        this.id = getStringValue('id', data);
        this.name = getStringValue('name', data);
        this.address = getStringValue('address', data);
        this.telephone = getStringValue('telephone', data);
        this.fax = getStringValue('faxNumber', data);
        this.email = getStringValue('email', data);
        this.url = getStringValue('sameAs', data);
        this.nwsRegion = getStringValue('nwsRegion', data);
        this.parentOrganization = getStringValueFromUrl(getStringValue('parentOrganization', data));

        this.responsibleCounties = getValues('responsibleCounties', data);
        this.responsibleForecastZones = getValues('responsibleForecastZones', data);
        this.responsibleFireZones = getValues('responsibleFireZones', data);
        this.approvedObservationStations = getValues('approvedObservationStations', data);
    }
}

function getValues(propertyName: string, data: any): string[] {
    return (getProperty(propertyName, data) as string[]).map(x => getStringValueFromUrl(x))

}