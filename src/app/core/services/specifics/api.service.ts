import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root'
})
export class API extends CommonService {

  constructor(apiService: ApiService) {
    super(apiService)
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
  delete(params: any = {}): Observable<any> {
    return this.apiService.delete(params)
  }
}

