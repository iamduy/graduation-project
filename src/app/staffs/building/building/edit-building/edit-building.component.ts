import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  IBuilding,
  BuildingService,
  IProject,
  ProjectService,
} from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { BuildingShare } from '../../building-share.service';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css'],
})
export class EditBuildingComponent implements OnInit {
  isLoading = false;
  submitted = false;
  errors: any;
  projects: IProject[];
  buildingUpdateForm: FormGroup;
  building: IBuilding;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private buildingService: BuildingService,
    private projectService: ProjectService,
    private toast: ToastrService,
    private buildingShare: BuildingShare
  ) {
    this.buildingUpdateForm = this.fb.group({
      id: '',
      name: '',
      total_area: '',
      project_id: '',
      note: '',
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }

  setData(): void {
    this.buildingUpdateForm.setValue({
      id: this.building.id ?? null,
      name: this.building.name ?? null,
      total_area: this.building.total_area ?? null,
      note: this.building.note ?? null,
      project_id: this.building.project_id ?? null,
    });
  }
  get F() {
    return this.buildingUpdateForm.controls;
  }

  ngOnInit(): void {
    this.projectService.getAll().subscribe((r) => (this.projects = r.data));
    this.buildingShare.building.subscribe((data) => (this.building = data));
    this.setData();
  }

  onSubmit(): void {
    this.isLoading = true;
    this.submitted = true;
    this.buildingService.save(this.buildingUpdateForm.value).subscribe(
      (t) => {
        // this.buildingShare.setBuilding(t.data)
        // this.buildingService.getAll().subscribe((t) => {
        //   this.buildingShare.setBuildings(t.data)
        // })
        this.projectService
          .getById(this.buildingUpdateForm.value.id)
          .subscribe((t) => {
            if (t?.data?.id) {
              this.buildingShare.setBuildings(t.data.buildings);
            }
          });
        this.isLoading = false;
        this.toast.success('Cập nhật thành công 1', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
        this.closeDialog();
      },
      (f) => {
        this.isLoading = false;
        this.errors = f.errors;
        this.toast.error('Cập nhật thất bại', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      }
    );
  }
}
