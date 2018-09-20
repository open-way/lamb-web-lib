/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal ShowError component para validaciones de formularios reactivos.
 *
 * @example
 *
 * ```
 * <lamb-show-error
 *   [group] = "myForm"
 *   [controlName] = "'myContolName'"
 *   ></lamb-show-error>
 * ```
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LambToolsService } from './services/tools.service';
import { LambValidatorsService } from './services/validators.service';
import { LambShowErrorComponent } from './show-error.component';
import { ReactiveFormsModule } from '@angular/forms';

export { LambValidatorsService } from './services/validators.service';

const COMPONENTS: any[] = [LambShowErrorComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [
    LambToolsService,
    LambValidatorsService,
  ],
})
export class LambShowErrorModule { }
