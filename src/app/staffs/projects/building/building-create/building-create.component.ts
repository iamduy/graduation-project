import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuildingService, ProjectService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css'],
})
export class BuildingCreateComponent implements OnInit {
  submitted = false;
  isLoading = false;
  errors: any = [];
  buildingAddForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { project_id: any },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BuildingCreateComponent>,
    private toastService: ToastrService,
    private buildingService: BuildingService
  ) {
    this.buildingAddForm = this.fb.group({
      name: '',
      total_area: 0,
      note: '',
      project_id: data.project_id,
    });
  }

  ngOnInit(): void {}

  get F() {
    return this.buildingAddForm.controls;
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    this.buildingService.save(this.buildingAddForm.value).subscribe(
      (t) => {
        this.buildingService
          .getAll({ project_id: this.data.project_id })
          .subscribe((t) => {
            this.dialogRef.close(t.data);
            this.isLoading = false;
          });
        this.toastService.success('Thêm tòa nhà thành công', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      },
      (f) => {
        this.isLoading = false;
        this.errors = f.errors;
        this.toastService.error('Thêm tòa nhà không thành công', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      }
    );
  }
}
