
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { LambMenuBag, LambMenuItem } from './menu-item';

/**
 * Variables Globales.
 */
export const submenuToggle$ = new ReplaySubject<LambMenuBag>(1);
export const itemHover$ = new ReplaySubject<LambMenuBag>(1);
export const itemSelect$ = new ReplaySubject<LambMenuBag>(1);
export const itemClick$ = new ReplaySubject<LambMenuBag>(1);
export const addItems$ = new ReplaySubject<{ tag: string; items: LambMenuItem[] }>(1);
export const navigateHome$ = new ReplaySubject<{ tag: string }>(1);
export const getSelectedItem$ = new ReplaySubject<{ tag: string, listener: BehaviorSubject<LambMenuBag> }>(1);
