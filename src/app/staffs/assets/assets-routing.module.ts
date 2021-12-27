import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/core';
import { Routers } from 'src/app/utils';
import { AssetsComponent } from './assets.component';
import { AssetComponent } from './list-asset/asset/asset.component';
import { ProducerComponent } from './list-producer/producer/producer.component';
import { TypeAssetComponent } from './list-type/type-asset/type-asset.component';
import { UnitAssetComponent } from './list-unit/unit-asset/unit-asset.component';
const routes: Routes = [
  {
    path: '',
    component: AssetsComponent,
    children: [
      {
        path: 'tai-san',
        component: AssetComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'asset-list',
          breadcrumb: [
            {
              label: Routers.ASSETS.ASSET.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'nha-san-xuat',
        component: ProducerComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'producer-list',
          breadcrumb: [
            {
              label: Routers.ASSETS.PRODUCER.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'loai-tai-san',
        component: TypeAssetComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'type-asset-list',
          breadcrumb: [
            {
              label: Routers.ASSETS.TYPE_ASSET.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'don-vi',
        component: UnitAssetComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'unit-list',
          breadcrumb: [
            {
              label: Routers.ASSETS.UNIT_ASSET.NAME,
              url: '',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class AssetsRoutingModule {}
