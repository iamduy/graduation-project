import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailGuestRentComponent } from '../detail-guest-rent/detail-guest-rent.component';
@Component({
  selector: 'app-guest-rent',
  templateUrl: './guest-rent.component.html',
  styleUrls: ['./guest-rent.component.css']
})
export class GuestRentComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    
    const dialogRef = this.dialog.open(DetailGuestRentComponent,{
      width: '600px',disableClose: false 
    });
  }
}
