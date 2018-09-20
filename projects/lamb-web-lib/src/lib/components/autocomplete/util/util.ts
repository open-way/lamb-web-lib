export function toString(value: any): string {
    return (value !== undefined && value !== null) ? `${value}` : '';
}

export function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}
