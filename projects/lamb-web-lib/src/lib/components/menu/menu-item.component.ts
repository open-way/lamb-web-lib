
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  EventEmitter, Component, Input, Output, AfterViewInit, ViewChildren,
  ElementRef, QueryList, OnDestroy,
} from '@angular/core';
import { LambMenuItem } from './menu-item';
import { LambMenuService } from './menu.service';
import { takeWhile } from 'rxjs/operators';
import { getElementHeight } from './helpers';


function sumSubmenuHeight(item: LambMenuItem) {
  return item.expanded ?
    (item.subMenuHeight || 0) + item.children.filter(c => c.children).reduce((acc, c) => acc + sumSubmenuHeight(c), 0)
    : 0;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[lambMenuItem]',
  templateUrl: 'menu-item.component.html',
})
export class LambMenuItemComponent implements AfterViewInit, OnDestroy {
  public lambMenuItem = <LambMenuItem>null;
  // @Input() lambMenuItemm = <LambMenuItem>null;
  @Input()
  set lambMenuItemm(lambMenuItem: LambMenuItem) {
    if (lambMenuItem) {
      lambMenuItem.icon = (lambMenuItem.icon &&
        (lambMenuItem.icon !== 'icmn-books') &&
        (lambMenuItem.icon !== 'icmb-books') &&
        lambMenuItem.icon)
        || this.randonIcon();
      lambMenuItem.link = (lambMenuItem.link && !lambMenuItem.url
        && !(lambMenuItem.children && lambMenuItem.children.length)
        && !lambMenuItem.group && !lambMenuItem.hidden) && '/' + lambMenuItem.link;

      // setTimeout(() => {
      this.lambMenuItem = lambMenuItem;
      // }, 0)
    }
  }

  @Output() hoverItem = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() itemClick = new EventEmitter<any>();

  private alive = true;

  @ViewChildren(LambMenuItemComponent, { read: ElementRef }) subMenu: QueryList<ElementRef>;
  maxHeight = 0;

  constructor(private lambMenuService: LambMenuService) { }

  public ngAfterViewInit() {
    // this.lambMenuItem.children.length
    this.subMenu.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updateSubmenuHeight();
        this.updateMaxHeight();
      });

    this.lambMenuService.onSubmenuToggle$()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updateMaxHeight();
      });

    this.updateSubmenuHeight();
    this.updateMaxHeight();
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  get icons() {
    return [
      'fa fa-adn',
      'fa fa-code',
      'fa fa-bullhorn',
      'fa fa-ambulance',
      'fa fa-android',
      'fa fa-angellist',
      'fa fa-apple',
      'fa fa-at',
      'fa fa-chrome',
      'fa fa-child',
    ];
  }

  private randonIcon() {
    return this.icons[Math.floor(Math.random() * this.icons.length)];
  }

  private updateSubmenuHeight() {
    this.lambMenuItem.subMenuHeight = this.subMenu.reduce((acc, c) => acc + getElementHeight(c.nativeElement), 0);
  }

  private updateMaxHeight() {
    setTimeout(() => {
      this.maxHeight = sumSubmenuHeight(this.lambMenuItem);
    }, 0);
  }

  public onHoverItem(item: LambMenuItem) {
    this.hoverItem.emit(item);
  }

  public onToggleSubMenu(item: LambMenuItem) {
    this.toggleSubMenu.emit(item);
  }

  public onItemClick(item: LambMenuItem) {
    this.itemClick.emit(item);
  }

  public onSelectItem(item: LambMenuItem) {
    this.selectItem.emit(item);
  }
}
