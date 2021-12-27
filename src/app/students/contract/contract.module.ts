import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module'
import { ContractComponent } from './contract'
import { ContractRoutingModule } from './contract-routing.module'

@NgModule({
    declarations: [ContractComponent],
    imports: [
        SharedModule,
        ContractRoutingModule
    ],
})
export class ContractModule { }