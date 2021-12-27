import { NgModule } from '@angular/core'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component'
import { MatButtonModule } from '@angular/material/button'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { SharedModule } from 'src/app/shared/shared.module'


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    ProfileRoutingModule,
    MatButtonModule,
    SharedModule
  ],
})
export class ProfileModule { }
