import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
    providedIn: 'root'
})
export class ChartbarService extends CommonService {

    constructor(apiService: ApiService) {
        super(apiService);
        this.tableName = 'dashboards';
    }
    getAll(params: any = {}) {
        return this.apiService.get(`/${this.tableName}/month-user`, params);
      }
}