import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRoom } from 'src/app/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  room: IRoom;
  quantityEmptyBed: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { room: any },
    private dialogRef: MatDialogRef<InfoComponent>
  ) {
    this.room = this.data.room;
  }

  ngOnInit(): void {
    this.data?.room?.beds.forEach((bed: any) => {
      if (bed?.contract !== null) {
        this.quantityEmptyBed += 1;
      }
    });
  }
}
