import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TimeEntry } from '../models/time-entry.interface';
import { Department } from '../models/department.interface';
import { AreaDepartment } from '../models/area-department.interface';
import { FunctionType } from '../models/function-type.interface';
import { FunctionTypeDepartment } from '../models/function-type-department.interface';
import { FunctionSubType } from '../models/function-sub-type.interface';
import { RequestAPI, ResponseAPI } from '../models/api.interface';

@Component({
  selector: 'app-time-entry-dialog',
  templateUrl: './time-entry-dialog.component.html',
  styleUrls: ['./time-entry-dialog.component.css']
})

export class TimeEntryDialogComponent implements OnInit {

  // #region constructor
  constructor(
    public dialogRef: MatDialogRef<TimeEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: RequestAPI) {

    switch (data.action) {

      case 'edit':
        this.headerText = 'Edit an Existing Time Entry';
        this.isEdit = true;
        this.buttonText = 'Save';
        this.buttonColor = 'primary';
        break;

      case 'delete':
        this.headerText = 'Delete an Existing Time Entry';
        this.isDelete = true;
        this.buttonText = 'Delete';
        this.buttonColor = 'warn';
        break;

      case 'new':
        this.headerText = 'Create a New Time Entry';
        this.isNew = true;
        this.buttonText = 'Save';
        this.buttonColor = 'primary';
        break;
    }

    this.action = data.action;
    this.timeEntry = data.item;
    this.areaId = data.areaId;
    this.departmentId = data.departmentId;
    this.departments = data.departments;
    this.areaDepartments = data.areaDepartments;
    this.functionTypes = data.functionTypes;
    this.functionTypeDepartments = data.functionTypeDepartments;
    this.functionSubTypes = data.functionSubTypes;

    let selectedFunctionSubType = this.functionSubTypes
      .find(functionSubType => functionSubType.functionSubTypeId === this.timeEntry.functionSubTypeId)
    this.instructions = selectedFunctionSubType ? selectedFunctionSubType.comment : '';
  }
  // #endregion

  // #region local variables
  timeEntry: TimeEntry = null;
  areaId: number = null;
  departmentId: number = null;
  departments: Department[] = null;
  areaDepartments: AreaDepartment[] = null;
  functionTypes: FunctionType[] = null;
  functionTypeDepartments: FunctionTypeDepartment[] = null;
  functionSubTypes: FunctionSubType[] = null;
  instructions: string = null;
  // #endregion

  // #region filters
  compare(a, b, isAscending) {
    return (a < b ? -1 : 1) * (isAscending ? 1 : -1);
  }

  getFilteredDepartments(areaId: number,
    departments: Department[],
    areaDepartments: AreaDepartment[]): Department[] {

    let result = departments.filter(function (department) {
      return areaDepartments.some(function (areaDepartment) {
        return department.departmentId === areaDepartment.departmentId &&
          areaDepartment.areaId === areaId;
      });
    });

    return result.sort((a, b) => this.compare(a.departmentDescription, b.departmentDescription, true));
  }

  getFilteredFunctionsTypes(departmentId: number,
    functionTypes: FunctionType[],
    functionTypeDepartments: FunctionTypeDepartment[],
    functionSubTypes: FunctionSubType[]): FunctionType[] {

    // get all function types which match the department id
    let result = functionTypes.filter(function (functionType) {
      return functionTypeDepartments.some(function (functionTypeDepartment) {
        return functionType.functionTypeId === functionTypeDepartment.functionTypeId && functionTypeDepartment.departmentId === departmentId;
      });
    });

    // remove function types which have no corresponing functon sub types
    let result2 = result.filter(function (functionType) {
      return functionSubTypes.some(function (functionSubType) {
        return functionSubType.functionTypeId === functionType.functionTypeId;
      });
    });

    // return something to the caller
    return result2.sort((a, b) => this.compare(a.functionTypeDescription, b.functionTypeDescription, true));
  }

  getFilteredFunctionSubTypes(functionTypeId: number,
    functionSubTypes: FunctionSubType[]): FunctionSubType[] {

    let result = functionSubTypes.filter(function (functionSubType) {
      return functionSubType.functionTypeId === functionTypeId;
    });

    return result.sort((a, b) => this.compare(a.functionSubTypeDescription, b.functionSubTypeDescription, true));
  }
  // #endregion

  // #region dialog logic
  action: string = null;
  isNew: boolean = false;
  isDelete: boolean = false;
  isEdit: boolean = false;
  headerText: string = null;
  buttonText: string = null;
  buttonColor: string = null;
  // #endregion

  // #region date field
  dateIsEnabled(): boolean { return this.isNew || this.isEdit; }
  dateIsValid(): boolean { return true; }
  // #endregion

  // #region deparment field
  filteredDepartments: Department[] = null;
  selectedDepartment: Department = null;
  departmentIsEnabled(): boolean { return this.isNew; }
  departmentIsValid(): boolean { return this.timeEntry.departmentId !== null; }
  onDepartmentChange(): void {
    this.timeEntry.departmentId = this.selectedDepartment.departmentId;
    this.timeEntry.departmentDescription = this.selectedDepartment.departmentDescription;
    this.timeEntry.numberOfItems = 0;
    this.timeEntry.timeInMinutes = 0;
    this.timeEntry.showNumberOfItems = false;
    this.timeEntry.showTimeInMinutes = false;
    this.instructions = null;
    this.selectedFunctionType = null;
    this.selectedFunctionSubType = null;
    this.filteredFunctionTypes = this.getFilteredFunctionsTypes(this.selectedDepartment.departmentId, this.functionTypes, this.functionTypeDepartments, this.functionSubTypes);
  }
  // #endregion

  // #region function type field
  filteredFunctionTypes: FunctionType[] = null;
  selectedFunctionType: FunctionType = null;
  functionTypeIsEnabled(): boolean { return this.isNew; }
  functionTypeIsValid(): boolean { return this.timeEntry.functionTypeId != null; }
  onFunctionTypeChange(): void {
    this.timeEntry.functionTypeId = this.selectedFunctionType.functionTypeId;
    this.timeEntry.functionTypeDescription = this.selectedFunctionType.functionTypeDescription;
    this.timeEntry.numberOfItems = 0;
    this.timeEntry.timeInMinutes = 0;
    this.timeEntry.showNumberOfItems = false;
    this.timeEntry.showTimeInMinutes = false;
    this.instructions = null;
    this.selectedFunctionSubType = null;
    this.filteredFunctionSubTypes = this.getFilteredFunctionSubTypes(this.selectedFunctionType.functionTypeId, this.functionSubTypes);
  }
  // #endregion

  // #region function sub type field
  filteredFunctionSubTypes: FunctionSubType[] = null;
  selectedFunctionSubType: FunctionSubType = null;
  functionSubTypeEnabled(): boolean { return this.isNew; }
  functionSubTypeIsValid(): boolean { return this.timeEntry.functionSubTypeId != null; }
  onFunctionSubTypeChange(): void {
    this.timeEntry.functionSubTypeId = this.selectedFunctionSubType.functionSubTypeId;
    this.timeEntry.functionSubTypeDescription = this.selectedFunctionSubType.functionSubTypeDescription;
    this.timeEntry.showNumberOfItems = this.selectedFunctionSubType.showNumberOfItems ? true : false;
    this.timeEntry.showTimeInMinutes = this.selectedFunctionSubType.showTimeInMinutes ? true : false;
    this.instructions = this.selectedFunctionSubType.comment;
  }
  // #endregion

  // #region number of items field
  itemIsEnabled(): boolean { return this.isNew || this.isEdit; }
  itemIsHidden(): boolean { return this.timeEntry.showNumberOfItems === false; }
  itemIsValid(): boolean { return this.timeEntry.showNumberOfItems === false ? true : this.timeEntry.numberOfItems > 0; }
  // #endregion

  // #region time in minutes field
  timeIsEnabled(): boolean { return this.isNew || this.isEdit; }
  timeIsHidden(): boolean { return this.timeEntry.showTimeInMinutes === false; }
  timeIsValid(): boolean { return this.timeEntry.showTimeInMinutes === false ? true : this.timeEntry.timeInMinutes > 0; }
  // #endregion

  // #region comment field
  commentIsEnabled(): boolean { return this.isNew || this.isEdit; }
  // #endregion

  // #region is time entry valid
  timeEntryIsValid(): boolean {
    // console.log('----------------------------------------------');
    // console.log('dateIsValid', this.dateIsValid());
    // console.log('departmentIsValid', this.departmentIsValid());
    // console.log('functionTypeIsValid', this.functionTypeIsValid());
    // console.log('functionSubTypeIsValid', this.functionSubTypeIsValid());
    // console.log('itemIsValid', this.itemIsValid());
    // console.log('timeIsValid', this.timeIsValid());
    return this.isDelete === true ? true :
      this.dateIsValid() && this.departmentIsValid() && this.functionTypeIsValid() &&
      this.functionSubTypeIsValid() && this.itemIsValid() && this.timeIsValid();
  }
  // #endregion

  buttonClick(result: string): void {
    let response: ResponseAPI = {
      item: this.timeEntry,
      action: this.action,
      result: result,
    }

    this.dialogRef.close(response);

  }

  ngOnInit() {
    // prime the pump
    this.filteredDepartments = this.getFilteredDepartments(this.areaId, this.departments, this.areaDepartments);
    this.selectedDepartment = this.departments.find(department => department.departmentId === this.departmentId);
    this.timeEntry.departmentId = this.selectedDepartment.departmentId;
    this.timeEntry.departmentDescription = this.selectedDepartment.departmentDescription;
    this.filteredFunctionTypes = this.getFilteredFunctionsTypes(this.selectedDepartment.departmentId, this.functionTypes, this.functionTypeDepartments, this.functionSubTypes);
  }
}