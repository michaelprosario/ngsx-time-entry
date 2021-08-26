import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TimeEntry } from 'src/app/core/entities/time-entry';
import { GetTimeEntry, NewTimeEntry } from '../actions';
import { InfoBarComponent } from '../info-bar/info-bar.component';
import { TimeEntryState } from '../time-entries.state';

@Component({
  selector: 'app-time-entry-edit',
  templateUrl: './time-entry-edit.component.html',
  styleUrls: ['./time-entry-edit.component.scss']
})
export class TimeEntryEditComponent implements OnInit {
  // @ts-ignore
  @ViewChild(InfoBarComponent, { static: false }) infoBar: InfoBarComponent

  editingNewRecord: boolean;
  errors: string[];

  // @ts-ignore
  @Select(TimeEntryState.getSelectedTimeEntry) selectedRecord: Observable<TimeEntry>;
  record: TimeEntry;
  recordId: number;
  recordName: string = "Time Entry";
  public projects: Array<string> = ['project1', 'project2'];
  statusText: string;
  viewModelReady: boolean;

  fields: FormlyFieldConfig[] = [
    {
      key: 'projectId',
      type: 'input',
      templateOptions: {
        label: 'project id',
        placeholder: 'Enter project id ',
        required: true,
      }
    },
    {
      key: 'storyId',
      type: 'input',
      templateOptions: {
        label: 'story Id',
        placeholder: 'Enter storyId ',
        required: true,
      }
    },
    {
      key: 'hours',
      type: 'input',
      templateOptions: {
        label: 'hours',
        placeholder: 'Enter hours ',
        required: true,
        type: 'number'
      }
    },
    {
      key: 'notes',
      type: 'textarea',
      templateOptions: {
        label: 'notes',
        placeholder: 'Enter notes ',
        required: false,
        rows:3
      }
    }    

  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.editingNewRecord = false;
    this.errors = [];
    this.recordId = 0;
    this.statusText = "";
    this.viewModelReady = false;
    this.record = new TimeEntry();
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {

    const url = this.router.url;
    if (url.startsWith('/newTimeEntry')) {
      this.setupNewRecord();
    } else if (url.startsWith('/editTimeEntry')) {

      let objRecordId = this.route.snapshot.paramMap.get('id');
      if (!objRecordId) {
        this.recordId = 0;
      } else {
        this.recordId = parseInt(objRecordId)
      }

      this.loadRecord();
    }
  }

  private setupNewRecord() {

    this.editingNewRecord = true;
    if (this.infoBar) {
      // @ts-ignore
      setTimeout(x => this.infoBar.displayInfo("Add new TimeEntry"), 1000);
    }
    this.store.dispatch(new NewTimeEntry());
    this.viewModelReady = true;
  }

  loadRecord() {
    this.editingNewRecord = false;
    this.store.dispatch(new GetTimeEntry(this.recordId));
    this.selectedRecord.subscribe(data => {
      this.record = data;
      this.recordId = this.record.id;
    })
  }

  onSave(){
    alert('handle save data');
  }


}
