import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BasicHightlightDirective } from './basic-highlight/basic-highlight.directive';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, BasicHightlightDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
