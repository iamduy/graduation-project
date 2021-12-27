import { Component, Input, OnInit } from '@angular/core';
import {
  IBuilding,
  IFloor,
  IRoomType,
  LoadingService,
  RoomTypeService,
} from 'src/app/core';

@Component({
  selector: 'app-menu-building',
  templateUrl: './menu-building.component.html',
  styleUrls: ['./menu-building.component.css'],
})
export class MenuBuildingComponent implements OnInit {
  building: IBuilding = {} as IBuilding;
  buildings: IBuilding[] = [];
  floors: IFloor[] = [];
  roomTypes: IRoomType[] = [];

  @Input('buildingInput') set setBuilding(value: IBuilding) {
    this.building = value;
    if (this.building?.id) {
      this.roomTypeService
        .getAll({ project_id: value.project_id })
        .subscribe((t) => {
          this.roomTypes = t.data;
        });
    }
  }

  setFloors(event: any) {
    this.loadingService.setLoading(true);
    this.floors = event;
  }

  constructor(
    private roomTypeService: RoomTypeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}
}
