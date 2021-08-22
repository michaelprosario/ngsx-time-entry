import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import { TimeEntryEditComponent } from './presentation/time-entry-edit/time-entry-edit.component';
import { TimeEntryListComponent } from './presentation/time-entry-list/time-entry-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { TimeEntryState } from './presentation/time-entries.state';
@NgModule({
  declarations: [
    AppComponent,
    TimeEntryEditComponent,
    TimeEntryListComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
        TimeEntryState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
