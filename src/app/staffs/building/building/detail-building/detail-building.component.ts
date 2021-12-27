import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditBuildingComponent } from '../edit-building/edit-building.component';
import { IBuilding } from 'src/app/core';
import { BuildingShare } from '../../building-share.service';

@Component({
  selector: 'app-detail-building',
  templateUrl: './detail-building.component.html',
  styleUrls: ['./detail-building.component.css']
})
export class DetailBuildingComponent implements OnInit {
  building: IBuilding;
  isLoading = false;
  constructor(
    public dialog: MatDialog,
    private buildingShare: BuildingShare,
  ) { }

  ngOnInit(): void {
    this.buildingShare.building.subscribe(data => {
      this.building = data;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditBuildingComponent, {
      width: '840px'
    });
  }
}
