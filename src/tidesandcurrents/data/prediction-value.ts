export enum PredictionValueType {
    'High' = 'H',
    'Low' = 'L'
}
export class PredictionValue {

    public time: Date;
    public value: number;
    public type?: PredictionValueType

    constructor(data: any) {

        

    }
}