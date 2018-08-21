
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LambMenuComponent } from './menu.component';
import { LambMenuItemComponent } from './menu-item.component';
import { RouterModule } from '@angular/router';
import { LambMenuService } from './menu.service';
import { LambMenuInternalService } from './menu-internal.service';

const lambMenuProviders = [
  LambMenuInternalService,
  LambMenuService,
];

const lambBaseComponents = [
  LambMenuComponent, /** My custom menu */
  LambMenuItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ...lambBaseComponents,
  ],
  exports: [
    ...lambBaseComponents,
  ],
  providers: [
    ...lambMenuProviders,
  ],
})
export class LambMenuModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: LambMenuModule,
      providers: [...lambMenuProviders],
    };
  }
}
