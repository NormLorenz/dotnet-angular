import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatToolbarModule, MatCheckboxModule, MatInputModule,
  MatProgressSpinnerModule, MatRadioModule, MatDatepickerModule, MatSelectModule,
  MatCardModule, MatTableModule, MatChipsModule, MatMenuModule, MatDialogModule,
  MatIconModule, MatTooltipModule, MatGridListModule, MatNativeDateModule
} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({

  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule,
    MatMomentDateModule,
  ],

  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule,
    MatMomentDateModule,
  ]
})

export class MaterialModule { }