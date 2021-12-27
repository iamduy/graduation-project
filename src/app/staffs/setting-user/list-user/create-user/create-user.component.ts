import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRole, LoadingService, UserService } from 'src/app/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  roles: IRole[] = [];
  staffCreateForm: FormGroup;
  submitted: boolean = false;
  errors: any = [];

  passW = true
  confirmNewPassw = true

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { roles: IRole[] },
    private userService: UserService,

    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>
  ) {
    this.roles = data.roles;
    this.staffCreateForm = this.fb.group({
      first_name: '',
      last_name: '',
      birth: '',
      birth_place: '',
      gender: 1,
      address: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: data?.roles[0]?.id,
    });
  }

  get f() {
    return this.staffCreateForm.controls;
  }

  handleShowPassword() {
    this.passW = !this.passW
  }
  handleShowConfirmPassword() {
    this.confirmNewPassw = !this.confirmNewPassw
  }

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    let data = this.staffCreateForm.value;
    if (data.birth) {
      data.birth = formatDate(
        this.staffCreateForm.value.birth,
        'yyyy-MM-dd',
        'en-US'
      );
    }
    this.userService.regisStaff(data).subscribe(
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
