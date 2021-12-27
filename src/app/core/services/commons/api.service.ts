import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, shareReplay, share, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  calls = new Subject();
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(environment.API_URL + path, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    this.calls.next(true);
    return this.http
      .put(environment.API_URL + path, body)
      .pipe(takeUntil(this.calls), catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, headers: any = {}): Observable<any> {
    this.calls.next(true);
    return this.http
      .post(environment.API_URL + path, body, headers)
      .pipe(
        takeUntil(this.calls),
        shareReplay(1),
        catchError(this.formatErrors)
      );
  }

  delete(path: string): Observable<any> {
    this.calls.next(true);
    return this.http
      .delete(environment.API_URL + path)
      .pipe(takeUntil(this.calls), catchError(this.formatErrors));
  }
}
