export function getStringValueFromUrl(url: string): string {
    let parts = url.split('/');
    return parts[parts.length - 1];
}

export function parseUnits(value: string): string {
    return value.split(':')[1];
}