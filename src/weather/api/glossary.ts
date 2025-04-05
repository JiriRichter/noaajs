import { ApiBase } from './base';

type Glossary = { [index: string] : string };

export class GlossaryApi extends ApiBase {
    constructor() {
        super();
    }

    async getGlossary(): Promise<Glossary> {
        const data = await super.get("glossary");

        return data['glossary'].reduce(
            (glossary: Glossary, term: any) => {
                if (term['term'] && term['definition']) {
                    glossary[term['term']] = term['definition']
                }
                return glossary;
            },
            {});
    }
}