import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssetService, LoadingService } from 'src/app/core';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css'],
})
export class CreateAssetComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  assetCreateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { prefixData: any },
    private assetService: AssetService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAssetComponent>
  ) {
    this.assetCreateForm = this.fb.group({
      name: '',
      price: 0,
      min_inventory: 0,
      description: '',
      producer_id: data.prefixData?.producer[0]?.id,
      unit_asset_id: data.prefixData?.unit_asset[0]?.id,
      asset_type_id: data.prefixData?.asset_type[0]?.id,
    });
  }

  get f() {
    return this.assetCreateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.assetService.save(this.assetCreateForm.value).subscribe(
      (t) => {
        this.toast.success('Tạo tài sản thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo tài sản thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }

  ngOnInit(): void {}
}
