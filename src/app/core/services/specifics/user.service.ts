import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CommonService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'users';
  }
  getData(): Observable<any> {
    return this.apiService.get('/user/StudentSearch');
  }
  getStaffs(params: any = {}): Observable<any> {
    return this.apiService.get('/user/getUserStaff', params);
  }
  gets(url, params): Observable<any> {
    return this.apiService.get(url, params);
  }
  puts(url, params): Observable<any> {
    return this.apiService.put(url, params);
  }

  regisStaff(data: any): Observable<any> {
    return this.apiService.post('/auth/staff/register', data);
  }
  activeUser(data: any): Observable<any> {
    return this.apiService.put(`/user/userActive/${data?.id}`, data);
  }

  updateStaff(data: any) {
    return this.apiService.put(`/user/staff/update/${data?.id}`, data);
  }
}
