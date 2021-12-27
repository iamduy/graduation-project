import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ShowLoadingDirective,
  ShowPermissionDirective,
  ShowRoleDirective,
  ShowModuleDirective,
} from './auth_show';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { NoDataComponent } from './no-data/no-data.component';
import { PaginateComponent } from './paginate/paginate.component';
import { UserInfo } from './UserInfo/user-info.component';
import { StaffInfo } from './StaffInfo/staff-info.component';
import { ShowTableDirective } from './auth_show/show-table.directive';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    NgDynamicBreadcrumbModule,
    MatDialogModule,
  ],
  declarations: [
    ShowPermissionDirective,
    ShowRoleDirective,
    ShowLoadingDirective,
    ShowModuleDirective,
    ShowTableDirective,
    LoadingPageComponent,
    NoDataComponent,
    PaginateComponent,
    UserInfo,
    StaffInfo,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ToastrModule,
    FormsModule,
    ShowPermissionDirective,
    ShowRoleDirective,
    ShowLoadingDirective,
    ShowModuleDirective,
    ShowTableDirective,
    ReactiveFormsModule,
    NgDynamicBreadcrumbModule,

    // components
    LoadingPageComponent,
    NoDataComponent,
    PaginateComponent,
    UserInfo,
    StaffInfo,
  ],
})
export class SharedModule {}
