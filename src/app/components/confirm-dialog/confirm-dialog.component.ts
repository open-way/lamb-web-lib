import { Component, OnInit } from '@angular/core';
import { LambConfirmDialogService } from 'lamb-web-lib';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private lambConfirmDialogService: LambConfirmDialogService) { }

  ngOnInit() {
  }

  public onConfirm() {
    console.log('confirm method');

    this.lambConfirmDialogService.confirmSave()
      .then(this.success.bind(this))
      .catch(this.cancel.bind(this));
  }

  private success(result: any) {
    console.log('PODENOS GUARDAR');
  }
  private cancel(reason: any) {
    console.log('SE CANCELÓ');
  }
}
