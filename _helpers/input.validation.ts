import { Injectable } from '@angular/core';

export const InputValidationConstants = {
    REGEX: {
        EMAIL: /^(([\w-\s]+)|([\w-]+(?:\.[\w-]+)*)|([\w-\s]+)([\w-]+(?:\.[\w-])*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
        PASSWORD: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}',
        PHONE_0_OR_10_LEN: /^[]{0}$|^[0-9]{10}/
    }
}

@Injectable({ providedIn: 'root'})
export class InputValidation {
    numericOnly(event): boolean {
        let patt = /^([0-9])$/;
        let result = patt.test(event.key);
        return result;
    }

    numericSpaceOnly(event): boolean {
        let patt = /^([0-9 ])$/;
        let result = patt.test(event.key);
        return result;
    }

    numericDotOnly(event): boolean {
        let patt = /^([0-9.])$/;
        let result = patt.test(event.key);
        return result;
    }

    alphaNumericOnly(event): boolean {
        let patt = /^\w+$/;
        let result = patt.test(event.key);
        return result;
    }

    alphaNumericAndSpecialCharOnly(event): boolean {
        let patt = /^[a-zA-Z0-9()&#-', ]*$/;
        let result = patt.test(event.key);
        return result;
    }

    alphabetsAndSpaceOnly(event): boolean {
        let patt = /^[a-zA-Z ]*$/;
        let result = patt.test(event.key);
        return result;
    }

    emailValidator(email:string): boolean {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!EMAIL_REGEXP.test(email)) {
            return false;
        }
        return true; 
    }

}