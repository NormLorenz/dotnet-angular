import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TimeEntry } from '../models/time-entry.interface';
import { ConfigurationService } from '../../services/configuration.service';

const TIMEENTRY_API: string = 'timeentry';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

// https://angular.io/guide/http

@Injectable()
export class TimeEntryService {

  constructor(private httpClient: HttpClient, private configuration: ConfigurationService) {
  }

  getTimeEntries(id: number, duration: number): Observable<TimeEntry[]> {
    let url = `${this.configuration.apiAddress}/${TIMEENTRY_API}/gettimeentrybyuser/${id.toString()}/${duration.toString()}`;
    return this.httpClient
      .get<TimeEntry[]>(url)
  }

  postTimeEntry(timeEntry: TimeEntry): Observable<TimeEntry> {
    let url = `${this.configuration.apiAddress}/${TIMEENTRY_API}`;

    // hack - had to remove this prop as the controller throws up with a null exception
    delete timeEntry['timeEntryId'];

    return this.httpClient
      .post<TimeEntry>(url, timeEntry)
  }

  putTimeEntry(timeEntry: TimeEntry): Observable<TimeEntry> {
    let url = `${this.configuration.apiAddress}/${TIMEENTRY_API}/${timeEntry.timeEntryId}`;
    return this.httpClient
      .put<TimeEntry>(url, timeEntry)
  }

  deleteTimeEntry(id: number): Observable<{}> {
    let url = `${this.configuration.apiAddress}/${TIMEENTRY_API}/${id}`;
    return this.httpClient
      .delete(url)
  }

}