import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IProject, ProjectService } from 'src/app/core';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  formEdit: FormGroup;
  errors: any = [];
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { project: IProject },
    private dialogRef: MatDialogRef<ProjectEditComponent>,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.formEdit = this.fb.group({
      id: this.data.project?.id,
      name: this.data.project?.name,
      hotline: this.data.project?.hotline,
      address: this.data.project?.address,
      description: this.data.project?.description,
      cycle_collect: this.data.project?.cycle_collect,
      extension_time: 1,
    });
  }

  get f() {
    return this.formEdit.controls;
  }

  ngOnInit(): void { }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    this.projectService.save(this.formEdit.value).subscribe(
      (t) => {
        this.projectService.getAll().subscribe(({ data }) => {
          this.isLoading = false;
          this.dialogRef.close(data);
          this.toast.success('Cập nhật dự án thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.isLoading = false;
        this.toast.error('Cập nhật dự án thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
