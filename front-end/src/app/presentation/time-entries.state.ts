import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import { TimeEntry } from '../core/entities/time-entry';
import { TimeEntryService } from '../core/services/time-entry-service';
import { AddTimeEntry, DeleteTimeEntry, GetTimeEntry, GetTimeEntryList, NewTimeEntry, SetSelectedTimeEntry, UpdateTimeEntry } from './actions';

export class TimeEntryStateModel {
    timeEntries: TimeEntry[];
    selectedTimeEntry: TimeEntry;

    constructor()
    {
      this.timeEntries = [];
      this.selectedTimeEntry = new TimeEntry();
    }
}

@State<TimeEntryStateModel>({
    name: 'TimeEntries',
    defaults: {
        timeEntries: [],
        selectedTimeEntry: new TimeEntry()
    }
})
@Injectable()
export class TimeEntryState {

    constructor(private timeEntryService: TimeEntryService) {
    }

    @Selector()
    static getTimeEntryList(state: TimeEntryStateModel) {
        return state.timeEntries;
    }

    @Selector()
    static getSelectedTimeEntry(state: TimeEntryStateModel) {
        return state.selectedTimeEntry;
    }

    @Action(GetTimeEntryList)
    getTimeEntryListFromServer({getState, setState}: StateContext<TimeEntryStateModel>) {
        return this.timeEntryService.fetchTimeEntries().pipe(tap((result) => {
            const state = getState();
            setState({...state,timeEntries: result});
        }));
    }

    @Action(GetTimeEntry)
    getTimeEntryFromServer({getState, setState}: StateContext<TimeEntryStateModel>, {recordId} : GetTimeEntry) {
        return this.timeEntryService.getTimeEntry(recordId).pipe(tap((result) => {
            const state = getState();            
            const record = result as unknown as TimeEntry;
            setState({...state,selectedTimeEntry: record});
        }));
    }    

    @Action(NewTimeEntry)
    newTimeEntry({getState, setState}: StateContext<TimeEntryStateModel>) {       
        const state = getState();            
        const record = new TimeEntry();
        setState({...state,selectedTimeEntry: record});        
    }       

    @Action(AddTimeEntry)
    addTimeEntry({getState, patchState}: StateContext<TimeEntryStateModel>, {payload}: AddTimeEntry) {
        return this.timeEntryService.addTimeEntry(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                timeEntries: [...state.timeEntries, result]
            });
        }));
    }

    @Action(UpdateTimeEntry)
    updateTimeEntry({getState, setState}: StateContext<TimeEntryStateModel>, {payload, id}: UpdateTimeEntry) {
        return this.timeEntryService.updateTimeEntry(payload, id).pipe(tap((result) => {
            const state = getState();
            const TimeEntryList = [...state.timeEntries];
            const TimeEntryIndex = TimeEntryList.findIndex(item => item.id === id);
            TimeEntryList[TimeEntryIndex] = result;
            setState({
                ...state,
                timeEntries: TimeEntryList,
            });
        }));
    }

    @Action(DeleteTimeEntry)
    deleteTimeEntry({getState, setState}: StateContext<TimeEntryStateModel>, {id}: DeleteTimeEntry) {
        return this.timeEntryService.deleteTimeEntry(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.timeEntries.filter(item => item.id !== id);
            setState({
                ...state, timeEntries: filteredArray,
            });
        }));
    }

    @Action(SetSelectedTimeEntry)
    setSelectedTimeEntryId({getState, setState}: StateContext<TimeEntryStateModel>, {payload}: SetSelectedTimeEntry) {
        const state = getState();
        setState({
            ...state, selectedTimeEntry: payload
        });
    }
}