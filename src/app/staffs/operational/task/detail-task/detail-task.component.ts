import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/core';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css'],
})
export class DetailTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: ITask }
  ) {}
  ngOnInit(): void {}
}
