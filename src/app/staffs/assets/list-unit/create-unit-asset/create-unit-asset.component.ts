import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssetUnitService, IUnitAsset, LoadingService } from 'src/app/core';

@Component({
  selector: 'app-create-unit-asset',
  templateUrl: './create-unit-asset.component.html',
  styleUrls: ['./create-unit-asset.component.css'],
})
export class CreateUnitAssetComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formAdd: FormGroup;

  constructor(
    private unitAssetService: AssetUnitService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<CreateUnitAssetComponent>
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
    this.unitAssetService.save(this.formAdd.value).subscribe(
      (t) => {
        this.unitAssetService.getAll().subscribe(({ data }) => {
          this.dialog.close(data);
          this.toast.success('Tạo mới đơn vị tài sản thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo mới đơn vị tài sản thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
