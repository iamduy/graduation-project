import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { CollectComponent } from './collect/collect.component';
import { ServiceMonth } from './service-month/service-month.component';
import { HistoryContractComponent } from './history-contract/history-contract.component';
import { AssetsComponent } from './assets/assets.component';
import { RentalStatusComponent } from './rental-status/rental-status.component';
import { ReportMaintenanceComponent } from './report-maintenance/report-maintenance.component';
import { ReportComponent } from './report.component';
import { ServiceContract } from './service-contract/service-contract.component';
import { TenantsComponent } from './tenants/tenants.component';
import { PermissionGuard } from 'src/app/core';
const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'hien-trang-thue',
    component: RentalStatusComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'rental-status',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.RENTAL_STATUS.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'khach-thue',
    component: TenantsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'tenants',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.TENANTS.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'lich-su-hop-dong',
    component: HistoryContractComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'contract-history',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.HISTORY_CONTRACT.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'bao-cao-thu',
    component: CollectComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'report-all',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.COLLECT.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'bao-cao-tai-san',
    component: AssetsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'asset-inventory',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.INVENTORY.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'bao-tri',
    component: ReportMaintenanceComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'maintenance-repair',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.REPORT_MAINTENANCE.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'dich-vu-thang',
    component: ServiceMonth,
    canActivate: [PermissionGuard],
    data: {
      permission: 'report-service-index',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.SERVICE_MONTH.NAME,
          url: '',
        },
      ],
    },
  },
  {
    path: 'dich-vu-khac',
    component: ServiceContract,
    canActivate: [PermissionGuard],
    data: {
      permission: 'report-project-service',
      breadcrumb: [
        {
          label: Routers.REPORT.LIST_REPORT.NAME,
          url: Routers.REPORT.LIST_REPORT.URL,
        },
        {
          label: Routers.REPORT.SERVICE_CONTRACT.NAME,
          url: '',
        },
      ],
    },
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class ReportRoutingModule {}
