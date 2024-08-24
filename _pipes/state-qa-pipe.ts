import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initLawAgreed'
})
export class StateQAPipe implements PipeTransform {

  transform(obj: any, key): any {
    if (key === 'lawAgreed' && typeof obj.lawAgreed === 'undefined') {
      obj.lawAgreed = false;
    }

    if (key === 'isWithholdingApplicable' && typeof obj.isWithholdingApplicable === 'undefined') {
      obj.isWithholdingApplicable = 'INIT';
    }

    if (key === 'isWithholdingActionAccepted' && typeof obj.isWithholdingActionAccepted === 'undefined') {
      obj.isWithholdingActionAccepted = 'INIT';
    }
    
    return true;
  }
}
