// todo: bring down google icons and install locally or use link in assets folder - https://medium.com/@DenysVuika/material-icons-with-angular-cli-projects-b11bbace0425
// todo: sorting arrow problem

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatRadioChange, MatDialog, MatSort, Sort } from '@angular/material';
import { DatePipe } from '@angular/common';

import { TimeEntry } from '../models/time-entry.interface';
import { TimeEntryService } from '../services/time-entry.service';
import { DepartmentService } from '../services/department.service';
import { AreaDepartmentService } from '../services/area-department.service';
import { FunctionTypeService } from '../services/function-type.service';
import { FunctionTypeDepartmentService } from '../services/function-type-department.service';
import { FunctionSubTypeService } from '../services/function-sub-type.service';
import { IdentityService } from '../../services/identity.service';

import { TimeEntryDialogComponent } from '../components/time-entry-dialog.component';
import { RequestAPI, ResponseAPI } from '../models/api.interface';
import moment = require('moment');

export interface DurationType {
  id: number;
  name: string;
}

const DEFAULT_SELECTED_DURATION = 2;

@Component({
  selector: 'app-time-entry-list',
  styleUrls: ['./time-entry-list.component.css'],
  templateUrl: './time-entry-list.component.html'
})

export class TimeEntryListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private timeEntryService: TimeEntryService,
    private departmentService: DepartmentService,
    private areaDepartmentService: AreaDepartmentService,
    private functionTypeService: FunctionTypeService,
    private functionTypeDepartmentService: FunctionTypeDepartmentService,
    private functionSubTypeService: FunctionSubTypeService,
    private identityService: IdentityService,
    private datePipe: DatePipe,
    public dialog: MatDialog) {

    this.getSortedTimeEntries(true);

    this.departmentService
      .getDepartments()
      .subscribe(result => this.departments = result)
    this.areaDepartmentService
      .getAreaDepartments()
      .subscribe(result => this.areaDepartments = result)
    this.functionTypeService
      .getFunctionTypes()
      .subscribe(result => this.functionTypes = result)
    this.functionTypeDepartmentService
      .getFunctionTypeDepartments()
      .subscribe(result => this.functionTypeDepartments = result)
    this.functionSubTypeService
      .getFunctionSubTypes()
      .subscribe(result => this.functionSubTypes = result)
    this.identityService = identityService;
  }

  durationList: DurationType[] = [
    { id: 1, name: 'Today' },
    { id: 6, name: 'Yesterday' },
    { id: 2, name: 'This Month' },
    { id: 3, name: 'One Month Ago' },
    { id: 4, name: 'Two Months Ago' },
    { id: 5, name: 'Everything Else' },
  ]

  filterText: string = null;
  selectedDuration = DEFAULT_SELECTED_DURATION;

  displayedColumns: string[] = ['date', 'department', 'function', 'subtype', 'items', 'minutes', 'actions'];
  sortedData: any = [];

  departments: any = [];
  areaDepartments: any = [];
  functionTypes: any = [];
  functionTypeDepartments: any = [];
  functionSubTypes: any = [];

  private getSortedTimeEntries(initialize: boolean) {
    this.setFilterText(this.selectedDuration);
    this.timeEntryService
      .getTimeEntries(this.identityService.AssociateID, this.selectedDuration)
      .subscribe(
        (result: TimeEntry[]) => { this.sortedData = new MatTableDataSource(result); },
        (err: any) => { console.log('error', err); },
        () => {
          if (initialize === true) {
            this.sortedData.sort = this.sort;
            this.applyPredicate();
          }
          this.sortData({ active: 'date', direction: 'asc' });
        });
  }

  private setFilterText(selectedDuration: number): void {
    const base: string = 'Filter Time Entries';
    let duration: string = null;

    // https://www.youtube.com/watch?v=uu0teLiY0GM
    // https://stackoverflow.com/questions/47816319/cannot-find-module-angular-material-moment-adapter

    let now: moment.Moment = moment();

    switch (selectedDuration) {
      case 1:
        duration = now.format('dddd MMM DD, YYYY');
        break;
      case 6:
        duration = now.subtract(1, 'day').format('dddd MMM DD, YYYY');
        break;
      case 2:
        duration = now.format('MMMM YYYY');
        break;
      case 3:
        duration = now.subtract(1, 'month').format('MMMM YYYY');
        break;
      case 4:
        duration = now.subtract(2, 'month').format('MMMM YYYY');
        break;
      case 5:
        let fromDate: string = now.subtract(3, 'month').format('MMMM YYYY');
        let toDate: string = now.subtract(6, 'month').format('MMMM YYYY');
        duration = `${fromDate} to ${toDate}`;
        break;
    }

    this.filterText = `${base} ~ ${duration}`;
  }

  private compare(a, b, isAscending) {
    return (a < b ? -1 : 1) * (isAscending ? 1 : -1);
  }

  private sortData(sort: Sort) {
    const data: any = this.sortedData.data;
    if (!sort.active || sort.direction === '') {
      this.sortedData.data = data;
      return;
    }
    this.sortedData.data = this.sortedData.data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'date': return this.compare(a.entryDate, b.entryDate, isAsc);
        case 'department': return this.compare(a.departmentDescription, b.departmentDescription, isAsc);
        case 'function': return this.compare(a.functionTypeDescription, b.functionTypeDescription, isAsc);
        case 'subtype': return this.compare(a.functionSubTypeDescription, b.functionSubTypeDescription, isAsc);
        default: return 0;
      }
    });
  }

  private applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.sortedData.filter = filterValue;
  }

  private applyPredicate(): void {
    this.sortedData.filterPredicate = (data: TimeEntry, filter: string) => {
      const entryDate: string = this.datePipe.transform(data.entryDate, 'EEEE MMM d, y').toLowerCase();
      const department: string = data.departmentDescription.toLowerCase();
      const functionType: string = data.functionTypeDescription.toLowerCase();
      const subfunction: string = data.functionSubTypeDescription.toLowerCase();
      const numberOfItems: string = data.numberOfItems.toString();
      const timeInMinutes: string = data.timeInMinutes.toString();
      const allFields: string = `${entryDate} ${department} ${functionType} ${subfunction} ${numberOfItems} ${timeInMinutes}`;
      return allFields.indexOf(filter) != -1;
    }
  }

  private openDialog(item: TimeEntry, action: string): void {

    let data: RequestAPI = {
      item: item,
      areaId: this.identityService.AreaID,
      departmentId: this.identityService.DepartmentID,
      departments: this.departments,
      areaDepartments: this.areaDepartments,
      functionTypes: this.functionTypes,
      functionTypeDepartments: this.functionTypeDepartments,
      functionSubTypes: this.functionSubTypes,
      action: action
    };

    const dialogRef = this.dialog.open(TimeEntryDialogComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(data => {

      // cast any type to ResponseAPI type
      let _data = data as ResponseAPI;

      if (_data.result === 'ok') {
        switch (_data.action) {
          case 'edit':
            this.timeEntryService.putTimeEntry(_data.item)
              .subscribe(
                () => { },
                (err: any) => { console.log('error', err); },
                () => { this.getSortedTimeEntries(false) }
              )
            break;
          case 'delete':
            this.timeEntryService.deleteTimeEntry(_data.item.timeEntryId)
              .subscribe(
                () => { },
                (err: any) => { console.log('error', err); },
                () => { this.getSortedTimeEntries(false) }
              )
            break;
          case 'new':
            this.timeEntryService.postTimeEntry(_data.item)
              .subscribe(
                () => { },
                (err: any) => { console.log('error', err); },
                () => { this.getSortedTimeEntries(false) }
              )
            break;
        }
      }
    });
  }

  private radioChange(event: MatRadioChange) {

    // todo: issue when programmatically setting the sort parameters
    // https://github.com/angular/material2/issues/10242
    // https://stackblitz.com/edit/angular-vuvckf?file=app%2Ftable-overview-example.ts

    this.selectedDuration = event.value;
    this.getSortedTimeEntries(false);
  }

  buttonClick(item, action) {

    let dateCreated: Date = moment().toDate();
    let entryDate: Date = moment().startOf('day').toDate();

    let newItem: TimeEntry = {
      timeEntryId: null,
      associateId: this.identityService.AssociateID,
      functionTypeId: null,
      functionSubTypeId: null,
      numberOfItems: 0,
      timeInMinutes: 0,
      description: null,
      entryDate: entryDate,
      dateCreated: dateCreated,
      departmentId: null,
      departmentDescription: null,
      functionTypeDescription: null,
      functionSubTypeDescription: null,
      showNumberOfItems: false,
      showTimeInMinutes: false,
      standardMinutes: 0.00,
      trainingTask: false,
    };

    this.openDialog(item ? item : newItem, action);
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }

}