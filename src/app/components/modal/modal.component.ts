import { Component, OnInit } from '@angular/core';
import { LambModalService } from 'lamb-web-lib';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private lambModalService: LambModalService) { }

  ngOnInit() {
  }

  public open(content) {
    const modalRef = this.lambModalService.open(content);
    // modalRef.componentInstance.name = 'World';
  }
}
