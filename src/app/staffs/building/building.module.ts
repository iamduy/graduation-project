import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingRoutingModule } from './building-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddBedComponent } from './bed/add-bed/add-bed.component';
import { AssetComponent } from './bed/asset/asset.component';
import { DetailGuestRentComponent } from './bed/detail-guest-rent/detail-guest-rent.component';
import { DetailReceiptsComponent } from './bed/detail-receipts/detail-receipts.component';
import { GuestRentComponent } from './bed/guest-rent/guest-rent.component';
import { InfoComponent } from './bed/info/info.component';
import { ListBedComponent } from './bed/list-bed/list-bed.component';
import { MenuBedComponent } from './bed/menu-bed/menu-bed.component';
import { ReceiptsHistoryComponent } from './bed/receipts-history/receipts-history.component';
import { AddBuildingComponent } from './building/add-building/add-building.component';
import { DetailBuildingComponent } from './building/detail-building/detail-building.component';
import { EditBuildingComponent } from './building/edit-building/edit-building.component';
import { MenuBuildingComponent } from './building/menu-building/menu-building.component';
import { AddFloorComponent } from './floor/add-floor/add-floor.component';
import { EditFloorComponent } from './floor/edit-floor/edit-floor.component';
import { ListFloorComponent } from './floor/list-floor/list-floor.component';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { DetailRoomComponent } from './room/detail-room/detail-room.component';
import { ListRoomComponent } from './room/list-room/list-room.component';
import { MenuRoomComponent } from './room/menu-room/menu-room.component';
import { EditRoomComponent } from './room/edit-room/edit-room.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BuildingComponent } from './building.component';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { BuildingShare } from './building-share.service';
import { EditBedComponent } from './bed/edit-bed/edit-bed.component';

@NgModule({
  declarations: [
    BuildingComponent,

    // Bed
    AddBedComponent,
    EditBedComponent,
    ListBedComponent,
    MenuBedComponent,
    AssetComponent,
    DetailGuestRentComponent,
    DetailReceiptsComponent,
    GuestRentComponent,
    InfoComponent,
    ReceiptsHistoryComponent,

    // Building
    AddBuildingComponent,
    DetailBuildingComponent,
    EditBuildingComponent,
    MenuBuildingComponent,

    // Floor
    AddFloorComponent,
    EditFloorComponent,
    ListFloorComponent,

    // Room
    AddRoomComponent,
    DetailRoomComponent,
    ListRoomComponent,
    MenuRoomComponent,
    EditRoomComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BuildingRoutingModule,
    NgxChartsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [BuildingShare],
})
export class BuildingModule {}
