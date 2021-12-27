import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuildingService, IProject, ProjectService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BuildingShare } from '../../building-share.service';
import { Routers } from 'src/app/utils';
@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css'],
})
export class AddBuildingComponent implements OnInit {
  submitted = false;
  isLoading = false;
  buildingAddForm: FormGroup;
  listProject: IProject[] = [{}] as IProject[];
  errors: any;

  constructor(
    private buildingService: BuildingService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    public toast: ToastrService,
    private router: Router,
    private buildingShare: BuildingShare
  ) {
    this.buildingAddForm = this.fb.group({
      name: [null],
      total_area: [null],
      project_id: [null],
      note: [null],
    });
  }

  ngOnInit(): void {
    this.projectService.getAll().subscribe((r) => {
      this.listProject = r.data;
      this.buildingAddForm
        .get('project_id')
        .patchValue(this.listProject[0]?.id);
    });
  }

  get F() {
    return this.buildingAddForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    this.buildingService.save(this.buildingAddForm.value).subscribe(
      (t) => {
        this.toast.success('Thêm tòa nhà thành công', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
        this.buildingService.getAll().subscribe((t) => {
          this.buildingShare.setBuildings(t.data);
        });
        this.router.navigateByUrl(
          Routers.BUILDING.DETAIL.URL + '/' + t.data.id
        );
      },
      (f) => {
        this.isLoading = false;
        this.errors = f.errors;
        this.toast.error('Thêm tòa nhà thất bại', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      }
    );
  }
}
