import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigurationService {

  private configuration: IConfiguration;
  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get<IConfiguration>('/api/Configuration/ConfigurationData')
      .toPromise()
      .then(result => {
        this.configuration = <IConfiguration>(result);
      }, error => console.error(error));
  }

  get apiAddress(): string {
    return this.configuration.ApiAddress;
  }
  get buildNumber(): string {
    return this.configuration.BuildNumber;
  }
}

export interface IConfiguration {
  ApiAddress: string;
  BuildNumber: string;
}