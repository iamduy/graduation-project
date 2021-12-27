import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root',
})
export class ProjectServiceService extends CommonService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'project-service';
  }

  getAll(params: any = {}) {
    return this.apiService.get(`/${this.tableName}/index`, params);
  }

  posts(url, body): Observable<any> {
    return this.apiService.post(url, body)
  }
  puts(url, body): Observable<any> {
    return this.apiService.put(url, body)
  }
  gets(url, body): Observable<any> {
    return this.apiService.get(url, body)
  }

  save(data: any): Observable<any> {
    if (data.id) {
      return this.apiService.put(`/${this.tableName}/edit/${data.id}`, data);
    } else {
      return this.apiService.post(`/${this.tableName}/store`, data);
    }
  }

  delete(id: any): Observable<any> {
    return this.apiService.delete(`/${this.tableName}/delete/${id}`);
  }
}
