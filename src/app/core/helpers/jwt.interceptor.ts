import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': '',

    };

    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const req = request.clone({ setHeaders: headersConfig });
    return next.handle(req);
  }
}
export const HttpJwtTokenInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];
