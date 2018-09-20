import { Component, OnInit } from '@angular/core';
import { LambMenuService } from 'lamb-web-lib';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public items: any[] = [
    {
      title: 'Profile',
      expanded: true,
      children: [
        {
          title: 'Change Password',
          link: ['change-password'], // goes into angular `routerLink`
        },
        {
          title: 'Privacy Policy',
          url: 'http://www.google.com', // goes directly into `href` attribute
        },
        {
          title: 'Logout',
          link: ['layout'],
        },
      ],
    },
    {
      title: 'Shopping Bag',
      link: ['shopping'],
    },
    {
      title: 'Orders',
      link: ['orders'],
    },
  ];
  constructor(private lambMenuService: LambMenuService) { }

  ngOnInit() {
  }

}
