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
 *  public onConfirm() {
 *      this.confirmDialogService.confirmSave()
 *          .then(this.success.bind(this))
 *          .catch(this.cancel.bind(this));
 *  }

 *  private success(result: any) {
 *      console.log('PODENOS GUARDAR');
 *  }
 *  private cancel(reason: any) {
 *      console.log('SE CANCELÓ');
 *   }
 * ```
 */
import { NgModule } from '@angular/core';
import { LambConfirmDialogComponent } from './confirm-dialog.component';
import { LambConfirmDialogService } from './confirm-dialog.service';
import { LambModalModule } from '../modal';

export { LambConfirmDialogService } from './confirm-dialog.service';

@NgModule({
    imports: [
        LambModalModule,
    ],
    declarations: [
        LambConfirmDialogComponent,
    ],
    providers: [
        LambConfirmDialogService,
    ],
    entryComponents: [
        LambConfirmDialogComponent,
    ],
})
export class LambConfirmDialogModule { }
