import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InputItemComponent } from './shared/components/input-item/input-item.component';
import { ListItemComponent } from './shared/components/list-item/list-item.component';
import { ListComponent } from './shared/components/list/list.component';
import { TasksService } from './shared/services/tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    InputItemComponent,
    ListItemComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TasksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
