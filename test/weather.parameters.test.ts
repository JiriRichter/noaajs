import { expect, test } from '@jest/globals';
import * as parameters from '../src/weather/endpoints/parameters';

test('formatDate', () => {

    const dateUtc = new Date('2025-02-15T15:46:00.000+0000');
    const datePst = new Date('2025-02-15T07:46:00.000-0800');

    expect(parameters.toQueryParamValue(dateUtc)).toEqual("20250215 15:46");
    expect(parameters.toQueryParamValue(datePst)).toEqual("20250215 15:46");
});
