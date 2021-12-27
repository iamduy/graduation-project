import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IMaintenance, LoadingService, MaintainService } from 'src/app/core';
import { CreateMaintenanceComponent } from '../create-maintenance/create-maintenance.component';

@Component({
  selector: 'app-edit-maintenance',
  templateUrl: './edit-maintenance.component.html',
  styleUrls: ['./edit-maintenance.component.css'],
})
export class EditMaintenanceComponent implements OnInit {
  prefixData: any = [];
  mainTainCreateForm: FormGroup;
  formStatus: FormGroup;
  maintain: IMaintenance = {} as IMaintenance;

  submitted: boolean = false;
  submittedStatus: boolean = false;

  errors: any = [];
  statusErrors: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { prefixData: any; maintain: IMaintenance },
    private maintainService: MaintainService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateMaintenanceComponent>,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.prefixData = this.data.prefixData;
    this.setForm(this.data.maintain);
  }

  setForm(maintain: IMaintenance) {
    this.maintain = maintain;
    this.mainTainCreateForm = this.fb.group({
      id: maintain.id,
      name: maintain.name,
      note: maintain.note,
      user_undertake_id: maintain.user_undertake_id,
    });
    this.formStatus = this.fb.group({
      id: maintain.id,
      status: maintain.status,
    });
  }
  get f() {
    return this.mainTainCreateForm.controls;
  }

  get FormStatus() {
    return this.formStatus.controls;
  }
  ngOnInit(): void {}

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    this.maintainService.save(this.mainTainCreateForm.value).subscribe(
      (t) => {
        this.toast.success(
          'Cập nhật nhiệm vụ bảo trì thành công',
          'Thông báo',
          {
            timeOut: 3000,
            closeButton: true,
          }
        );
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật vụ bảo trì thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }

  onUpdateStatus() {
    this.loadingService.setLoading(true);
    this.submittedStatus = true;
    this.maintainService.saveStatus(this.formStatus.value).subscribe(
      (t) => {
        this.setForm(t.data);
        this.toast.success('Cập nhật trạng thái thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.statusErrors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật trạng thái thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
