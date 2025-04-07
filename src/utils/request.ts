export function createQueryString(params: {[index: string]: any}) {
    
    if (params) {
        return Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    }

    return '';
}

export function appendQueryString(uri: string, params: {[index: string]: any}) {

    const query = createQueryString(params);

    if (query) {
        return `${uri}?${query}`;
    }

    return uri;
}