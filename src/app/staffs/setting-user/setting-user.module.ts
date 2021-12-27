import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingUserRoutingModule } from './setting-user-routing.module';
import { UserComponent } from './list-user/user/user.component';
import { TypeUserComponent } from './list-type-user/type-user/type-user.component';
import { SettingUserComponent } from './setting-user.component';
import { EditUserComponent } from './list-user/edit-user/edit-user.component';
import { CreateUserComponent } from './list-user/create-user/create-user.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CreateTypeUserComponent } from './list-type-user/create-type-user/create-type-user.component';
import { EditTypeUserComponent } from './list-type-user/edit-type-user/edit-type-user.component';
import { DelegationComponent } from './delegation/delegation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DetailUserComponent } from './list-user/detail-user/detail-user.component';
import { DetailComponent } from './list-type-user/detail/detail.component';

@NgModule({
  declarations: [
    UserComponent,
    TypeUserComponent,
    SettingUserComponent,
    EditUserComponent,
    CreateUserComponent,
    CreateTypeUserComponent,
    EditTypeUserComponent,
    DelegationComponent,
    DetailUserComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SettingUserRoutingModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
})
export class SettingUserModule {}
