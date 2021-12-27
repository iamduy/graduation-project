import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BedService, IBed } from 'src/app/core';
import { BuildingShare } from '../../building-share.service';
import { AddBedComponent } from '../add-bed/add-bed.component';

@Component({
  selector: 'app-list-bed',
  templateUrl: './list-bed.component.html',
  styleUrls: ['./list-bed.component.css']
})
export class ListBedComponent implements OnInit {
  beds: IBed[];

  constructor(
    public dialog: MatDialog,
    private bedService: BedService,
    private buildingShare: BuildingShare,
  ) { }

  ngOnInit(): void {
    this.buildingShare.beds.subscribe(beds => {
      this.beds = beds;
    })


  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddBedComponent, {
      width: '840px', disableClose: false
    });
  }



}
