
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, Input, HostBinding, OnDestroy, AfterViewInit } from '@angular/core';
import { LambMenuItem, LambMenuBag } from './menu-item';
import { convertToBoolProperty } from './helpers';
import { filter, takeWhile } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LambMenuInternalService } from './menu-internal.service';

@Component({
  selector: 'lamb-menu',
  template: `
    <ul class="lamb-menu-items">
      <li lambMenuItem *ngFor="let item of lambItems"
        [lambMenuItemm]="item"
        (hoverItem)="onHoverItem($event)"
        (toggleSubMenu)="onToggleSubMenu($event)"
        (selectItem)="onSelectItem($event)"
        (itemClick)="onItemClick($event)"
        class="lamb-menu-item"></li>
    </ul>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class LambMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('class.inverse') inverseValue: boolean;

  /**
   * Las etiquetas de un menú con un Id, se pueden usar posteriormente en el servicio
   * de menú para determinar qué menú desencadenó la acción, si existen varios menús en la página.
   */
  @Input() tag: string;

  /**
   * Lista de elementos de menú.
   */
  // @Input() lambItems: LambMenuItem[];
  public lambItems: LambMenuItem[] = [];
  @Input()
  set items(lambItems: LambMenuItem[]) {
    if (lambItems) {
      // setTimeout(() => {
      this.lambItems = lambItems;
      // }, 0);
      this.afterLoadItems();
    }
  }

  /**
   * Hace que los colores sean inversos según el tema actual.
   * El valor predeterminado es "false"
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
  }

  /**
   * Contraer todos los submenus abiertos en el event de aternar (toggle event)
   * El valor predeterminado es "false".
   */
  @Input()
  set autoCollapse(val: boolean) {
    this.autoCollapseValue = convertToBoolProperty(val);
  }

  private alive = true;
  private autoCollapseValue = false;

  constructor(private lambMenuInternalService: LambMenuInternalService,
    // private accessObservableService: AccessObservableService,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.lambMenuInternalService
      .onAddItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: LambMenuItem[] }) => this.compareTag(data.tag)),
      )
      .subscribe(data => this.onAddItem(data));

    this.lambMenuInternalService
      .onNavigateHome()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: LambMenuItem }) => this.compareTag(data.tag)),
      )
      .subscribe(() => this.navigateHome());

    this.lambMenuInternalService
      .onGetSelectedItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; listener: BehaviorSubject<LambMenuBag> }) => this.compareTag(data.tag)),
      )
      .subscribe((data: { tag: string; listener: BehaviorSubject<LambMenuBag> }) => {
        data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.lambItems) });
      });

    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.lambMenuInternalService.resetItems(this.lambItems);
        this.lambMenuInternalService.updateSelection(this.lambItems, this.tag, this.autoCollapseValue);
      });

    this.lambItems.push(...this.lambMenuInternalService.getItems());
  }

  private getSelectedItem(items: LambMenuItem[]): LambMenuItem {
    let selected = null;
    items.forEach((item: LambMenuItem) => {
      if (item.selected) {
        selected = item;
      }
      if (item.selected && item.children && item.children.length > 0) {
        selected = this.getSelectedItem(item.children);
      }
    });
    return selected;
  }

  private afterLoadItems() {
    // Codigo extra, propio del proyecto
    this.lambMenuInternalService.prepareItems(this.lambItems);
    setTimeout(() => this.lambMenuInternalService.updateSelection(this.lambItems, this.tag));
  }

  public ngAfterViewInit() {
  }

  public onAddItem(data: { tag: string, items: LambMenuItem[] }) {
    this.lambItems.push(...data.items);

    this.lambMenuInternalService.prepareItems(this.lambItems);
    this.lambMenuInternalService.updateSelection(this.lambItems, this.tag, this.autoCollapseValue);
  }

  /** Attr Menus */
  public onHoverItem(item: LambMenuItem) {
    this.lambMenuInternalService.itemHover(item, this.tag);
  }

  // TODO: No se dispara cuando la pagina se recarga.
  public onSelectItem(item: LambMenuItem) {
    this.lambMenuInternalService.resetItems(this.lambItems);
    this.lambMenuInternalService.selectItem(item, this.tag);
  }

  public onItemClick(item: LambMenuItem) {
    this.lambMenuInternalService.itemClick(item, this.tag);
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  public onToggleSubMenu(item: LambMenuItem) {
    if (this.autoCollapseValue) {
      this.lambMenuInternalService.collapseAll(this.lambItems, this.tag, item);
    }
    item.expanded = !item.expanded;
    this.lambMenuInternalService.submenuToggle(item, this.tag);
  }

  private compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  private navigateHome() {
    const homeItem = this.getHomeItem(this.lambItems);

    if (homeItem) {
      if (homeItem.link) {
        this.router.navigate([homeItem.link]);
      }

      if (homeItem.url) {
        window.location.href = homeItem.url;
      }
    }
  }

  private getHomeItem(items: LambMenuItem[]): LambMenuItem {
    for (const item of items) {
      if (item.home) {
        return item;
      }

      const homeItem = item.children && this.getHomeItem(item.children);
      if (homeItem) {
        return homeItem;
      }
    }
  }
}
