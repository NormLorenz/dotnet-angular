import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IdentityService {

  private identity: IIdentity;
  constructor(private http: HttpClient) { }

  loadIdentity() {
    return this.http.get<IIdentity>('/api/Identity/IdentityData')
      .toPromise()
      .then(result => {
        this.identity = <IIdentity>(result);
      }, error => console.error(error));
  }

  get UserIdentity(): string {
    return this.identity.UserIdentity;
  }
  get IsAuthenticated(): string {
    return this.identity.IsAuthenticated;
  }
  get AssociateID(): number {
    return Number(this.identity.AssociateID);
  }
  get UserName(): string {
    return this.identity.UserName;
  }
  get FullName(): string {
    return this.identity.FullName;
  }
  get DepartmentID(): number {
    return Number(this.identity.DepartmentID);
  }
  get WorkgroupID(): number {
    return Number(this.identity.WorkgroupID);
  }
  get RoleID(): number {
    return Number(this.identity.RoleID);
  }
  get AreaID(): number {
    return Number(this.identity.AreaID);
  }
  get EmployeeNumber(): string {
    return this.identity.EmployeeNumber;
  }
  get RoleName(): string {
    return this.identity.RoleName;
  }
}

export interface IIdentity {
  UserIdentity: string;
  IsAuthenticated: string;
  AssociateID: string;
  UserName: string;
  FullName: string;
  DepartmentID: string;
  WorkgroupID: string;
  RoleID: string;
  AreaID: string;
  EmployeeNumber: string;
  RoleName: string;
}