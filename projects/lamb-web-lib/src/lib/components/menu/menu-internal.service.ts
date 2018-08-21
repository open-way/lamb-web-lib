
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { LambMenuItem, LambMenuBag } from './menu-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  itemHover$, submenuToggle$, itemClick$, itemSelect$,
  navigateHome$, getSelectedItem$, addItems$,
} from './variables';


@Injectable()
export class LambMenuInternalService {
  private items: LambMenuItem[] = [];

  constructor(private location: Location) {
    this.items = [];
  }

  public getItems(): LambMenuItem[] {
    return this.items;
  }

  public collapseAll(items: LambMenuItem[], tag: string, except?: LambMenuItem) {
    const excepts = this.getParent(tag, except);
    items.forEach(item => this.collapseItem(item, tag, excepts));
  }

  private getParent(tag: string, item?: LambMenuItem) {
    if (!item) {
      return;
    }
    const arr = [];
    arr.push(item);
    if (item.parent) {
      arr.push(...this.getParent(tag, item.parent));
    }
    return arr;
  }

  public itemHover(item: LambMenuItem, tag?: string) {
    itemHover$.next({ tag, item });
  }

  public submenuToggle(item: LambMenuItem, tag?: string) {
    submenuToggle$.next({ tag, item });
  }

  public selectItem(item: LambMenuItem, tag: string) {
    item.selected = true;
    this.itemSelect(item, tag);
    this.selectParent(item, tag);
  }

  private selectParent({ parent: item }: LambMenuItem, tag: string) {
    if (!item) {
      return;
    }

    if (!item.expanded) {
      item.expanded = true;
      this.submenuToggle(item, tag);
    }

    item.selected = true;
    this.selectParent(item, tag);
  }

  public itemClick(item: LambMenuItem, tag?: string) {
    itemClick$.next({ tag, item });
  }

  private itemSelect(item: LambMenuItem, tag?: string) {
    itemSelect$.next({ tag, item });
  }

  public onAddItem(): Observable<{ tag: string, items: LambMenuItem[] }> {
    return addItems$.pipe(share());
  }

  public onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.pipe(share());
  }

  public onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<LambMenuBag> }> {
    return getSelectedItem$.pipe(share());
  }

  public resetItems(items: LambMenuItem[]) {
    items.forEach(item => this.resetItem(item));
  }

  private resetItem(item: LambMenuItem) {
    item.selected = false;

    if (item.children) {
      item.children.forEach(child => {
        this.resetItem(child);
      });
    }
  }

  public prepareItems(items: LambMenuItem[]) {
    items.forEach(item => this.setParent(item));
  }

  private setParent(item: LambMenuItem) {
    if (item.children) {
      item.children.forEach(child => {
        child.parent = item;
        this.setParent(child);
      });
    }
  }

  public updateSelection(items: LambMenuItem[], tag: string, collapseOther: boolean = false) {
    if (collapseOther) {
      this.collapseAll(items, tag);
    }
    items.forEach(item => this.selectItemByUrl(item, tag));
  }

  private selectItemByUrl(item: LambMenuItem, tag: string) {
    const wasSelected = item.selected;
    const isSelected = this.selectedInUrl(item);
    if (!wasSelected && isSelected) {
      this.selectItem(item, tag);
    }
    if (item.children) {
      this.updateSelection(item.children, tag);
    }
  }

  private selectedInUrl(item: LambMenuItem): boolean {
    const exact: boolean = item.pathMatch === 'full';
    const location: string = this.location.path();
    return (
      (exact && location === item.link) ||
      (!exact && location.includes(item.link)) ||
      (exact && item.fragment && location.substr(location.indexOf('#') + 1).includes(item.fragment))
    );
  }

  private collapseItem(item: LambMenuItem, tag?: string, excepts?: LambMenuItem[]) {
    // if (except && except === item)) {
    if (excepts && excepts.some(it => it === item)) {
      return;
    }
    const wasExpanded = item.expanded;
    item.expanded = false;
    if (wasExpanded) {
      this.submenuToggle(item);
    }

    if (item.children) {
      item.children.forEach(child => this.collapseItem(child, tag));
    }
  }
}

