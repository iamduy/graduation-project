import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueComponent } from './revenue.component';
import { ListReceiptsComponent } from './list-receipts/list-receipts.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { ReceiptsReasonComponent } from './reason/receipts-reason/receipts-reason.component';
import { Routers } from 'src/app/utils';
import { PermissionGuard } from 'src/app/core';
const routes: Routes = [
  {
    path: '',
    component: RevenueComponent,
    children: [
      {
        path: 'danh-sach-thu',
        component: ListReceiptsComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'receipts-list',
          breadcrumb: [
            {
              label: Routers.REVENUE.LIST_RECEIPTS.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'phieu-thu',
        component: ReceiptsComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'Receipt-add',
          breadcrumb: [
            {
              label: Routers.REVENUE.RECEIPTS.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'ly-do-thu',
        component: ReceiptsReasonComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'reasons-list',
          breadcrumb: [
            {
              label: Routers.REVENUE.RECEIPTS_REASON.NAME,
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
export class RevenueRoutingModule {}
