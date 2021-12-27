import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { BuildingComponent } from './building.component';
import { AddBuildingComponent } from './building/add-building/add-building.component';
import { MenuBuildingComponent } from './building/menu-building/menu-building.component';
import { MenuRoomComponent } from './room/menu-room/menu-room.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.BUILDING.NAME,
          url: Routers.BUILDING.URL,
        },
      ],
    },
    // children: [
    //   {
    //     path: 'them-moi',
    //     component: AddBuildingComponent,
    //     data: {
    //       breadcrumb: [
    //         {
    //           label: Routers.BUILDING.NAME,
    //           url: Routers.BUILDING.URL,
    //         },
    //         {
    //           label: Routers.BUILDING.ADD_BUILDING.NAME,
    //           url: '',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     path: 'thong-tin-toa-nha/:id',
    //     component: MenuBuildingComponent,
    //     data: {
    //       breadcrumb: [
    //         {
    //           label: Routers.BUILDING.NAME,
    //           url: Routers.BUILDING.URL,
    //         },
    //         {
    //           label: Routers.BUILDING.DETAIL.NAME,
    //           url: '',
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     path: 'tang/:id',
    //     component: MenuRoomComponent,
    //     data: {
    //       breadcrumb: [
    //         {
    //           label: Routers.BUILDING.NAME,
    //           url: Routers.BUILDING.URL,
    //         },
    //         {
    //           label: Routers.BUILDING.FLOOR.NAME,
    //           url: '',
    //         },
    //       ],
    //     },
    //   },
    // ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class BuildingRoutingModule {}
