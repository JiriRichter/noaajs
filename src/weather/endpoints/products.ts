import { Endpoint } from './endpoint';
import { Product } from '../response/product';
import { validateParameter, toQueryParamValue } from './parameters';

/* class Glossary implements /glossary interface
 * */
export class Products extends Endpoint {

    static parameters = {
        'location': {
            'type': 'string',
            'allowArray': true
        },
        'start': {
            'type': 'Date',
            'allowArray': false
        },
        'end': {
            'type': 'Date',
            'allowArray': false
        },
        'office': {
            'type': 'string',
            'allowArray': true
        },
        'wmoid': {
            'type': 'string',
            'allowArray': true
        },
        'type': {
            'type': 'string',
            'allowArray': true
        },
        'limit': {
            'type': 'number',
            'allowArray': true
        }
    };

    constructor() {
        super('/products');
    }

    /**
     * Returns a list of text products
     * @param {object} params
     */
    async get(params) {

        let queryParams = {};

        Object.keys(Products.parameters).forEach(function (key) {
            if (key in params) {
                validateParameter(key, params[key], Products.parameters[key]);
                queryParams[key] = toQueryParamValue(params[key]);
            }
        });

        const data = await super.get(queryParams);
        return Products.toProductList(data['@graph']);
    }

    /**
     * Returns a specific text product
     * @param {string} id
     */
    async getProduct(id) {
        const data = await super.get([id]);
            return new Product(data);
    }

    /**
     * Returns a list of valid text product types and codes
     */
    async getTypes() {
        const data = await super.get(['types']);
            // return dictionary when typeId not specified
        return Products.toProductDictionary(data);
    }

    /**
     * Returns a list of valid text product types for a given issuance location
     * @param {string} locationId
     */
    async getLocationTypes(locationId) {
        if (!locationId) {
            throw new Error('Missing required locationId parameter');
        }
        const data = await super.get(['locations', locationId, 'types']);
            // return dictionary
        return Products.toProductDictionary(data);
    }

    /**
     * Returns a list of valid text product issuance locations
     */
    async getLocations() {
        const data = await super.get(['locations']);
        return data['locations'];
    }

    /**
     * Returns a list of valid text product issuance locations for a given product type
     * @param {string} typeId
     */
    async getTypeLocations(typeId) {
        if (!typeId) {
            throw new Error('Missing required typeId parameter');
        }
        const data = await super.get(['types', typeId, 'locations']);
        return data['locations'];
    }

    /**
     * Returns a list of text products of a given type
     * @param {string} typeId
     */
    async getTypeProducts(typeId) {
        if (!typeId) {
            throw new Error('Missing required typeId parameter');
        }
        const data = await super.get(['types', typeId]);
            // returns array
        return Products.toProductList(data['@graph']);
    }

    /**
     * Returns a list of text products of a given type for a given issuance location
     * @param {string} typeId
     * @param {string} locationId
     */
    async getTypeAndLocationProducts(typeId, locationId) {
        if (!typeId) {
            throw new Error('Missing required typeId parameter');
        }
        if (!locationId) {
            throw new Error('Missing required locationId parameter');
        }

        const data = await super.get(['types', typeId, 'locations', locationId]);
            // returns array
        return Products.toProductList(data['@graph']);
    }

    static toProductList = (data) => {
        let products: Product[] = [];
        data.forEach(function (product) {
            products.push(new Product(product));
        });
    
        // newest first
        products.sort((a, b) => {
            if (a.issuanceTime.milliseconds == b.issuanceTime.milliseconds) {
                return 0;
            } else if (a.issuanceTime.milliseconds > b.issuanceTime.milliseconds) {
                return 1;
            }
            return -a;
        });
    
        return products;
    };

    static toProductDictionary = (data) => {
        let products = {};
        data['@graph'].forEach(function (product) {
            products[product['productCode']] = product['productName'];
        });
        return products;
    };
    
}

// @factory NOAA.glossary(): Products
// Creates a glossary term dictionary
export function toProducts() {
    return new Products();
}