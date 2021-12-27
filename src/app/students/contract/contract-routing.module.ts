import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Routers } from 'src/app/utils'
import { ContractComponent } from './contract'
const routes: Routes = [
    {
        path: '',
        component: ContractComponent,
        data: {
            breadcrumb: [
                {
                    label: Routers.CONTRACT_STUDENT.NAME,
                    url: Routers.CONTRACT_STUDENT.URL
                }
            ]
        }
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    providers: [RouterModule],
})
export class ContractRoutingModule { }