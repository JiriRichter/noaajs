import { Endpoint } from './endpoint';

/* class Glossary implements /glossary interface
 * */
export class Icons extends Endpoint {
    constructor() {
        super('/icons');
    }

    get() {
        return super.get(function (data) {
            return data['icons'];
        });
    }


}

// @factory NOAA.glossary(): Object
// Creates a glossary term dictionary
export function toIcons() {
    return new Icons();
}