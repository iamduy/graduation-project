import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root',
})
export class MaintainService extends CommonService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'maintain';
  }

  getAll(params: any = {}): Observable<any> {
    return this.apiService.get(`/${this.tableName}/index`, params);
  }

  create(params: any = {}): Observable<any> {
    return this.apiService.get(`/${this.tableName}/create`, params);
  }

  delete(id: any): Observable<any> {
    return this.apiService.delete(`/${this.tableName}/delete/${id}`);
  }

  save(data: any): Observable<any> {
    if (data.id) {
      return this.apiService.put(`/${this.tableName}/update/${data.id}`, data);
    } else {
      return this.apiService.post(`/${this.tableName}/store`, data);
    }
  }

  saveStatus(data: any): Observable<any> {
    return this.apiService.put(
      `/${this.tableName}/update/status/${data.id}`,
      data
    );
  }
}
