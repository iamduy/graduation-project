import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
    providedIn: 'root'
})
export class FloorService extends CommonService {

    constructor(apiService: ApiService) {
        super(apiService);
        this.tableName = 'floors';
    }
}
