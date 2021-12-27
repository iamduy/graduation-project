import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { ChartComponent } from './chart.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.CHART.NAME,
          url: ''
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
export class ChartRoutingModule { }
