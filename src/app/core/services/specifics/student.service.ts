import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends CommonService {
  constructor(apiService: ApiService, private http: HttpClient) {
    super(apiService)
    this.tableName = 'student'
  }
  // Auth
  getContract(): Observable<any> {
    return this.apiService.get(`/${this.tableName}/contract`);
  }
  getInvoice(param: any = {}): Observable<any> {
    return this.apiService.get(`/${this.tableName}/invoice`, param);
  }
  getInvoiceById(id: any): Observable<any> {
    return this.apiService.get(`/${this.tableName}/invoice/${id}`);
  }
  getNotify(params: any = {}): Observable<any> {
    return this.apiService.get(`/${this.tableName}/notify`, params);
  }
  getNotifyById(id: any): Observable<any> {
    return this.apiService.get(`/${this.tableName}/notify/${id}`);
  }
}
