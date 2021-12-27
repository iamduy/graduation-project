import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '..';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let result: boolean = false;
    const module = route.data?.module ?? '';
    const table = route.data?.table ?? '';
    const permission = route.data?.permission ?? '';

    this.authService.currentUser.subscribe((data) => {
      let modules = data.permission_data.module ?? [];
      let permissions = data.permission_data.permissions ?? [];
      let tables = data.permission_data.tables ?? [];
      if (module) {
        result = modules.find((item: string) => item.trim() == module.trim())
          ? true
          : false;
      } else if (table) {
        result = tables.find((item: string) => item.trim() == table.trim())
          ? true
          : false;
      } else if (permission) {
        result = permissions.find(
          (item: string) => item.trim() == permission.trim()
        )
          ? true
          : false;
      }
    });

    return result;
  }
}
