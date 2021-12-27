import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';

import { ProjectsComponent } from './projects.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddRoomTypeComponent } from './type-room/add-room-type/add-room-type.component';
import { EditRoomTypeComponent } from './type-room/edit-room-type/edit-room-type.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectServiceEditComponent } from './project-service/project-service-edit/project-service-edit.component';
import { ProjectServiceAddComponent } from './project-service/project-service-add/project-service-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { BuildingCreateComponent } from './building/building-create/building-create.component';
import { BuildingEditComponent } from './building/building-edit/building-edit.component';
@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    AddRoomTypeComponent,
    EditRoomTypeComponent,
    ProjectServiceEditComponent,
    ProjectServiceAddComponent,
    ProjectEditComponent,
    BuildingCreateComponent,
    BuildingEditComponent,
  ],
  imports: [
    ProjectsRoutingModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    SharedModule,
    MatStepperModule,
  ],
})
export class ProjectsModule {}
