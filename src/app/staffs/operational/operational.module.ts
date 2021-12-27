import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationalComponent } from './operational.component';
import { OperationalRoutingModule } from './operational-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

import { ListMaintenanceComponent } from './maintenance/list-maintenance/list-maintenance.component';
import { DetailMaintenanceComponent } from './maintenance/detail-maintenance/detail-maintenance.component';
import { CreateMaintenanceComponent } from './maintenance/create-maintenance/create-maintenance.component';
import { EditMaintenanceComponent } from './maintenance/edit-maintenance/edit-maintenance.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { DetailTaskComponent } from './task/detail-task/detail-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginateComponent } from 'src/app/shared/paginate/paginate.component';
@NgModule({
  declarations: [
    OperationalComponent,
    ListMaintenanceComponent,
    DetailMaintenanceComponent,
    CreateMaintenanceComponent,
    EditMaintenanceComponent,
    ListTaskComponent,
    CreateTaskComponent,
    DetailTaskComponent,
    EditTaskComponent,
  ],

  imports: [
    CommonModule,
    OperationalRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ],
})
export class OperationalModule {}
