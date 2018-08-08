/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal button icon.
 *
 * @example
 *
 * ```
 * <lamb-button-icon icon="fa fa-home" title="Crear un nuevo cliente" colorClass="btn-primary" onlyIcon="true"></lamb-button-icon>
 * ```
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LambButtonIconComponent } from './button-icon.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LambButtonIconComponent],
  exports: [LambButtonIconComponent],
})
export class LambButtonIconModule { }
