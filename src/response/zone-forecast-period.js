export class ZoneForecastPeriod {
    constructor(data) {
        this.number = parseInt(data['number']);
        this.name = data['name'];
        this.detailedForecast = data['detailedForecast'];
    }
}