import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class LambValidatorsService {

    constructor() { }

    /**
     * Validador que acepta solo números positivos.
     * @param control
     */
    positiveNumber(control: AbstractControl): ValidationErrors {
        let error = null;
        const regexp = /^[0-9]*$/;
        if (control.value !== undefined
            && !regexp.test(control.value) && (isNaN(control.value) || control.value <= 0)) {
            error = {
                'positiveNumber': {
                    valid: false,
                },
            };
        }
        return error;
    }

    /**
     * Validadtor que acepta solo numeros.
     * @param control
     */
    number(control: AbstractControl): ValidationErrors {
        let error = null;
        const regexp = /^[0-9]*$/;
        if (control.value !== undefined && !regexp.test(control.value) && isNaN(control.value)) {
            error = {
                'number': '...',
            };
        }
        return error;
    }

    /**
     * Validadtor que acepta números no negativos.
     * @param control
     */
    notNegativeNumber(control: AbstractControl): ValidationErrors {
        let error = null;
        const regexp = /^[0-9]+([.][0-9]+)?$/;
        if (control.value !== undefined && !regexp.test(control.value)
            && (isNaN(control.value) || control.value <= 0)) {
            error = {
                'notNegativeNumber': {
                    valid: false,
                },
            };
        }
        return error;
    }

    /**
     * Validador que acepta numeros y letras en mayuscula
     * @param control
     */
    uppercase(control: AbstractControl): ValidationErrors {
        let error = null;
        const regexp = /^[A-Z0-9\s]*$/;
        if (control.value !== undefined && !regexp.test(control.value)) {
            error = {
                'uppercase': {
                    valid: false,
                },
            };
        }
        return error;
    }


    /**
     * Validador que acepta numeros y letras en minuscula
     * @param control
     */
    lowercase(control: AbstractControl): ValidationErrors {
        let error = null;
        const regexp = /^[a-z0-9\s]*$/;
        if (control.value !== undefined && !regexp.test(control.value)) {
            error = {
                'lowercase': {
                    valid: false,
                },
            };
        }
        return error;
    }

    /**
     * Validator que no acepta espacios en blanco.
     * @param control
     */
    empty(control: AbstractControl): ValidationErrors {
        let error = null;
        // const regexp = /(.|\s)*\S(.|\s)*/;
        const regexp = /^$|\s+/;
        if (control.value !== undefined && regexp.test(control.value)) {
            error = {
                'empty': {
                    valid: false,
                },
            };
        }
        return error;
    }

    birthYear(control: AbstractControl): ValidationErrors {
        const numValue = Number(control.value);
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 85;
        const maxYear = currentYear - 18;
        const isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
        const message = {
            'years': {
                'message': 'The year must be a valid number between ' + minYear + ' and ' + maxYear,
            },
        };

        return isValid ? null : message;
    }

}
