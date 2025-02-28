import { Endpoint } from './endpoint';

/* class Glossary implements /glossary interface
 * */
export class Glossary extends Endpoint {
    constructor() {
        super('/glossary');
    }

    get() {
        return super.get(function (data) {
            let terms = {};
            data['glossary'].forEach(function (term) {
                terms[term['term']] = term['definition'];
            });
            return terms;
        });
    }
}

// @factory NOAA.glossary(): Object
// Creates a glossary term dictionary
export function toGlossary() {
    return new Glossary();
}