import { NgModule } from '@angular/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SharedModule } from 'src/app/shared/shared.module'
import { DetailInvoiceComponent } from '../detail-invoice/detail-invoice.component'
import { InvoiceStudentRoutingModule } from './invoice-student-routing.module'
import { InvoiceStudentComponent } from './invoice-student.component'
@NgModule({
    declarations: [InvoiceStudentComponent, DetailInvoiceComponent],
    imports: [
        SharedModule,
        InvoiceStudentRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDialogModule,
    ],
})
export class InvoiceStudentModule { }