import { NgModule } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatRadioModule } from '@angular/material/radio'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { SharedModule } from 'src/app/shared/shared.module'
import { CollectComponent } from './collect/collect.component'
import { ServiceMonth } from './service-month/service-month.component'
import { HistoryContractComponent } from './history-contract/history-contract.component'
import { AssetsComponent } from './assets/assets.component'
import { RentalStatusComponent } from './rental-status/rental-status.component'
import { ReportMaintenanceComponent } from './report-maintenance/report-maintenance.component'
import { ReportRoutingModule } from './report-routing.module'
import { ReportComponent } from './report.component'
import { ServiceContract } from './service-contract/service-contract.component'
import { TenantsComponent } from './tenants/tenants.component'
@NgModule({
    declarations: [
        ReportComponent,
        RentalStatusComponent,
        TenantsComponent,
        HistoryContractComponent,
        CollectComponent,
        AssetsComponent,
        ReportMaintenanceComponent,
        ServiceMonth,
        ServiceContract
    ],
    imports: [
        SharedModule,
        ReportRoutingModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule
    ]
})
export class ReportModule { }