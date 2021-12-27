import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
    providedIn: 'root'
})
export class ChartService extends CommonService {

    constructor(apiService: ApiService) {
        super(apiService);
        this.tableName = 'dashboards';
    }
    getAll(params: any = {}) {
        return this.apiService.get(`/${this.tableName}/list-bed`, params);
      }
}