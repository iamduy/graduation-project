import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssetTypeService, LoadingService } from 'src/app/core';

@Component({
  selector: 'app-create-type-asset',
  templateUrl: './create-type-asset.component.html',
  styleUrls: ['./create-type-asset.component.css'],
})
export class CreateTypeAssetComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formAdd: FormGroup;

  constructor(
    private typeAssetService: AssetTypeService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<CreateTypeAssetComponent>
  ) {
    this.formAdd = this.fb.group({
      name: '',
    });
  }

  get f() {
    return this.formAdd.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.typeAssetService.save(this.formAdd.value).subscribe(
      (t) => {
        this.typeAssetService.getAll().subscribe(({ data }) => {
          this.dialog.close(data);
          this.toast.success('Tạo mới loại tài sản thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo mới loại tài sản thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
