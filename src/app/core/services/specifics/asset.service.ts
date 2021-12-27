import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root',
})
export class AssetService extends CommonService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'assets';
  }

  create() {
    return this.apiService.get(`/prefix_data_asset`);
  }
}
