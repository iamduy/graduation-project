import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractComponent } from "./contract.component";
import { Routers } from "src/app/utils";
const routes: Routes = [
    {
        path: '',
        component: ContractComponent,
        data: {
            breadcrumb: [
                {
                    label: Routers.RENTAL_MANAGEMENT.CONTRACT.NAME,
                    url: Routers.RENTAL_MANAGEMENT.CONTRACT.URL
                }
            ]
        }
    },
];
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    providers: [RouterModule]
})
export class ContractRoutingModule { }