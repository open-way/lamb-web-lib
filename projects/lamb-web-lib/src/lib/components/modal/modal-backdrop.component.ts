import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'lamb-modal-backdrop',
  template: '',
  // host: { 'class': 'modal-backdrop fade show' },
  styles: [],
})
export class LambModalBackdropComponent {
  @HostBinding('class')
  get modalClass() { return 'modal-backdrop fade show'; }

  constructor() { }
}
