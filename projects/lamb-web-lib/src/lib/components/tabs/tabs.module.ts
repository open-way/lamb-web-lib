/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal tabs component.
 *
 * @example
 *
 * ```
 * <lamb-tab-group justify="start">
 *   <ng-template lambTabGroupTitle>
 *     <span>Flujo del proceso</span>
 *   </ng-template>
 *   <lamb-tab>
 *     <ng-template lambTabTitle>
 *       <span><i class="fa fa-home lamb-icon"></i></span> Tab 1
 *     </ng-template>
 *     <ng-template lambTabContent>
 *       Conenido del tab 1
 *     </ng-template>
 *   </lamb-tab>
 *   <lamb-tab icon="fa fa-list-alt" title="Tab 2">
 *     <ng-template lambTabContent>
 *       Contenido del tab 2
 *     </ng-template>
 *   </lamb-tab>
 *   <lamb-tab icon="fa" disabled="true" title="Disabled">
 *     <ng-template lambTabContent>
 *       Contenido del Desabilitado
 *     </ng-template>
 *   </lamb-tab>
 * </lamb-tab-group>
 * ```
 */
import { NgModule } from '@angular/core';
import { LAMB_TABS_COMPONENTS } from './tabs.component';
import { CommonModule } from '@angular/common';
import { LambTabConfig } from './tab-config';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        ...LAMB_TABS_COMPONENTS,
    ],
    declarations: [
        ...LAMB_TABS_COMPONENTS,
    ],
    providers: [
        LambTabConfig,
    ],
})
export class LambTabsModule { }
