import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatRadioModule } from '@angular/material/radio'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { DetailReceiptsComponent } from './detail-receipts/detail-receipts.component'
import { ListReceiptsComponent } from './list-receipts/list-receipts.component'
import { CreateReasonComponent } from './reason/create-reason/create-reason.component'
import { ReceiptsReasonComponent } from './reason/receipts-reason/receipts-reason.component'
import { UpdateReasonComponent } from './reason/update-reason/update-reason.component'
import { ReceiptReasonInfo } from './receipts/ReceiptReasonInfo/receipt-reason-info.component'
import { ReceiptsComponent } from './receipts/receipts.component'
import { RevenueRoutingModule } from './revenue-routing.module'
import { RevenueComponent } from './revenue.component'
@NgModule({
    declarations: [
        RevenueComponent,
        ReceiptsComponent,
        ReceiptsReasonComponent,
        ListReceiptsComponent,
        DetailReceiptsComponent,
        UpdateReasonComponent,
        CreateReasonComponent,
        ReceiptReasonInfo
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule,
        RevenueRoutingModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ]
})
export class RevenueModule { }