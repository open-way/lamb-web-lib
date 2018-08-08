/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Reveal steps component.
 *
 * @example
 *
 * ```
 * <lamb-step-group justify="start"  (onComplete)="onComplete($event)" (stepChange)="beforeChange($event)">
 *   <lamb-step [validStep]="formSale.valid">
 *     <ng-template lambStepTitle>
 *       <span><i class="fa fa-home lamb-icon"></i></span> Step 1
 *     </ng-template>
 *     <ng-template lambStepContent>
 *       Conenido del step 1
 *     </ng-template>
 *   </lamb-step>
 *   <lamb-step icon="fa fa-list-alt" title="Step 2" [validStep]="validStep2">
 *     <ng-template lambStepContent>
 *       Contenido del step 2
 *     </ng-template>
 *   </lamb-step>
 *   <lamb-step icon="fa" disabled="true" title="Disabled">
 *     <ng-template lambStepContent>
 *       Contenido del Desabilitado
 *     </ng-template>
 *   </lamb-step>
 * </lamb-step-group>
 * ```
 */
import { NgModule } from '@angular/core';
import { LAMB_STEPS_COMPONENTS } from './steps.component';
import { CommonModule } from '@angular/common';
import { LambStepConfig } from './step-config';

export { LambStepChangeEvent } from './steps.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        ...LAMB_STEPS_COMPONENTS,
    ],
    declarations: [
        ...LAMB_STEPS_COMPONENTS,
    ],
    providers: [
        LambStepConfig,
    ],
})
export class LambStepsModule { }
