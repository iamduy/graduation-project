import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService extends CommonService {

  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'receipts';
  }

  gets(url, params: any = {}): Observable<any> {
    return this.apiService.get(url, params)
  }
  posts(url, params): Observable<any> {
    return this.apiService.post(url, params)
  }
  puts(url, params): Observable<any> {
    return this.apiService.put(url, params)
  }
}
