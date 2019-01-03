// common
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { DatePipe } from '@angular/common';

// containers
import { TimeEntryListComponent } from './containers/time-entry-list.component';

// components
import { TimeEntryDialogComponent } from './components/time-entry-dialog.component'

// services
import { TimeEntryService } from './services/time-entry.service';
import { DepartmentService } from './services/department.service';
import { AreaDepartmentService } from './services/area-department.service';
import { FunctionTypeService } from './services/function-type.service';
import { FunctionTypeDepartmentService } from './services/function-type-department.service';
import { FunctionSubTypeService } from './services/function-sub-type.service';

// pipes

// routes
const routes: Routes = [
  {
    path: 'timeentry',
    children: [
      { path: '', component: TimeEntryListComponent },
      { path: ':id', component: TimeEntryListComponent }
    ]
  }
];

@NgModule({
  declarations: [
    TimeEntryListComponent,
    TimeEntryDialogComponent,
  ],

  entryComponents: [
    TimeEntryDialogComponent,
  ],

  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ],

  providers: [
    TimeEntryService,
    DepartmentService,
    AreaDepartmentService,
    FunctionTypeService,
    FunctionTypeDepartmentService,
    FunctionSubTypeService,
    DatePipe,
  ]

})
export class TimeEntryModule { }