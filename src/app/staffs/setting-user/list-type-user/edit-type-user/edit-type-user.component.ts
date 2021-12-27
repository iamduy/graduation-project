import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRole, LoadingService } from 'src/app/core';
import { RoleService } from 'src/app/core/services/specifics/role.service';
@Component({
  selector: 'app-edit-type-user',
  templateUrl: './edit-type-user.component.html',
  styleUrls: ['./edit-type-user.component.css'],
})
export class EditTypeUserComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formAdd: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { role: IRole },
    private roleService: RoleService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTypeUserComponent>
  ) {
    this.formAdd = this.fb.group({
      id: this.data?.role?.id,
      role_name: this.data?.role?.name,
      role_desc: this.data?.role?.desc,
    });
  }

  get f() {
    return this.formAdd.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.roleService.saveRole(this.formAdd.value).subscribe(
      (t) => {
        this.roleService.getAllRoles().subscribe(({ data }) => {
          this.dialogRef.close(data);
          this.toast.success('Cập nhật chức vụ thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật chức vụ thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
