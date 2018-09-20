import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LambToolsService } from './services/tools.service';
import { MESSAGES_FORM_VALIDATORS as message } from './messages';

@Component({
  selector: 'lamb-show-error',
  template: `
    <small *ngIf="mustShowErrors()" class="float-right" [ngClass]="{'text-error': mustShowErrors() }">
        {{ getMsmError }}
    </small>
    `,
  styleUrls: ['./show-error.component.scss'],
})
export class LambShowErrorComponent implements OnInit {
  @Input() controlName: string;
  @Input() group: FormGroup;

  constructor(private lambtoolService: LambToolsService) { }

  ngOnInit() { }

  public getControlErrors(): any {
    return this.lambtoolService.getControlErrors(this.group, this.controlName);
  }

  public mustShowErrors(): boolean {
    return this.lambtoolService.mustShowErrors(this.group, this.controlName);
  }

  get getMsmError() {
    const hasError = this.getControlErrors();
    if (hasError.required) {
      return message.required;
    } else if (hasError.minlength) {
      return `${message.minlengthRequiredLength}
        ${hasError.minlength.requiredLength}
        ${message.minlengthActualLength}
        ${hasError.minlength.actualLength}`;
    } else if (hasError.maxlength) {
      return `${message.maxlengthRequiredLength}
        ${hasError.maxlength.requiredLength}
        ${message.maxlengthActualLength}
        ${hasError.maxlength.actualLength}`;
    } else if (hasError.email) {
      return message.email;
    } else if (hasError.min) {
      return `${message.minRequired}${hasError.min.min}
            ${message.minActual}${hasError.min.actual}`;
    } else if (hasError.max) {
      return `${message.maxRequired}${hasError.max.max}
            ${message.maxActual}${hasError.max.actual}`;
    } else if (hasError.number) {
      return message.number;
    } else if (hasError.uppercase) {
      return message.uppercase;
    } else if (hasError.lowercase) {
      return message.lowercase;
    } else if (hasError.empty) {
      return message.empty;
    } else if (hasError.positiveNumber) {
      return message.positiveNumber;
    } else if (hasError.notNegativeNumber) {
      return message.notNegativeNumber;
    } else {
      return message.other;
    }
  }
}
