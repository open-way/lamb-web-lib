/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class LambTabConfig {
  // justify: 'start' | 'center' | 'end' | 'fill' | 'justified';
  // orientation: 'horizontal' | 'vertical';
  // type: 'tabss' | 'pills';
  justify: 'start' | 'center' | 'end' | 'fill' | 'justified' = 'center';
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  type: 'tabss' | 'pills' = 'tabss';
}
