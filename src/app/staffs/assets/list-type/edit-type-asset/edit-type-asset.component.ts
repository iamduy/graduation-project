import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  AssetTypeService,
  AssetUnitService,
  IAssetsType,
  IUnitAsset,
  LoadingService,
} from 'src/app/core';

@Component({
  selector: 'app-edit-type-asset',
  templateUrl: './edit-type-asset.component.html',
  styleUrls: ['./edit-type-asset.component.css'],
})
export class EditTypeAssetComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formEdit: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { typeAsset: IAssetsType },
    private typeAssetService: AssetTypeService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<EditTypeAssetComponent>
  ) {
    this.formEdit = this.fb.group({
      id: this.data?.typeAsset?.id ?? null,
      name: this.data?.typeAsset?.name ?? '',
    });
  }

  get f() {
    return this.formEdit.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.typeAssetService.save(this.formEdit.value).subscribe(
      (t) => {
        this.typeAssetService.getAll().subscribe(({ data }) => {
          this.dialog.close(data);
          this.toast.success('Cập nhật loại tài sản thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật loại tài sản thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
