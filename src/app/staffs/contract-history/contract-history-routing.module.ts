import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routers } from "src/app/utils";
import { ContractHistoryComponent } from "./contract-history.component";

const routes: Routes = [
  {
    path: '',
    component: ContractHistoryComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.RENTAL_MANAGEMENT.HISTORY.NAME,
          url: ''
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
export class ContractHistoryRoutingModule { }