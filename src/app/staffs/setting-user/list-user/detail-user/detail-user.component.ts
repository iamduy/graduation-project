import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRole, IUser } from 'src/app/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { roles: IRole[]; staff: IUser }
  ) {}

  ngOnInit(): void {}
}
