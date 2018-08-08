export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}
export function isString(value: any): value is string {
    return typeof value === 'string';
}
