import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSidebarComponent implements OnInit {
  public items: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadItems();
  }

  public loadItems() {
    this.items = [
      {
        title: 'Button Icon',
        link: ['button-icon'],
      },
      {
        title: 'Confirm Dialog',
        link: ['confirm-dialog'],
      },
      {
        title: 'Input Icon',
        link: ['input-icon'],
      },
      {
        title: 'Modal',
        link: ['modal'],
      },
      {
        title: 'Menu',
        link: ['menu'],
      },
      {
        title: 'Steps',
        link: ['steps'],
      },
      {
        title: 'Tabs',
        link: ['tabs'],
      },
      {
        title: 'Title',
        link: ['title'],
      },
      {
        title: 'Fieldset',
        link: ['fieldset'],
      },
      {
        title: 'Divider',
        link: ['divider'],
      },
      {
        title: 'Etc',
        link: [],
      },
      {
        title: 'Tabs',
        link: [],
      },
    ];
  }

}
