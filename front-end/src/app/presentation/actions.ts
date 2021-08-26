import { TimeEntry } from "../core/entities/time-entry";

export class AddTimeEntry {
    static readonly type = '[TimeEntry] Add';

    constructor(public payload: TimeEntry) {
    }
}

export class GetTimeEntryList {
    static readonly type = '[TimeEntry] List';
}

export class UpdateTimeEntry {
    static readonly type = '[TimeEntry] Update';

    constructor(public payload: TimeEntry, public id: number) {
    }
}

export class DeleteTimeEntry {
    static readonly type = '[TimeEntry] Delete';

    constructor(public id: number) {
    }
}

export class SetSelectedTimeEntry {
    static readonly type = '[TimeEntry] Set';

    constructor(public payload: TimeEntry) {
    }
}

export class GetTimeEntry {
    static readonly type = '[TimeEntry] Get Time Entry';
    constructor(public recordId: number) {
    }    
}

export class NewTimeEntry {
    static readonly type = '[TimeEntry] New Time Entry';
    constructor() {}    
}