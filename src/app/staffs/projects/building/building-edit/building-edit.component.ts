import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuildingService, IBuilding } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css'],
})
export class BuildingEditComponent implements OnInit {
  submitted = false;
  isLoading = false;
  errors: any = [];
  buildingEditForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { building: IBuilding },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BuildingEditComponent>,
    private toastService: ToastrService,
    private buildingService: BuildingService
  ) {
    this.buildingEditForm = this.fb.group({
      id: data.building.id,
      name: data.building.name,
      total_area: data.building.total_area,
      note: data.building.note,
      project_id: data.building.project_id,
    });
  }

  ngOnInit(): void {}

  get F() {
    return this.buildingEditForm.controls;
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    this.buildingService.save(this.buildingEditForm.value).subscribe(
      (t) => {
        this.buildingService
          .getAll({ project_id: this.data.building.project_id })
          .subscribe((t) => {
            this.dialogRef.close(t.data);
            this.isLoading = false;
          });
        this.toastService.success('Cập nhật tòa nhà thành công', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      },
      (f) => {
        this.isLoading = false;
        this.errors = f.errors;
        this.toastService.error(
          'Cập nhật tòa nhà không thành công',
          'Thông báo',
          {
            timeOut: 4000,
            closeButton: true,
          }
        );
      }
    );
  }
}
