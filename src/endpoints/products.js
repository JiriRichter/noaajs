import { Endpoint } from './endpoint';
import { Product } from '../response/product';
import { validateParameter, toQueryParamValue } from './parameters';

/* class Glossary implements /glossary interface
 * */
export class Products extends Endpoint {
    constructor() {
        super('/products');
    }

    /**
     * Returns a list of text products
     * @param {object} params
     */
    get(params) {

        let queryParams = {};

        Object.keys(Products.parameters).forEach(function (key) {
            if (key in params) {
                validateParameter(key, params[key], Products.parameters[key]);
                queryParams[key] = toQueryParamValue(params[key]);
            }
        });

        return super.get(queryParams, function (data) {
            return Products.toProductList(data['@graph']);
        });
    }

    /**
     * Returns a specific text product
     * @param {string} id
     */
    getProduct(id) {
        return super.get([id], function (data) {
            return new Product(data);
        });
    }

    /**
     * Returns a list of valid text product types and codes
     */
    getTypes() {
        return super.get(['types'], function (data) {
            // return dictionary when typeId not specified
            return Products.toProductDictionary(data);
        });
    }

    /**
     * Returns a list of valid text product types for a given issuance location
     * @param {string} locationId
     */
    getLocationTypes(locationId) {
        if (!locationId) {
            throw new Error('Missing required locationId parameter');
        }
        return super.get(['locations', locationId, 'types'], function (data) {
            // return dictionary
            return Products.toProductDictionary(data);
        });
    }

    /**
     * Returns a list of valid text product issuance locations
     */
    getLocations() {
        return super.get(['locations'], function (data) {
            return data['locations'];
        });
    }

    /**
     * Returns a list of valid text product issuance locations for a given product type
     * @param {string} typeId
     */
    getTypeLocations(typeId) {
        if (!typeId) {
            throw new Error('Missing required typeId parameter');
        }
        return super.get(['types', typeId, 'locations'], function (data) {
            return data['locations'];
        });
    }

    /**
     * Returns a list of text products of a given type
     * @param {string} typeId
     */
    getTypeProducts(typeId) {
        if (!typeId) {
            throw new Error('Missing required typeId parameter');
        }
        return super.get(['types', typeId], function (data) {
            // returns array
            return Products.toProductList(data['@graph']);
        });
    }

    /**
     * Returns a list of text products of a given type for a given issuance location
     * @param {string} typeId
     * @param {string} locationId
     */
    getTypeAndLocationProducts(typeId, locationId) {
        if (!typeId) {
            throw new Error('Missing required typeId parameter');
        }
        if (!locationId) {
            throw new Error('Missing required locationId parameter');
        }

        return super.get(['types', typeId, 'locations', locationId], function (data) {
            // returns array
            return Products.toProductList(data['@graph']);
        });
    }
}

Products.parameters = {
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

Products.toProductDictionary = (data) => {
    let products = {};
    data['@graph'].forEach(function (product) {
        products[product['productCode']] = product['productName'];
    });
    return products;
};

Products.toProductList = (data) => {
    let products = [];
    data.forEach(function (product) {
        products.push(new Product(product));
    });
    return products;
};

// @factory NOAA.glossary(): Products
// Creates a glossary term dictionary
export function toProducts() {
    return new Products();
}