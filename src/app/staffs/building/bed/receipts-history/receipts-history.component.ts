import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailReceiptsComponent } from '../detail-receipts/detail-receipts.component';
export interface PeriodicElement {
  name: string;
  content: number;
  date: number;
  id_student: string;
  money: number;
  payby: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { content: 1, name: 'Hydrogen', date: 30.12, payby: 'abc', id_student: '123', money: 100000 },
  { content: 2, name: 'Helium', date: 30.12, payby: 'abc', id_student: '1234', money: 100000 },
  { content: 3, name: 'Lithium', date: 30.12, payby: 'abc', id_student: '1235', money: 100000 },
  { content: 4, name: 'Beryllium', date: 30.12, payby: 'abc', id_student: '1236', money: 100000 },

];
@Component({
  selector: 'app-receipts-history',
  templateUrl: './receipts-history.component.html',
  styleUrls: ['./receipts-history.component.css']
})
export class ReceiptsHistoryComponent implements OnInit {
  displayedColumns: string[] = ['content', 'name', 'date', 'payby', 'id_student', 'money'];
  dataSource = ELEMENT_DATA;
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DetailReceiptsComponent, {
      width: '640px', disableClose: false
    });
  }
}
