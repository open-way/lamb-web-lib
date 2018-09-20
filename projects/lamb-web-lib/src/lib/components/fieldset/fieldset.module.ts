/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal fieldset component.
 *
 * @example
 *
 * ```
 * <lamb-fieldset>
 *   <lamb-fieldset-head>
 *     <lamb-fieldset-icon icon="fa fa-home"></lamb-fieldset-icon>
 *     <lamb-fieldset-title>Mi título</lamb-fieldset-title>
 *   </lamb-fieldset-head>
 *     <lamb-fieldset-body>
 *       Mi contenido
 *     </lamb-fieldset-body>
 * </lamb-fieldset>
 * ```
 */
import { NgModule } from '@angular/core';
import { LAMB_FIELDSET_COMPONENTS } from './fieldset.component';

@NgModule({
    imports: [],
    exports: [
        ...LAMB_FIELDSET_COMPONENTS,
    ],
    declarations: [
        ...LAMB_FIELDSET_COMPONENTS,
    ],
    providers: [],
})
export class LambFieldsetModule { }
