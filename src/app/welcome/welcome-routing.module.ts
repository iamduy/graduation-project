import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UnAuthGuardService } from '../core'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { WelcomeComponent } from './welcome.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dang-nhap' },
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: 'dang-ky',
        component: RegisterComponent,
        canActivate: [UnAuthGuardService],
      },
      {
        path: 'dang-nhap',
        component: LoginComponent,
        canActivate: [UnAuthGuardService],
      },
      {
        path: 'quen-mat-khau',
        component: ForgotPasswordComponent,
        canActivate: [UnAuthGuardService],
      },
      {
        path: 'dat-lai-mat-khau',
        component: ResetPasswordComponent,
        canActivate: [UnAuthGuardService]
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule { }
