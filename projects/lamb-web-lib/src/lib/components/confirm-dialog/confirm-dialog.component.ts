import { Component, OnInit, Input } from '@angular/core';
import { LambActiveModal } from '../modal';

@Component({
  selector: 'lamb-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.scss'],
})
export class LambConfirmDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: LambActiveModal) { }

  ngOnInit() {
  }

  public cancel() {
    // this.activeModal.close(false);
    this.activeModal.dismiss(false);
  }

  public ok() {
    this.activeModal.close({data: 'Hi'});
  }

  public dismiss() {
    // this.activeModal.close(true);
    this.activeModal.dismiss(false);
  }

}
