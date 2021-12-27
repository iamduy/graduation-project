import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssetUnitService, IUnitAsset, LoadingService } from 'src/app/core';

@Component({
  selector: 'app-edit-unit-asset',
  templateUrl: './edit-unit-asset.component.html',
  styleUrls: ['./edit-unit-asset.component.css'],
})
export class EditUnitAssetComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formEdit: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { unitAsset: IUnitAsset },
    private unitAssetService: AssetUnitService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<EditUnitAssetComponent>
  ) {
    this.formEdit = this.fb.group({
      id: this.data?.unitAsset?.id ?? null,
      name: this.data?.unitAsset?.name ?? '',
    });
  }

  get f() {
    return this.formEdit.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.unitAssetService.save(this.formEdit.value).subscribe(
      (t) => {
        this.unitAssetService.getAll().subscribe(({ data }) => {
          this.dialog.close(data);
          this.toast.success(
            'Cập nhật đơn vị tài sản thành công',
            'Thông báo',
            {
              timeOut: 3000,
              closeButton: true,
            }
          );
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật đơn vị tài sản thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
