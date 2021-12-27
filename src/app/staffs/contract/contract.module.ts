import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { SharedModule } from 'src/app/shared/shared.module'
import { ContractRoutingModule } from './contract-routing.module'
import { ContractComponent } from './contract.component'
import { ChangedBedComponent } from './settings/changed-bed/changed-bed.component'
import { CreateContractComponent } from './settings/create-contract/create-contract.component'
import { InfoContractModalComponent } from './settings/info-contract/info-contract.component'
import { PrintingContractComponent } from './settings/printing-contract/printing-contract.component'


@NgModule({
  declarations: [
    ContractComponent,
    InfoContractModalComponent,
    PrintingContractComponent,
    CreateContractComponent,
    ChangedBedComponent],
  imports: [
    SharedModule,
    ContractRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule
  ],
})
export class ContractModule { }
