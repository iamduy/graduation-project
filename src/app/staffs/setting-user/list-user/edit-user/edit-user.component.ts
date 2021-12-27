import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRole, IUser, LoadingService, UserService } from 'src/app/core';
import * as dayjs from 'dayjs'
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  roles: IRole[] = [];
  staffEditForm: FormGroup;
  submitted: boolean = false;
  errors: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { roles: IRole[]; staff: IUser },
    private userService: UserService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>
  ) {
    this.roles = data.roles;
    this.staffEditForm = this.fb.group({
      id: data.staff?.id,
      first_name: data.staff?.first_name,
      last_name: data.staff?.last_name,
      // birth: new Date(data.staff?.birth),
      birth: dayjs(data.staff?.birth).format('YYYY-MM-DD'),
      birth_place: data.staff?.birth_place,
      gender: data.staff?.gender,
      address: data.staff?.address,
      phone: data.staff?.phone,
      role_id: data.staff?.role_id,
      status: data.staff?.status,
    });
  }

  get f() {
    return this.staffEditForm.controls;
  }

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    let data = this.staffEditForm.value;
    if (data.birth) {
      data.birth = formatDate(
        this.staffEditForm.value.birth,
        'yyyy-MM-dd',
        'en-US'
      );
    }
    this.userService.updateStaff(data).subscribe(
      (t) => {
        this.toast.success('Tạo tài khoản nhân viên thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo tài khoản nhân viên thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }

  ngOnInit(): void { }
}
