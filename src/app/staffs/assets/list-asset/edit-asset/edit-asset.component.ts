import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssetService, IAssets, LoadingService } from 'src/app/core';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css'],
})
export class EditAssetComponent implements OnInit {
  prefixData: any = [];
  assetUpdateForm: FormGroup;
  asset: IAssets = {} as IAssets;

  submitted: boolean = false;
  submittedStatus: boolean = false;

  errors: any = [];
  statusErrors: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { prefixData: any; asset: IAssets },
    private assetService: AssetService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAssetComponent>,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.prefixData = this.data.prefixData;
    this.setForm(this.data.asset);
  }

  setForm(asset: IAssets) {
    this.asset = asset;
    this.assetUpdateForm = this.fb.group({
      id: asset.id,
      name: asset.name,
      price: asset.price,
      min_inventory: asset.min_inventory,
      description: asset.description,
      producer_id: asset?.producer_id,
      unit_asset_id: asset?.unit_asset_id,
      asset_type_id: asset?.asset_type_id,
    });
  }
  get f() {
    return this.assetUpdateForm.controls;
  }
  ngOnInit(): void {}

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    this.assetService.save(this.assetUpdateForm.value).subscribe(
      (t) => {
        this.toast.success('Cập nhật tài sản thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật tài sản thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
