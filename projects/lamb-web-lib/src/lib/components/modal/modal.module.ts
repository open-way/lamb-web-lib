/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal Confirm Dialog component.
 *
 * @example
 *
 * ```
 * import {Component, Input} from '@angular/core';
 * import {LambModalService, LambActiveModal} from 'lamb-web-lib';
 *
 * @Component({
 *   selector: 'lamb-modal-content',
 *   template: `
 *     <div class="modal-header">
 *       <h4 class="modal-title">Hi there!</h4>
 *       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
 *         <span aria-hidden="true">&times;</span>
 *       </button>
 *     </div>
 *     <div class="modal-body">
 *       <p>Hello, {{name}}!</p>
 *     </div>
 *     <div class="modal-footer">
 *       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
 *     </div>
 *   `
 * })
 * export class ModalContent {
 *   @Input() name;
 *
 *   constructor(public activeModal: LambActiveModal) {}
 * }
 *
 * @Component({
 *   selector: 'lamb-modal-component',
 *   template: '<button class="btn btn-lg btn-outline-primary" (click)="open()">Launch demo modal</button>'
 * })
 * export class ModalComponent {
 *   constructor(private lambModalService: LambModalService) {}
 *
 *   open() {
 *     const modalRef = this.lambModalService.open(ModalContent);
 *     modalRef.componentInstance.name = 'World';
 *   }
 * }
 * ```
 */
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { LambModalBackdropComponent } from './modal-backdrop.component';
import { LambModalWindowComponent } from './modal-window.component';
import { LambModalService } from './modal.service';
// import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LambModalStackService } from './modal-stack.service';


export { LambModalService, LambModalOptions } from './modal.service';
export { LambModalRef, LambActiveModal } from './modal-ref';
export { ModalDismissReasons } from './modal-dismiss-reasons';

@NgModule({
  imports: [
  ],
  declarations: [
    LambModalBackdropComponent,
    LambModalWindowComponent,
  ],
  entryComponents: [
    LambModalBackdropComponent,
    LambModalWindowComponent,
  ],
  providers: [
    LambModalService,
    LambModalStackService,
  ],
})
export class LambModalModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: LambModalModule,
  //     providers: [
  //       LambModalService,
  //       LambModalStackService,
  //     ]
  //   }
  // }
}
