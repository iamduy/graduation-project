import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTypeAssetComponent } from '../edit-type-asset/edit-type-asset.component';
import { CreateTypeAssetComponent } from '../create-type-asset/create-type-asset.component';
import { AssetTypeService, LoadingService, IAssetsType } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-asset',
  templateUrl: './type-asset.component.html',
  styleUrls: ['./type-asset.component.css'],
})
export class TypeAssetComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  typeAssets: IAssetsType[] = [];

  constructor(
    public dialog: MatDialog,
    private typeAssetService: AssetTypeService,
    private loadingService: LoadingService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.typeAssetService.getAll().subscribe((t) => {
      this.typeAssets = t.data;
      this.loadingService.setLoading(false);
    });
  }
  openDialogEdit(typeAsset: IAssetsType): void {
    const dialogRef = this.dialog.open(EditTypeAssetComponent, {
      width: '500px',
      disableClose: false,
      data: { typeAsset: typeAsset },
    });
    dialogRef.afterClosed().subscribe((typeAssets: IAssetsType[] = []) => {
      if (typeAssets[0]?.id) {
        this.typeAssets = typeAssets;
      }
      this.loadingService.setLoading(false);
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateTypeAssetComponent, {
      width: '500px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((typeAssets: IAssetsType[] = []) => {
      if (typeAssets[0]?.id) {
        this.typeAssets = typeAssets;
      }
      this.loadingService.setLoading(false);
    });
  }

  removeTypeAsset(typeAsset: IAssetsType) {
    if (window.confirm('Xác nhận xóa')) {
      this.loadingService.setLoading(true);
      this.typeAssetService.delete(typeAsset?.id).subscribe(
        (t) => {
          this.typeAssetService.getAll().subscribe((t) => {
            this.typeAssets = t.data;
            this.loadingService.setLoading(false);
            this.toast.success('Xóa loại tài sản thành công', 'Thông báo', {
              timeOut: 3000,
              closeButton: true,
            });
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa loại tài sản thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }
}
