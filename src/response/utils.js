/**
 * Exctrats URL component
 * @param {String} url
 * @param {number} index
 */
export function getUrlPart(url, index) {
    if (!url) {
        return null;
    }
    let parts = url.split('/');
    if (index < 0) {
        return parts[parts.length + index];
    }
    return parts[index];
}


/**
 * Gets value from dictionary object
 * @param {string} key
 * @param {object} data
 * @param {boolean?} optional
 */
export function getValue(key, data, optional = false) {
    if (!optional && !(key in data)) {
        throw new Error('Invalid property name: ' + key);
    }
    return data[key];
}

/**
 * Gets feature property
 * @param {string} key
 * @param {object} data
 * @param {boolean?} optional
 */
export function getFeatureProperty(key, data, optional = false) {
    return getValue(key, data['properties'], optional);
}
