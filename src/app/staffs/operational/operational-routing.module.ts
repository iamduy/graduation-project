import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationalComponent } from './operational.component';
import { ListMaintenanceComponent } from './maintenance/list-maintenance/list-maintenance.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { Routers } from 'src/app/utils';
import { PermissionGuard } from 'src/app/core';
const routes: Routes = [
  {
    path: '',
    component: OperationalComponent,
    children: [
      {
        path: 'bao-tri',
        component: ListMaintenanceComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'maintenance-repair',
          breadcrumb: [
            {
              label: Routers.OPERATIONAL.MAINTENANCE.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'cong-viec',
        component: ListTaskComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'task-list',
          breadcrumb: [
            {
              label: Routers.OPERATIONAL.TASK.NAME,
              url: '',
            },
          ],
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class OperationalRoutingModule {}
