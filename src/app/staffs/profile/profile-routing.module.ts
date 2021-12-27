import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Routers } from 'src/app/utils'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ProfileComponent } from './profile.component'
import { UpdateProfileComponent } from './update-profile/update-profile.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent, pathMatch: 'full',
    data: {
      breadcrumb: [
        {
          label: Routers.PROFILE.STAFF.NAME,
          url: Routers.PROFILE.STAFF.URL
        }
      ]
    }
  },
  {
    path: 'doi-mat-khau',
    component: ChangePasswordComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.PROFILE.STAFF.NAME,
          url: Routers.PROFILE.STAFF.URL
        },
        {
          label: Routers.PROFILE.STAFF.CHILD[0].NAME,
          url: ''
        }
      ]
    }
  },
  {
    path: 'cap-nhat',
    component: UpdateProfileComponent,
    data: {
      breadcrumb: [
        {
          label: Routers.PROFILE.STAFF.NAME,
          url: Routers.PROFILE.STAFF.URL
        },
        {
          label: Routers.PROFILE.STAFF.CHILD[1].NAME,
          url: ''
        }
      ]
    }
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class ProfileRoutingModule { }
