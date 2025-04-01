import { expect, test } from '@jest/globals';
import * as utils from '../src/tidesandcurrents/utils';

test('formatDate', () => {

    const dateUtc = new Date('2025-02-15T15:46:00.000+0000');
    const datePst = new Date('2025-02-15T07:46:00.000-0800');

    expect(dateUtc.getTime()).toEqual(datePst.getTime());

    //YYYYMMDD HH:mm
    expect(utils.formatDate(dateUtc)).toEqual("20250215 15:46");
    expect(utils.formatDate(datePst)).toEqual("20250215 15:46");

});
