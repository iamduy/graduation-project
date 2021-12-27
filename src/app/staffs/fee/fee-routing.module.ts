import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { FeeComponent } from './fee.component';

const routes: Routes = [{
  path: '',
  component: FeeComponent, data: {
    breadcrumb: [
      {
        label: Routers.RENTAL_MANAGEMENT.FEE.NAME,
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
export class FeeRoutingModule { }
