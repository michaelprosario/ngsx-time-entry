import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeEntryEditComponent } from './presentation/time-entry-edit/time-entry-edit.component';
import { TimeEntryListComponent } from './presentation/time-entry-list/time-entry-list.component';

const routes: Routes = [
  { path: 'editTimeEntry/:id', component: TimeEntryEditComponent },
  { path: 'listTimeEntries', component: TimeEntryListComponent },
  { path: 'newTimeEntry/:id', component: TimeEntryEditComponent },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
