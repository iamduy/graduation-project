import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatTabsModule } from '@angular/material/tabs'
import { SharedModule } from 'src/app/shared/shared.module'
import { FeeRoutingModule } from './fee-routing.module'
import { FeeComponent } from './fee.component'
import { InvoiceContract } from './InvoiceContract/invoice-contract'
import { InvoiceMonth } from './InvoiceMonth/invoice-month'
import { MenuFeeComponent } from './menu-fee/menu-fee.component'
import { ViewInvoiceContract } from './ViewInvoiceContract/ViewInvoice-contract'
import { ViewInvoiceMonth } from './ViewInvoiceMonth/ViewInvoice-month'
@NgModule({
  declarations: [FeeComponent, MenuFeeComponent, InvoiceContract, InvoiceMonth, ViewInvoiceContract, ViewInvoiceMonth],
  imports: [
    SharedModule,
    FeeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule
  ],
})
export class FeeModule { }
