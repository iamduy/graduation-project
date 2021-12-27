import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
    providedIn: 'root'
})
export class ContractService extends CommonService {

    constructor(apiService: ApiService, private http: HttpClient) {
        super(apiService);
        this.tableName = 'contracts';
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

    Paginate(req: any): Observable<any> {
        return this.http.get(req)
    }
}
