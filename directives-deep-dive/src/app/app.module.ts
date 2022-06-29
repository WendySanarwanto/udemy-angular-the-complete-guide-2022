import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BasicHightlightDirective } from './basic-highlight/basic-highlight.directive';
import { AppComponent } from './app.component';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless/unless.directive';

@NgModule({
  declarations: [
    AppComponent, BasicHightlightDirective, BetterHighlightDirective, UnlessDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
