import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingUserComponent } from './setting-user.component';
import { TypeUserComponent } from './list-type-user/type-user/type-user.component';
import { UserComponent } from './list-user/user/user.component';
import { Routers } from 'src/app/utils';
import { DelegationComponent } from './delegation/delegation.component';
import { PermissionGuard } from 'src/app/core';
const routes: Routes = [
  {
    path: '',
    component: SettingUserComponent,
    children: [
      {
        path: 'nhan-vien',
        component: UserComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'user-list',
          breadcrumb: [
            {
              label: Routers.SETTING_USER.USER.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'chuc-vu',
        component: TypeUserComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'role-list',
          breadcrumb: [
            {
              label: Routers.SETTING_USER.TYPE_USER.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'phan-quyen',
        component: DelegationComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'permission-list',
          breadcrumb: [
            {
              label: Routers.SETTING_USER.DELEGATION.NAME,
              url: '',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class SettingUserRoutingModule {}
