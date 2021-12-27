import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuardService,
  StaffGuardService,
  StudentGuardService,
  PermissionGuard,
} from './core';
import { NotFoundComponent } from './not-found/not-found.component';
import { StaffsComponent } from './staffs/staffs.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path: 'sinh-vien',
    component: StudentsComponent,
    canActivate: [AuthGuardService, StudentGuardService],
    children: [
      { path: '', redirectTo: 'hop-dong-thue', pathMatch: 'full' },
      {
        path: 'thong-tin-ca-nhan',
        loadChildren: () =>
          import('./students/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'hop-dong-thue',
        loadChildren: () =>
          import('./students/contract/contract.module').then(
            (m) => m.ContractModule
          ),
      },
      {
        path: 'hoa-don-thu',
        loadChildren: () =>
          import(
            './students/invoice/invoice-student/invoice-student.module'
          ).then((m) => m.InvoiceStudentModule),
      },
      {
        path: 'thong-bao',
        loadChildren: () =>
          import('./students/notice/notice.module').then((m) => m.NotifModule),
      },
    ],
  },
  {
    path: 'quan-tri-vien',
    component: StaffsComponent,
    canActivate: [AuthGuardService, StaffGuardService],
    children: [
      { path: '', redirectTo: 'welcom', pathMatch: 'full' },
      {
        path: 'welcom',
        loadChildren: () =>
          import('./staffs/wel/wel.module').then((m) => m.WelModule),
      },
      {
        path: 'bieu-do',
        loadChildren: () =>
          import('./staffs/chart/chart.module').then((m) => m.ChartModule),
        canActivate: [PermissionGuard],
        data: { module: 'Biểu đồ thống kê' },
      },
      {
        path: 'quan-ly-du-an',
        loadChildren: () =>
          import('./staffs/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
        canActivate: [PermissionGuard],
        data: { module: 'Quản lí Dự án' },
      },
      {
        path: 'quan-ly-hop-dong',
        loadChildren: () =>
          import('./staffs/contract/contract.module').then(
            (m) => m.ContractModule
          ),
        canActivate: [PermissionGuard],
        data: { table: 'Hợp đồng' },
      },
      {
        path: 'lich-su-thanh-ly',
        loadChildren: () =>
          import('./staffs/contract-history/contract-history.module').then(
            (m) => m.ContractHistoryModule
          ),
        canActivate: [PermissionGuard],
        data: { table: 'Lịch sử thanh lý HĐ' },
      },
      {
        path: 'toa-nha',
        loadChildren: () =>
          import('./staffs/building/building.module').then(
            (m) => m.BuildingModule
          ),
        canActivate: [PermissionGuard],
        data: { module: 'Quản lí tòa nhà' },
      },
      {
        path: 'quan-ly-thu-phi',
        loadChildren: () =>
          import('./staffs/fee/fee.module').then((m) => m.FeeModule),
        canActivate: [PermissionGuard],
        data: { table: 'Thu phí' },
      },
      {
        path: 'quan-ly-sinh-vien',
        loadChildren: () =>
          import('./staffs/manage-student/manage-student.module').then(
            (m) => m.ManageStudentModule
          ),
        canActivate: [PermissionGuard],
        data: { module: 'Quản lí khách thuê' },
      },
      {
        path: 'thong-tin-ca-nhan',
        loadChildren: () =>
          import('./staffs/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'quan-ly-hoa-don-dien-nuoc',
        loadChildren: () =>
          import('./staffs/utility-bills/utility-bills.module').then(
            (m) => m.UtilityBillsModule
          ),
        canActivate: [PermissionGuard],
        data: { table: 'Chốt điện nước' },
      },
      {
        path: 'quan-ly-danh-muc',
        loadChildren: () =>
          import('./staffs/operational/operational.module').then(
            (m) => m.OperationalModule
          ),
        canActivate: [PermissionGuard],
        data: { module: 'Quản lí công việc' },
      },
      {
        path: 'quan-ly-tai-san',
        loadChildren: () =>
          import('./staffs/assets/assets.module').then((m) => m.AssetsModule),
        canActivate: [PermissionGuard],
        data: { module: 'Danh mục tài sản' },
      },
      {
        path: 'quan-ly-doanh-thu',
        loadChildren: () =>
          import('./staffs/revenue/revenue.module').then(
            (m) => m.RevenueModule
          ),
        canActivate: [PermissionGuard],
        data: { module: 'Quản lí thu' },
      },
      {
        path: 'quan-ly-bao-cao',
        loadChildren: () =>
          import('./staffs/report/report.module').then((m) => m.ReportModule),
        canActivate: [PermissionGuard],
        data: { module: 'Báo cáo' },
      },
      {
        path: 'cai-dat',
        loadChildren: () =>
          import('./staffs/setting-user/setting-user.module').then(
            (m) => m.SettingUserModule
          ),
        canActivate: [PermissionGuard],
        data: { module: 'Cài đặt người dùng' },
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
