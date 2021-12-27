import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
    providedIn: 'root'
})
export class RoomService extends CommonService {

    constructor(apiService: ApiService, private http: HttpClient) {
        super(apiService);
        this.tableName = 'rooms';
    }

    Paginate(req: any): Observable<any> {
        return this.http.get(req)
    }
}
