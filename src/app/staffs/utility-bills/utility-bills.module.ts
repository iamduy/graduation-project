import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateBillComponent } from './update-bill/update-bill.component';
import { UtilityBillsRoutingModule } from './utility-bills-routing.module';
import { UtilityBillsComponent } from './utility-bills.component';


@NgModule({
  declarations: [UtilityBillsComponent, UpdateBillComponent],
  imports: [
    SharedModule,
    UtilityBillsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class UtilityBillsModule { }
