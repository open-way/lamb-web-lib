
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LambMenuBag, LambMenuItem } from './menu-item';
import { share } from 'rxjs/operators';

import {
  submenuToggle$, itemClick$, itemSelect$, itemHover$,
  addItems$, navigateHome$, getSelectedItem$,
} from './variables';

@Injectable()
export class LambMenuService {

  constructor() { }

  /**
   * Agregar elementos al final de la lista de elementos del menú
   * @param List<LambMenuItem>} items
   * @param string tag
   */
  public addItems(items: LambMenuItem[], tag?: string) {
    addItems$.next({ tag, items });
  }

  /**
   * Navega al elemento del menú de inicio (home).
   * @param string tag
   */
  public navigateHome(tag?: string) {
    navigateHome$.next({ tag });
  }

  /**
   * Devuelve el elemento seleccionado actualmente. No se suscribirá a los eventos futuros.
   * @param string tag
   * @returns Observable<{tag: string; item: LambMenuBag}>
   */
  public getSelectedItem(tag?: string): Observable<LambMenuBag> {
    const listener = new BehaviorSubject<LambMenuBag>(null);

    getSelectedItem$.next({ tag, listener });

    return listener.asObservable();
  }

  public onSubmenuToggle$(): Observable<LambMenuBag> {
    return submenuToggle$.pipe(share());
  }

  public onItemClick(): Observable<LambMenuBag> {
    return itemClick$.pipe(share());
  }

  public onItemSelect(): Observable<LambMenuBag> {
    return itemSelect$.pipe(share());
  }

  public onItemHover(): Observable<LambMenuBag> {
    return itemHover$.pipe(share());
  }
}
