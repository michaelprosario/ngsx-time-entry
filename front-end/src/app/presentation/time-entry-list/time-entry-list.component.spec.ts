import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryListComponent } from './time-entry-list.component';

describe('TimeEntryListComponent', () => {
  let component: TimeEntryListComponent;
  let fixture: ComponentFixture<TimeEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeEntryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
