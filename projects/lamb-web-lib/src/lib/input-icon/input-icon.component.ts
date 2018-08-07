import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lamb-input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.scss']
})
export class LambInputIconComponent implements OnInit {
  @Input() justify: 'start' | 'end';

  constructor() {
    this.justify = 'end';
  }

  ngOnInit() {
  }

}
