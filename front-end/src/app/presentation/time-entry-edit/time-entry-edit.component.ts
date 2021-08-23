import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TimeEntry } from 'src/app/core/entities/time-entry';
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
  public projects: Array<string> = ['project1','project2'];
  statusText: string;
  viewModelReady: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router    
  ) 
  { 
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
      if(!objRecordId){
        this.recordId = 0;
      }else{
        this.recordId = parseInt(objRecordId)
      }
      
      this.loadRecord();
    }
  }

  private setupNewRecord() {
        
    this.editingNewRecord = true;
    if(this.infoBar){
      // @ts-ignore
      setTimeout(x => this.infoBar.displayInfo("Add new TimeEntry"), 1000);
    }
    this.viewModelReady = true;
  }  

  loadRecord() {
    this.editingNewRecord = false;
    this.selectedRecord.subscribe( data => {
      this.record = data;
    })

    alert('do work to load record....');
    
  }  


}
