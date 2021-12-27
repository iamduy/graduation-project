import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPermission, IRole } from 'src/app/core';
import { RoleService } from 'src/app/core/services/specifics/role.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { permissions: any[] }) {}

  ngOnInit(): void {}
}
