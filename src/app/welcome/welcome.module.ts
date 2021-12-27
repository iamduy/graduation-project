import { UnAuthGuardService } from '../core'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { WelcomeRoutingModule } from './welcome-routing.module'
import { LoginComponent } from './login/login.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    WelcomeRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [UnAuthGuardService]
})
export class WelcomeModule { }
