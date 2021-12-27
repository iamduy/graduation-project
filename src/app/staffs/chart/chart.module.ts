import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartRoutingModule } from './chart-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './chart.component';
import { SharedModule } from 'src/app/shared/shared.module'
@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, ChartRoutingModule, NgxChartsModule,
    SharedModule],
})
export class ChartModule {}
