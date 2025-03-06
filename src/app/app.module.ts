import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputItemComponent } from './shared/input-item/input-item.component';
import { ListItemComponent } from './shared/list-item/list-item.component';
import { ListComponent } from './shared/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    InputItemComponent,
    ListItemComponent,
    ListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
