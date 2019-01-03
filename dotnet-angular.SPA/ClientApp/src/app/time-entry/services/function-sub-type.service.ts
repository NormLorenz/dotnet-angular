import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { FunctionSubType } from '../models/function-sub-type.interface';
import { ConfigurationService } from '../../services/configuration.service';

const FUNCTIONSUBTYPE_API: string = 'functionsubtype';

// https://fullstack-developer.academy/caching-http-requests-with-angular/
// https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/

@Injectable()
export class FunctionSubTypeService {

  private cache: any;
  private observable$: Observable<FunctionSubType[]>;

  constructor(private http: HttpClient, private configuration: ConfigurationService) {
  }

  getFunctionSubTypes(): Observable<FunctionSubType[]> {
    if (this.cache) {
      return of(this.cache);
    }

    else if (this.observable$) {
      return this.observable$;
    }

    else {
      this.observable$ = this.http.get(`${this.configuration.apiAddress}/${FUNCTIONSUBTYPE_API}`, {
        observe: 'response'
      })
        .pipe(
          map(response => {
            this.observable$ = null;
            if (response.status === 400) {
              return 'Request failed.';
            }
            else if (response.status === 200) {
              this.cache = response.body;
              return this.cache;
            }
          }),
          share()
        )
      return this.observable$;
    }
  }

  refresh() {
    this.cache = null;
  }

}