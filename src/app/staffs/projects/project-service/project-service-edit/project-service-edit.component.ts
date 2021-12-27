import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { IProjectService, ProjectServiceService } from 'src/app/core'

@Component({
  selector: 'app-project-service-edit',
  templateUrl: './project-service-edit.component.html',
  styleUrls: ['./project-service-edit.component.css'],
})
export class ProjectServiceEditComponent implements OnInit {
  formEdit: FormGroup
  errors: any = []
  submitted: boolean = false
  isLoading: boolean = false
  units: IUnits

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { projectService: IProjectService },
    private dialogRef: MatDialogRef<ProjectServiceEditComponent>,
    private api: ProjectServiceService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.formEdit = this.fb.group({
      id: this.data.projectService.id,
      name: [this.data.projectService.name, Validators.required],
      unit_price: [this.data.projectService.unit_price, Validators.required],
      unit: this.data.projectService.unit,
      permanent: this.data.projectService.permanent,
      project_id: this.data.projectService.project_id,
    })
  }

  get f() {
    return this.formEdit.controls
  }

  ngOnInit() {
    this.getUnits()
  }

  getUnits() {
    this.isLoading = true
    this.api.gets('/project-service/create', false).subscribe(e => {
      this.isLoading = false
      this.units = e?.data
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.formEdit.valid) {
      this.isLoading = true
      this.api.puts('/project-service/update', [this.formEdit.value]).subscribe(
        (mes) => {
          this.isLoading = false
          this.dialogRef.close(mes?.message)
          this.toast.success('', 'Cập nhật dịch vụ thành công', {
            timeOut: 4000,
          })
        }, (err) => {
          this.isLoading = false
          this.toast.error('', 'Cập nhật thất bại', { timeOut: 4000 })
        })
    }

  }
}

export interface IUnits {
  electric: {
    unit: string;
    name: string;
  },
  water: {
    unit: string;
    name: string;
  }
  other: {
    unit: string;
  }
}