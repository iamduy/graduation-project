import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailAssetComponent } from '../detail-asset/detail-asset.component';
import { EditAssetComponent } from '../edit-asset/edit-asset.component';
import { CreateAssetComponent } from '../create-asset/create-asset.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssetService, IAssets, LoadingService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css'],
})
export class AssetComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'min_inventory',
    'unit_asset',
    'type_asset',
    'action',
  ];

  formSearch: FormGroup;
  prefixData: any = {};
  assets: IAssets[];
  lastPage: number = null;
  totalItems: number = 0;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private assetService: AssetService,
    private loadingService: LoadingService,
    private toast: ToastrService
  ) {
    this.formSearch = this.fb.group({
      keyword: '',
      producer_id: '',
      unit_asset_id: '',
      asset_type_id: '',
      page: '',
    });
  }
  get fs() {
    return this.formSearch.controls;
  }

  getAssets(searchData: any = null) {
    if (searchData) {
      for (let key in searchData) {
        if (!searchData[key]) {
          delete searchData[key];
        }
      }
    }

    this.loadingService.setLoading(true);
    this.assetService.getAll(searchData).subscribe((t) => {
      this.assets = t.data.data;
      this.lastPage = t.data.last_page;
      this.totalItems = t.data.total;
      this.formSearch.patchValue({ page: t.data.current_page });
      this.loadingService.setLoading(false);
    });
  }
  searchAsset() {
    let searchData = this.formSearch.value;
    delete searchData.page;
    this.getAssets(searchData);
  }
  changePage(currentPage: number) {
    if (this.formSearch.value.page !== currentPage) {
      this.formSearch.patchValue({ page: currentPage });
      this.getAssets(this.formSearch.value);
    }
  }
  removeAsset(asset: IAssets) {
    if (window.confirm('Xác nhận xóa?')) {
      this.loadingService.setLoading(true);
      this.assetService.delete(asset?.id).subscribe(
        (t) => {
          this.getAssets(this.formSearch.value);
          this.toast.success('Xóa tài sản thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa tài sản thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  ngOnInit(): void {
    this.assetService.create().subscribe((t) => {
      this.prefixData = t.data;
    });

    this.getAssets();
  }

  openDialogDetail(asset: IAssets): void {
    const dialogRef = this.dialog.open(DetailAssetComponent, {
      width: '700px',
      disableClose: false,
      data: { asset: asset },
    });
  }
  openDialogEdit(asset: IAssets): void {
    const dialogRef = this.dialog.open(EditAssetComponent, {
      width: '700px',
      disableClose: false,
      data: { prefixData: this.prefixData, asset: asset },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getAssets(this.formSearch.value);
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateAssetComponent, {
      width: '700px',
      disableClose: false,
      data: { prefixData: this.prefixData },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getAssets(this.formSearch.value);
      }
    });
  }
}
