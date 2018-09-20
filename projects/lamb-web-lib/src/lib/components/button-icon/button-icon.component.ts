import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lamb-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['button-icon.component.scss']
})
export class LambButtonIconComponent implements OnInit {

  @Input() colorClass: string;
  // @Input() class: string; // DEPRECATED
  @Input() label: string;
  @Input() isDisabled: boolean;
  @Input() onlyIcon: boolean;
  @Input() icon: string;
  @Input() title: string;
  @Input() size: string;

  constructor() {
    this.colorClass = 'btn-light';
    this.icon = 'fa fa-plus-circle';
    this.label = 'New';
    this.size = 'lg';
  }

  ngOnInit() {
  }
}
