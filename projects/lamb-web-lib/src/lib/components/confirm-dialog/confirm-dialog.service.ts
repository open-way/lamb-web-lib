import { Injectable } from '@angular/core';
import { LambModalService } from '../modal/modal.module';
import { LambConfirmDialogComponent } from './confirm-dialog.component';
import { message } from './messages';

export interface Options {
  title?: string;
  message?: string;
  btnOkText?: string;
  btnCancelText?: string;
  dialogSize?: 'sm' | 'lg';
}

@Injectable()
export class LambConfirmDialogService {

  constructor(private lambModalService: LambModalService) { }

  /**
   * Confirm
   * @param options optional JSON Options
   * @param action X = XXX; D = Delete; U = Update; S = Save
   */
  public confirm(options: Options = {}, action?: 'D' | 'U' | 'S'): Promise<boolean> {

    const modalRef = this.lambModalService.open(LambConfirmDialogComponent, { centered: true });
    // const modalRef = this.lambModalService.open(LambConfirmDialogComponent);
    // const modalRef =
    // this.lambModalService.open(ConfirmDialogComponent,
    // { size: (options.dialogSize ? options.dialogSize : this.config.dialogSize) });
    modalRef.componentInstance.title
      = options.title ? options.title : this.config.title;
    modalRef.componentInstance.message
      = options.message ? options.message : this.getMessage(action);
    modalRef.componentInstance.btnOkText
      = options.btnOkText ? options.btnOkText : this.config.btnOkText;
    modalRef.componentInstance.btnCancelText
      = options.btnCancelText ? options.btnCancelText : this.config.btnCancelText;
    return modalRef.result;
  }

  public confirmDelete(options: Options = {}): Promise<boolean> {
    return this.confirm(options, 'D');
  }

  public confirmUpdate(options: Options = {}): Promise<boolean> {
    return this.confirm(options, 'U');
  }

  public confirmSave(options: Options = {}): Promise<boolean> {
    return this.confirm(options, 'S');
  }

  private getMessage(action: string) {
    switch (action) {
      case 'D': {
        return message.confirmDelete;
      }
      case 'U': {
        return message.confirmUpdate;
      }
      case 'S': {
        return message.confirmSave;
      }
      default: {
        return this.config.message;
      }
    }
  }

  /**
   * Config for default.
   */
  get config(): Options {
    return {
      title: 'Confirmación',
      message: message.confirmDefault,
      btnOkText: 'OK',
      btnCancelText: 'CANCELAR',
      dialogSize: 'lg',
    };
  }
}
