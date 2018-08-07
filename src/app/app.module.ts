import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LambInputIconModule, LambButtonIconModule, LambWebLibModule } from 'lamb-web-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    LambWebLibModule,
    LambButtonIconModule,
    LambInputIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
