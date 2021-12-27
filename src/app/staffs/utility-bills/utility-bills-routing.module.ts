import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { UtilityBillsComponent } from './utility-bills.component';

const routes: Routes = [
  {
    path: '',
    component: UtilityBillsComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.RENTAL_MANAGEMENT.UTILITY_BILLS.NAME,
          url: ''
        }
      ]
    }
  }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class UtilityBillsRoutingModule { }
