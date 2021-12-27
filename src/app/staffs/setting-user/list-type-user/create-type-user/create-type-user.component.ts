import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/core';
import { RoleService } from 'src/app/core/services/specifics/role.service';

@Component({
  selector: 'app-create-type-user',
  templateUrl: './create-type-user.component.html',
  styleUrls: ['./create-type-user.component.css'],
})
export class CreateTypeUserComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formAdd: FormGroup;

  constructor(
    private roleService: RoleService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTypeUserComponent>
  ) {
    this.formAdd = this.fb.group({
      role_name: '',
      role_desc: '',
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
          this.toast.success('Tạo chức vụ thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo chức vụ thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
