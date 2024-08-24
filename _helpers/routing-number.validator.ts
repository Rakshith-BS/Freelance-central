import { AbstractControl, ValidationErrors } from '@angular/forms';

export const routingNumberValidator = (): ((AbstractControl) => ValidationErrors | null) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const targetValue = control.value;

    if (!targetValue) {
        return null;
    }

    const digits = targetValue.split('').map(d => parseInt(d, 10));        
    const checksum = 3 * (digits[0] + digits[3] + digits[6]) + 7 * (digits[1] + digits[4] + digits[7]) + (digits[2] + digits[5] + digits[8]);

    return (checksum % 10 === 0) ? null : { routingnumber: true };
  };
};