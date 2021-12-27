import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { InvoiceStudentComponent } from './invoice-student.component';
const routes: Routes = [
    {
        path: '',
        component: InvoiceStudentComponent,
        data: {
            breadcrumb: [
                {
                    label: Routers.INVOICE_STUDENT.NAME,
                    url: Routers.INVOICE_STUDENT.URL
                }
            ]
        }
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    providers: [RouterModule],
})
export class InvoiceStudentRoutingModule { }