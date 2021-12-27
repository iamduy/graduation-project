import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  AuthGuardService,
  JwtService,
  StaffGuardService,
  StudentGuardService,
  UnAuthGuardService,
  AuthService,
  PermissionGuard,
} from './services';

import { HttpJwtTokenInterceptor } from './helpers';
import { UserService } from './services/user.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    HttpJwtTokenInterceptor,
    JwtService,
    ApiService,
    AuthService,
    UserService,
    AuthGuardService,
    UnAuthGuardService,
    StudentGuardService,
    StaffGuardService,
    PermissionGuard,
  ],
})
export class CoreModule {}
