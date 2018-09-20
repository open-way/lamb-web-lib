import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class LambToolsService {

  constructor() { }

  public getControl(form: FormGroup, controlName: string): AbstractControl {
    return form.controls[controlName];
  }

  public hasChanges(control: AbstractControl): boolean {
    return control && (control.dirty || control.touched);
  }

  public mustShowErrors(form: FormGroup, controlName: string) {
    let hasErrorsToShow = false;
    const control = this.getControl(form, controlName);
    if (this.hasChanges(control)) {
      hasErrorsToShow = control.errors != null;
    }
    return hasErrorsToShow;
  }

  public getControlErrors(form: FormGroup, controlName: string): Object {
    // let controlErrors = '';
    const control = this.getControl(form, controlName);
    // if (control && control.errors) {
      // Object.keys(control.errors).forEach(error => controlErrors += error);
    // }
    // return controlErrors;
    return control && control.errors;
  }

  // public getDateForControl(date: Date): string {
    // return date.toISOString().substring(0, 10);
  // }

}
