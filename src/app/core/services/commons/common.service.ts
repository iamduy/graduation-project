import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    tableName: string = '';

    constructor(protected apiService: ApiService) { }

    getAll(params: any = {}): Observable<any> {
        return this.apiService.get(`/${this.tableName}`, params);
    }

    getById(id: any): Observable<any> {
        return this.apiService.get(`/${this.tableName}/${id}`);
    }

    delete(id: any): Observable<any> {
        return this.apiService.delete(`/${this.tableName}/${id}`);
    }

    save(data: any): Observable<any> {
        if (data.id) {
            return this.apiService.put(`/${this.tableName}/${data.id}`, data);
        } else {
            return this.apiService.post(`/${this.tableName}`, data);
        }
    }

}
