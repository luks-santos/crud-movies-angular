import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if(field?.hasError('min')) {
      return 'O ano mínimo permitido é 1888. Por favor, insira um ano igual ou posterior a 1888.'
    }

    if(field?.hasError('max')) {
      return 'O ano máximo permitido é 9999. Por favor, insira um ano igual ou inferior a 9999.'
    }

    if(field?.hasError('minlength')) {
      const requiredLength : number = field.errors ? field.errors['minlength']['requiredLength'] : 7;
      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength : number = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `O tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string,
    fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray?.hasError('required') && formArray.touched;
  }
}
