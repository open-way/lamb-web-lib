/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal Divider component.
 *
 * @example
 *
 * ```
 * <lamb-divider title="Contactos" icon="fa fa-gear"
 *   description = "este es un grupo de contactos.">
 * </lamb-divider>
 * ```
 */

import { NgModule } from '@angular/core';
import { LambDividerConfigService } from './divider-config';
import { LambDividerComponent } from './divider.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        LambDividerComponent,
    ],
    declarations: [
        LambDividerComponent,
    ],
    providers: [
        LambDividerConfigService,
    ],
})
export class LambDividerModule { }
