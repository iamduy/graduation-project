import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AssetComponent } from './list-asset/asset/asset.component';
import { CreateAssetComponent } from './list-asset/create-asset/create-asset.component';
import { DetailAssetComponent } from './list-asset/detail-asset/detail-asset.component';
import { EditAssetComponent } from './list-asset/edit-asset/edit-asset.component';
import { CreateProducerComponent } from './list-producer/create-producer/create-producer.component';
import { EditProducerComponent } from './list-producer/edit-producer/edit-producer.component';
import { ProducerComponent } from './list-producer/producer/producer.component';
import { CreateTypeAssetComponent } from './list-type/create-type-asset/create-type-asset.component';
import { EditTypeAssetComponent } from './list-type/edit-type-asset/edit-type-asset.component';
import { TypeAssetComponent } from './list-type/type-asset/type-asset.component';
import { CreateUnitAssetComponent } from './list-unit/create-unit-asset/create-unit-asset.component';
import { EditUnitAssetComponent } from './list-unit/edit-unit-asset/edit-unit-asset.component';
import { UnitAssetComponent } from './list-unit/unit-asset/unit-asset.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsComponent } from './assets.component';

@NgModule({
  declarations: [
    AssetsComponent,
    AssetComponent,
    CreateAssetComponent,
    DetailAssetComponent,
    EditAssetComponent,
    CreateProducerComponent,
    EditProducerComponent,
    ProducerComponent,
    CreateTypeAssetComponent,
    EditTypeAssetComponent,
    TypeAssetComponent,
    CreateUnitAssetComponent,
    EditUnitAssetComponent,
    UnitAssetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AssetsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ],
})
export class AssetsModule {}
