import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Routers } from 'src/app/utils'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { ProfileComponent } from './profile.component'


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    pathMatch: 'full',
    data: {
      breadcrumb: [
        {
          label: Routers.PROFILE.STUDENT.NAME,
          url: Routers.PROFILE.STUDENT.URL
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
          label: Routers.PROFILE.STUDENT.NAME,
          url: Routers.PROFILE.STUDENT.URL
        },
        {
          label: Routers.PROFILE.STUDENT.CHILD[0].NAME,
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
