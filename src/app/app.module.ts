import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  LambInputIconModule,
  LambButtonIconModule, LambWebLibModule,
  LambConfirmDialogModule,
  LambModalModule, LambMenuModule,
} from 'lamb-web-lib';

import {
  NbThemeModule, NbLayoutModule,
  NbCardModule, NbSearchModule, NbSidebarModule, NbMenuModule,
} from '@nebular/theme';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import {
  InputIconComponent, ButtonIconComponent,
  ConfirmDialogComponent, ModalComponent,
  StepsComponent, TabsComponent,
} from './components';
import { MenuComponent } from './components/menu/menu.component';

export const NEBULAR_MODULES: any[] = [
  NbLayoutModule,
  NbCardModule,
  NbSearchModule,
  NbMenuModule.forRoot(),
  NbThemeModule.forRoot({ name: 'default' }),
  NbSidebarModule.forRoot(),
];

export const COMPONENTS: any[] = [
  InputIconComponent, ButtonIconComponent,
  ConfirmDialogComponent, ModalComponent,
  MenuComponent, StepsComponent, TabsComponent,
];

export const LAMB_MODULES: any[] = [
  LambWebLibModule,
  LambButtonIconModule,
  LambInputIconModule,
  LambConfirmDialogModule,
  LambMenuModule,

  LambModalModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MenuSidebarComponent,
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ...LAMB_MODULES,
    ...NEBULAR_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
