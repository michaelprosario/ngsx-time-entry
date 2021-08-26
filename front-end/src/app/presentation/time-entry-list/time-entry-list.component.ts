import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TimeEntry } from 'src/app/core/entities/time-entry';
import { GetTimeEntryList, SetSelectedTimeEntry } from '../actions';
import { TimeEntryState } from '../time-entries.state';

@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.scss']
})
export class TimeEntryListComponent implements OnInit {
  
  @Select(TimeEntryState.getTimeEntryList) 
  // @ts-ignore
  records: Observable<TimeEntry[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {

    this.store.dispatch(new GetTimeEntryList());
  }

  onNewRecord() {
    this.router.navigate(['/newTimeEntry']);
  }

  openRecord(record: TimeEntry) {
    this.store.dispatch(new SetSelectedTimeEntry(record));
    this.router.navigate(['/editTimeEntry/' + record.id]);
  }
}
