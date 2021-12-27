import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService, MaintainService } from 'src/app/core';
@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html',
  styleUrls: ['./create-maintenance.component.css'],
})
export class CreateMaintenanceComponent implements OnInit {
  prefixData: any = [];
  mainTainCreateForm: FormGroup;
  submitted: boolean = false;
  errors: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { prefixData: any },
    private maintainService: MaintainService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateMaintenanceComponent>,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.prefixData = this.data.prefixData;
    this.mainTainCreateForm = this.fb.group({
      name: '',
      type: this.data?.prefixData?.type[1],
      note: '',
      user_undertake_id: this.data?.prefixData?.users[0]?.id,
      date_start: '',
      date_end: '',
      periodic: this.data?.prefixData?.periodic[0],
    });
  }
  get f() {
    return this.mainTainCreateForm.controls;
  }
  ngOnInit(): void {}

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    let data = this.mainTainCreateForm.value;
    if (this.mainTainCreateForm.value.type !== 'KHDK') {
      delete data.periodic;
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    if (data.date_start) {
      data.date_start = formatDate(
        this.mainTainCreateForm.value.date_start,
        format,
        locale
      );
    }
    if (data.date_end) {
      data.date_end = formatDate(
        this.mainTainCreateForm.value.date_end,
        format,
        locale
      );
    }
    this.maintainService.save(data).subscribe(
      (t) => {
        this.toast.success('Tạo nhiệm vụ bảo trì thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo nhiệm vụ bảo trì thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
