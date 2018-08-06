import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonIconModule, LambWebLibModule } from 'lamb-web-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    LambWebLibModule,
    ButtonIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
