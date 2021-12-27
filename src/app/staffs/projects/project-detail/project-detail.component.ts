import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  BuildingService,
  IBuilding,
  IProject,
  IProjectService,
  IRoomType,
  ProjectService,
  ProjectServiceService,
  RoomTypeService,
} from 'src/app/core';
import { CalPrice } from 'src/app/utils';
import { BuildingCreateComponent } from '../building/building-create/building-create.component';
import { BuildingEditComponent } from '../building/building-edit/building-edit.component';
import { ProjectServiceAddComponent } from '../project-service/project-service-add/project-service-add.component';
import { ProjectServiceEditComponent } from '../project-service/project-service-edit/project-service-edit.component';
import { AddRoomTypeComponent } from '../type-room/add-room-type/add-room-type.component';
import { EditRoomTypeComponent } from '../type-room/edit-room-type/edit-room-type.component';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  isLoading: boolean = false;
  roomTypes: IRoomType[] = [];
  buildings: IBuilding[] = [];
  projectServices: IProjectService[] = [];
  displayedColumnsRoomType: string[] = [
    'id',
    'name',
    'price',
    'price_deposit',
    'number_bed',
    'symbol',
  ];
  displayedColumnsBuilding: string[] = [
    'id',
    'name',
    'floors',
    'project',
    'total_area',
    'action',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { project: IProject },
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProjectDetailComponent>,
    private roomTypeService: RoomTypeService,
    private projectServiceService: ProjectServiceService,
    private projectService: ProjectService,
    private buildingService: BuildingService,
    private toast: ToastrService
  ) {
    if (data.project?.buildings[0]?.id) {
      this.buildings = data.project?.buildings;
    }
  }

  ngOnInit() {
    this.getRoomType();
    this.getProjectService();
  }

  getRoomType() {
    this.roomTypeService
      .getAll({ project_id: this.data.project.id })
      .subscribe((t) => {
        if (t?.data[0]?.id) {
          this.roomTypes = t.data;
        }
      });
  }

  getProjectService() {
    this.projectServiceService
      .getAll({ project_id: this.data.project.id })
      .subscribe(({ data }) => {
        if (data[0]?.id) {
          this.projectServices = data;
        }
      });
  }

  removeRoomType(roomType: any) {
    if (confirm('Xác nhận xóa?')) {
      this.isLoading = true;
      this.roomTypeService.delete(roomType?.id).subscribe(
        (mes) => {
          this.isLoading = false;
          this.toast.success('', mes?.message, { timeOut: 4000 });
          this.getRoomType();
        },
        () => {
          this.isLoading = false;
          this.toast.error('Xóa loại phòng thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  editRoomtype(roomType: IRoomType) {
    const dialogRef = this.dialog.open(EditRoomTypeComponent, {
      width: '700px',
      disableClose: false,
      data: { roomType: roomType },
    });

    dialogRef.afterClosed().subscribe((roomTypes: IRoomType[] = []) => {
      if (roomTypes[0]?.id) {
        this.roomTypes = roomTypes;
      }
    });
  }

  addRoomType() {
    const dialogRef = this.dialog.open(AddRoomTypeComponent, {
      width: '700px',
      disableClose: false,
      data: { project_id: this.data.project.id },
    });
    dialogRef.afterClosed().subscribe((roomTypes: IRoomType[] = []) => {
      if (roomTypes[0]?.id) {
        this.roomTypes = roomTypes;
      }
    });
  }

  addProjectService() {
    const dialogRef = this.dialog.open(ProjectServiceAddComponent, {
      width: '700px',
      height:'600px',
      disableClose: false,
      data: {
        project_id: this.data.project.id,
        project_name: this.data.project.name,
      },
    });
    dialogRef.afterClosed().subscribe((mes) => {
      if (mes) this.getProjectService();
    });
  }

  editProjectService(projectService: any) {
    const dialogRef = this.dialog.open(ProjectServiceEditComponent, {
      width: '700px',
      disableClose: false,
      data: { projectService: projectService },
    });
    dialogRef.afterClosed().subscribe((mes) => {
      if (mes) this.getProjectService();
    });
  }

  removeProjectService(projectService: any) {
    if (window.confirm('Xác nhận xóa?')) {
      this.isLoading = true;
      this.projectServiceService.delete(projectService?.id).subscribe(
        () => {
          this.projectServiceService
            .getAll({ project_id: projectService.project_id })
            .subscribe((t) => {
              this.isLoading = false;
              this.projectServices = t.data;
              this.toast.success('Xóa dịch vụ thành công', 'Thông báo', {
                timeOut: 3000,
                closeButton: true,
              });
            });
        },
        () => {
          this.isLoading = false;
          this.toast.error('Xóa dịch vụ thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  /**
   * Building
   */
  editBuilding(building: IBuilding) {
    const dialogRef = this.dialog.open(BuildingEditComponent, {
      width: '700px',
      disableClose: false,
      data: { building: building },
    });

    dialogRef.afterClosed().subscribe((buildings: IBuilding[] = []) => {
      if (buildings[0]?.id) {
        this.buildings = buildings;
      }
    });
  }

  addBuilding() {
    const dialogRef = this.dialog.open(BuildingCreateComponent, {
      width: '700px',
      disableClose: false,
      data: { project_id: this.data.project.id },
    });
    dialogRef.afterClosed().subscribe((buildings: IBuilding[] = []) => {
      if (buildings[0]?.id) {
        this.buildings = buildings;
      }
    });
  }
  removeBuilding(building: any) {
    if (confirm('Xác nhận xóa?')) {
      this.isLoading = true;
      this.buildingService.delete(building?.id).subscribe(
        (mes) => {
          this.isLoading = false;
          this.toast.success('', mes?.message, { timeOut: 4000 });
          this.projectService.getById(building.project_id).subscribe((t) => {
            if (t.data?.buildings[0]?.id) {
              this.buildings = t.data?.buildings;
            }
          });
        },
        () => {
          this.isLoading = false;
          this.toast.error('Xóa loại phòng thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }
}
