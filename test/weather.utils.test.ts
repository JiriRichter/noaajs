import { expect, test } from '@jest/globals';
import * as parameters from '../src/weather/api/parameters';
import { parseDate } from '../src/weather/data/utils';
import { millisecondsPerHour, Interval } from '../src/weather/data/interval';

test('formatDate', () => {

    const dateUtc = new Date('2025-02-15T15:46:00.000+0000');
    const datePst = new Date('2025-02-15T07:46:00.000-0800');

    expect(parameters.toQueryParamValue(dateUtc)).toEqual("20250215 15:46");
    expect(parameters.toQueryParamValue(datePst)).toEqual("20250215 15:46");
});


test('parseDate', () => {
    const date = parseDate("2025-04-04T09:11:18+00:00");
    expect(date.getTime()).toEqual(1743757878000);
});

test('ValidTime', () => {
    let validTime = new Interval("2025-04-04T03:00:00+00:00/P7DT22H");
    expect(validTime.totalHours).toEqual(7 * 24 + 22);
    let date = parseDate("2025-04-04T03:00:00+00:00");
    expect(validTime.startTime.getTime()).toEqual(date.getTime());
    expect(validTime.hours).toEqual(22);
    expect(validTime.days).toEqual(7);
    let dates = validTime.toDates();
    expect(dates.length).toEqual(7 * 24 + 22);
    expect(dates[0].getTime()).toEqual(date.getTime());
    for(let i = 1; i < dates.length; i++) {
        expect(dates[i].getTime()).toEqual(date.getTime() + (i * millisecondsPerHour));
    }

    validTime = new Interval("2025-04-04T03:00:00+00:00/PT1H");
    expect(validTime.totalHours).toEqual(1);
    date = parseDate("2025-04-04T03:00:00+00:00");
    expect(validTime.startTime.getTime()).toEqual(date.getTime());
    expect(validTime.hours).toEqual(1);
    expect(validTime.days).toEqual(0);
    dates = validTime.toDates();
    expect(dates.length).toEqual(1);
    expect(dates[0].getTime()).toEqual(date.getTime());
});