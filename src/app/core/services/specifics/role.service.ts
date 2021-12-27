import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends CommonService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'role';
  }

  // Phân quyền cho chức vụ
  getAllPositions(): Observable<any> {
    return this.apiService.get(`/${this.tableName}/get_permissions_all`);
  }

  getPositionsByRole(id: any): Observable<any> {
    return this.apiService.get(`/${this.tableName}/get_role_by_id/${id}`);
  }
  getDetailById(id: any): Observable<any> {
    return this.apiService.get(`/${this.tableName}/detail_role_by_id/${id}`);
  }

  getAllRoles(): Observable<any> {
    return this.apiService.get(`/${this.tableName}/show`);
  }

  saveRole(data: any): Observable<any> {
    if (data.id) {
      return this.apiService.put(`/${this.tableName}/update/${data.id}`, data);
    } else {
      return this.apiService.post(`/${this.tableName}/store`, data);
    }
  }

  deleteRole(id: any): Observable<any> {
    return this.apiService.delete(`/${this.tableName}/delete/${id}`);
  }

  savePerOfRole(data: any): Observable<any> {
    return this.apiService.put(
      `/${this.tableName}/update_Permission_To_Role`,
      data
    );
  }
}
