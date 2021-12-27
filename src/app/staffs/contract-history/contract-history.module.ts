import { NgModule } from '@angular/core';
import { ContractHistoryComponent } from './contract-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractHistoryRoutingModule } from './contract-history-routing.module';
import { ViewInfoComponent } from './view-info/view-info.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [ContractHistoryComponent, ViewInfoComponent],
  imports: [SharedModule, ContractHistoryRoutingModule, MatDialogModule],
})
export class ContractHistoryModule { }