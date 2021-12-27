import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/core';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  formAdd: FormGroup;
  errors: any = [];
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ProjectCreateComponent>,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.formAdd = this.fb.group({
      name: '',
      hotline: null,
      address: '',
      description: '',
      cycle_collect: null,
      extension_time: 1,
    });
  }

  get f() {
    return this.formAdd.controls;
  }

  ngOnInit(): void { }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    this.projectService.save(this.formAdd.value).subscribe(
      (t) => {
        this.projectService.getAll().subscribe(({ data }) => {
          this.isLoading = false;
          this.dialogRef.close(data);
          this.toast.success('Tạo mới dự án thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.isLoading = false;
        this.toast.error('Tạo mới dự án thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
