import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFloorComponent } from '../add-floor/add-floor.component';
import { EditFloorComponent } from '../edit-floor/edit-floor.component';
import {
  BuildingService,
  IFloor,
  FloorService,
  IBuilding,
  LoadingService,
} from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { BuildingShare } from '../../building-share.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.css'],
})
export class ListFloorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'total_area', 'symbol'];
  floors: IFloor[] = [];
  building: IBuilding = {} as IBuilding;

  @Output() eventPushOut = new EventEmitter<IFloor[]>();

  pushOutFloor(floors: IFloor[]) {
    this.eventPushOut.emit(floors);
  }

  @Input('inputBuilding') set setFloors(value: IBuilding) {
    this.building = value;
    setTimeout(() => {
      this.loadingService.setLoading(true);
      this.getFloors('reload');
    }, 1);
  }
  constructor(
    public dialog: MatDialog,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private buildingShare: BuildingShare,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFloorComponent, {
      width: '640px',
      data: { building: this.building },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((check: string) => this.getFloors(check));
  }

  openDialogEdit(floor: any): void {
    const dialogRef = this.dialog.open(EditFloorComponent, {
      width: '640px',
      data: { floor: floor },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((check: string) => this.getFloors(check));
  }

  getFloors(check: string = '') {
    if (check == 'reload') {
      this.floorService
        .getAll({
          building_id: this.building.id,
        })
        .subscribe(
          (t) => {
            this.floors = t.data;
            this.pushOutFloor(t.data);
            this.loadingService.setLoading(false);
          },
          (f) => {
            this.loadingService.setLoading(false);
          }
        );
    }
  }

  ngOnInit(): void {}

  deleteFloor(floor: any) {
    if (confirm('Xác nhận xóa?')) {
      this.loadingService.setLoading(true);
      this.floorService
        .delete(floor.id)
        .pipe(tap((t) => this.getFloors('reload')))
        .subscribe(
          (t) => {
            this.toast.success('Xóa tầng thành công', 'Thông báo', {
              timeOut: 4000,
            });
          },
          (f) => {
            this.loadingService.setLoading(false);
            this.toast.error('Xóa tầng không thành công', 'Thông báo', {
              timeOut: 4000,
            });
          }
        );
    }
  }
}
