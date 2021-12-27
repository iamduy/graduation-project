import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends CommonService {

  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'invoices';
  }
  posts(uri: string, params: any = {}): Observable<any> {
    return this.apiService.post(uri, params)
  }
  gets(uri: string, params: any = {}): Observable<any> {
    return this.apiService.get(uri, params)
  }
  puts(uri: string, params: any = {}): Observable<any> {
    return this.apiService.put(uri, params)
  }

}
