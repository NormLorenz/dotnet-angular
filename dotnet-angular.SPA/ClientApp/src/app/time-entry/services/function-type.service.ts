import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { FunctionType } from '../models/function-type.interface';
import { ConfigurationService } from '../../services/configuration.service';

const FUNCTIONTYPE_API: string = 'functiontype';

// https://fullstack-developer.academy/caching-http-requests-with-angular/
// https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/

@Injectable()
export class FunctionTypeService {

  private cache: any;
  private observable$: Observable<FunctionType[]>;

  constructor(private http: HttpClient, private configuration: ConfigurationService) {
  }

  getFunctionTypes(): Observable<FunctionType[]> {
    if (this.cache) {
      return of(this.cache);
    }

    else if (this.observable$) {
      return this.observable$;
    }

    else {
      this.observable$ = this.http.get(`${this.configuration.apiAddress}/${FUNCTIONTYPE_API}`, {
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