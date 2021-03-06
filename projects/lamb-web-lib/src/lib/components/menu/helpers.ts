
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export function convertToBoolProperty(val: any): boolean {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();

        return (val === 'true' || val === '');
    }

    return !!val;
}

export function getElementHeight(el) {
    const style = window.getComputedStyle(el);
    const marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
    const marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
    return el.offsetHeight + marginTop + marginBottom;
}
