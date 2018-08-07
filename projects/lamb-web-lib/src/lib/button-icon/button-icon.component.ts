import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lamb-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss']
})
export class LambButtonIconComponent implements OnInit {

  @Input() class: string;
  @Input() label: string;
  @Input() isDisabled: boolean;
  @Input() onlyIcon: boolean;
  @Input() icon: string;
  @Input() title: string;

  constructor() {
    this.class = 'btn-light';
    this.icon = 'fa fa-plus-circle';
    this.label = 'New';
  }

  ngOnInit() {
  }
}
