import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUnitAssetComponent } from '../edit-unit-asset/edit-unit-asset.component';
import { CreateUnitAssetComponent } from '../create-unit-asset/create-unit-asset.component';
import { AssetUnitService, IUnitAsset, LoadingService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unit-asset',
  templateUrl: './unit-asset.component.html',
  styleUrls: ['./unit-asset.component.css'],
})
export class UnitAssetComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  unitAssets: IUnitAsset[] = [];

  constructor(
    public dialog: MatDialog,
    private unitAssetService: AssetUnitService,
    private loadingService: LoadingService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.unitAssetService.getAll().subscribe((t) => {
      this.unitAssets = t.data;
      this.loadingService.setLoading(false);
    });
  }
  openDialogEdit(unitAsset: IUnitAsset): void {
    const dialogRef = this.dialog.open(EditUnitAssetComponent, {
      width: '500px',
      disableClose: false,
      data: { unitAsset: unitAsset },
    });
    dialogRef.afterClosed().subscribe((unitAssets: IUnitAsset[] = []) => {
      if (unitAssets[0]?.id) {
        this.unitAssets = unitAssets;
      }
      this.loadingService.setLoading(false);
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateUnitAssetComponent, {
      width: '500px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((unitAssets: IUnitAsset[] = []) => {
      if (unitAssets[0]?.id) {
        this.unitAssets = unitAssets;
      }
      this.loadingService.setLoading(false);
    });
  }

  removeUnitAsset(unitAsset: IUnitAsset) {
    if (window.confirm('Xác nhận xóa')) {
      this.loadingService.setLoading(true);
      this.unitAssetService.delete(unitAsset?.id).subscribe(
        (t) => {
          this.unitAssetService.getAll().subscribe((t) => {
            this.unitAssets = t.data;
            this.loadingService.setLoading(false);
            this.toast.success('Xóa đơn vị tài sản thành công', 'Thông báo', {
              timeOut: 3000,
              closeButton: true,
            });
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa đơn vị tài sản thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }
}
