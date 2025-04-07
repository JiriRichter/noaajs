export enum TidesAndCurrentsDateRangeDate {
    'today' = 'today',
    'latest' = 'latest',
    'recent' = 'recent'
}

export type TidesAndCurrentsDateRangeParameters = {
    begin_date?: Date;
    end_date?: Date;
    range?: number;
    date?: TidesAndCurrentsDateRangeDate;
}

export const TidesAndCurrentsDateRange: {
    latest: () => TidesAndCurrentsDateRangeParameters,
    recent: () =>TidesAndCurrentsDateRangeParameters,
    today: () =>TidesAndCurrentsDateRangeParameters,
} = {
    latest: () => {
        return {
            date: TidesAndCurrentsDateRangeDate.latest
        }
    },

    recent: () => {
        return {
            date: TidesAndCurrentsDateRangeDate.recent
        }
    },
    
    today: () => {
        return {
            date: TidesAndCurrentsDateRangeDate.today
        }
    },
    
    // lastHours(hours: number) : TidesAndCurrentsDataApi {
    //     this.parameters.range = hours;
    //     return this;
    // }

    // hoursAfter(beginDate: Date, hours: number) : TidesAndCurrentsDataApi {
    //     this.parameters.begin_date = formatDate(beginDate);
    //     this.parameters.range = hours;
    //     return this;
    // }    
    
    // hoursBefore(endDate: Date, hours: number) : TidesAndCurrentsDataApi {
    //     this.parameters.end_date = formatDate(endDate);
    //     this.parameters.range = hours;
    //     return this;
    // }       

    // dateRange(beginDate: Date, endDate: Date) : TidesAndCurrentsDataApi {
    //     this.parameters.begin_date = formatDate(beginDate);
    //     this.parameters.end_date = formatDate(endDate);
    //     return this;
    // }
}