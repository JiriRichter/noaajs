/**
 * 
 * @param {object} data
 * @param {function} callback
 */
export function featureCollectionToArray(data, callback) {
    let array = [];
    data['features'].forEach(function (feature, index) {
        array.push(callback(feature, index));
    });
    return array;
}