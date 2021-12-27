import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, CommonService } from '../commons';

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService extends CommonService {

  constructor(apiService: ApiService) {
    super(apiService);
    this.tableName = 'type_assets';
  }
}
