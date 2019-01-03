import { TimeEntry } from './time-entry.interface';
import { Department } from './department.interface';
import { AreaDepartment } from './area-department.interface';
import { FunctionType } from './function-type.interface';
import { FunctionTypeDepartment } from './function-type-department.interface';
import { FunctionSubType } from './function-sub-type.interface';

export interface RequestAPI {
  item: TimeEntry;
  areaId: number;
  departmentId: number;
  departments: Department[];
  areaDepartments: AreaDepartment[];
  functionTypes: FunctionType[];
  functionTypeDepartments: FunctionTypeDepartment[];
  functionSubTypes: FunctionSubType[];
  action: string;
}

export interface ResponseAPI {
  item: TimeEntry;
  result: string;
  action: string;
}