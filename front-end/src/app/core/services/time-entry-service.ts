import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TimeEntry } from '../entities/time-entry';

@Injectable({
    providedIn: 'root'
})
export class TimeEntryService {

    baseUrl: string;
    entity: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.serverUrl;
        this.entity = "Time-entries";
    }

    fetchTimeEntries() {
        return this.http.get<TimeEntry[]>(`${this.baseUrl}/${this.entity}`);
    }

    deleteTimeEntry(id: number) {
        return this.http.delete(`${this.baseUrl}/${this.entity}/${id}`);
    }

    addTimeEntry(record: TimeEntry) {
        return this.http.post<TimeEntry>(`${this.baseUrl}/${this.entity}`, record);
    }

    updateTimeEntry(payload: TimeEntry, id: number) {
        return this.http.put<TimeEntry>(`${this.baseUrl}/${this.entity}/${id}`, payload);
    }

    getTimeEntry(id: number) {
        return this.http.get(`${this.baseUrl}/${this.entity}/${id}`);
    }
}