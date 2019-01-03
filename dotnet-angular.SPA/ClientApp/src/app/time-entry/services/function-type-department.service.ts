import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { FunctionTypeDepartment } from '../models/function-type-department.interface';
import { ConfigurationService } from '../../services/configuration.service';

const FUNCTIONTYPEDEPARTMENT_API: string = 'functiontypedepartment';

// https://fullstack-developer.academy/caching-http-requests-with-angular/
// https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/

@Injectable()
export class FunctionTypeDepartmentService {

  private cache: any;
  private observable$: Observable<FunctionTypeDepartment[]>;

  constructor(private http: HttpClient, private configuration: ConfigurationService) {
  }

  getFunctionTypeDepartments(): Observable<FunctionTypeDepartment[]> {
    if (this.cache) {
      return of(this.cache);
    }

    else if (this.observable$) {
      return this.observable$;
    }

    else {
      this.observable$ = this.http.get(`${this.configuration.apiAddress}/${FUNCTIONTYPEDEPARTMENT_API}`, {
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