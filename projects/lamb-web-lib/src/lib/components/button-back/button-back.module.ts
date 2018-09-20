/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal button back.
 *
 * @example
 *
 * ```
 * <lamb-button-back></lamb-button-back>
 * ```
 */
import { NgModule } from '@angular/core';
import { LambButtonBackComponent } from './button-back.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        LambButtonBackComponent,
    ],
    declarations: [
        LambButtonBackComponent,
    ],
    providers: [],
})
export class LambButtonBackModule { }
