function validateProperty(key: string, data: any) {
    if (!(key in data)) {
        throw new Error(`Required property ${key} is not present in JSON data`);
    }    
}

export function getProperty(key: string, data: any = false): any {
    validateProperty(key, data);
    return data[key];
}

export function getStringValue(key: string, data: any = false): string {
    validateProperty(key, data);
    return getProperty(key, data) as string;
}

export function getFloatValue(key: string, data: any = false): number {
    validateProperty(key, data);
    return parseFloat(getStringValue(key, data));
}

export function getIntValue(key: string, data: any = false): number {
    validateProperty(key, data);
    return parseInt(getStringValue(key, data));
}

export function getBoolValue(key: string, data: any = false): boolean {
    validateProperty(key, data);
    return getProperty(key, data) as boolean;
}

export function parseDate(value: string): Date {
    return new Date(Date.parse(value));
}

export function getDateValue(key: string, data: any = false): Date {
    validateProperty(key, data);
    return parseDate(getStringValue(key, data));
}