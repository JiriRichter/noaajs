import { ApiBase } from './base';
import { AlertPage } from '../data/alert-page';
import { createQueryString } from '../../utils/request';

enum AlertStatus {
    'actual' = 'actual',
    'exercise' = 'exercise',
    'system' = 'system',
    'test' = 'test',
    'draft' = 'draft'
};

enum AlertMessageType {
    'alert' = 'alert',
    'update' = 'update',
    'cancel' = 'cancel'
};

enum AlertRegionType {
    'land' = 'land',
    'marine' = 'marine'
};

enum AlertUrgency {
    'unknown' = 'unknown',
    'past' = 'past',
    'future' = 'future',
    'expected' = 'expected',
    'immediate' = 'immediate'
};

enum AlertSeverity {
    'unknown' = 'unknown',
    'minor' = 'minor',
    'moderate' = 'moderate',
    'severe' = 'severe',
    'extreme' = 'extreme'
};

enum AlertCertainty {
    'unknown' = 'unknown',
    'unlikely' = 'unlikely',
    'possible' = 'possible',
    'likely' = 'likely',
    'observed' = 'observed'
};

export class AlertsApi extends ApiBase {

    constructor() {
        super();
    }

    async getAll (
        startTime?: string,
        endTime?: string, 
        status?: AlertStatus[],
        messageType?: AlertMessageType[],
        limit: number = 500) : Promise<AlertPage> {

        const data = super.get(`alerts?${this.getQueryString(startTime, endTime, status, messageType, limit)}`);
        return new AlertPage(data);
    }

    async getActive(
        startTime?: string,
        endTime?: string, 
        status?: AlertStatus[],
        messageType?: AlertMessageType[],
        limit: number = 500): Promise<AlertPage> {

            const data = super.get(`alerts/active?${this.getQueryString(startTime, endTime, status, messageType, limit)}`);
            return new AlertPage(data);
        }

    async getNext(page: AlertPage): Promise<AlertPage> {
        const data = super.getNext(page);
        return new AlertPage(data);
    } 

    private getQueryString(
        startTime?: string,
        endTime?: string, 
        status?: AlertStatus[],
        messageType?: AlertMessageType[],
        limit: number = 500) : string {

            const parameters = {};
            if (startTime) {
                parameters['startTime'] = startTime;
            }
            if (endTime) {
                parameters['endTime'] = startTime;
            }
            if (status) {
                parameters['status'] = status.join(',');
            }

            return createQueryString(parameters);
    }

}