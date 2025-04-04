export function getUrlPart(url: string, index: number): string {
    let parts = url.split('/');
    if (index < 0) {
        return parts[parts.length + index];
    }
    return parts[index];
}

export function getProperty(key: string, data: any, optional: boolean = false): any {
    if (!optional && !(key in data)) {
        throw new Error('Invalid property name: ' + key);
    }
    return data[key];
}

export function getStringValue(key: string, data: any, optional: boolean = false): string {
    return getProperty(key, data, optional) as string;
}

export function getNumberValue(key: string, data: any, optional: boolean = false): number {
    return getProperty(key, data, optional) as number;
}

export function getIntValue(key: string, data: any, optional: boolean = false): number {
    return parseInt(getStringValue(key, data, optional));
}

export function getBoolValue(key: string, data: any, optional: boolean = false): boolean {
    return getStringValue(key, data, optional) === "true";
}

export function parseDate(value: string): Date {
    return new Date(Date.parse(value));
}

export function getDateValue(key: string, data: any, optional: boolean = false): Date {
    return parseDate(getStringValue(key, data));
}

export function parseUnits(value: string): string {
    return value.split(':')[1];
}