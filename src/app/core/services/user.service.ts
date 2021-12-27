import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './commons';
import { Routers } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public Router = Routers

  constructor(private apiService: ApiService) { }

  changePassword(v: any): Observable<any> {
    return this.apiService.post('/auth/change-pass', v);
  }
}
