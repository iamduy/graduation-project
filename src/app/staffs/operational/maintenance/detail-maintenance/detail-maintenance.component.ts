import { Component, Inject, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMaintenance } from 'src/app/core';
@Component({
  selector: 'app-detail-maintenance',
  templateUrl: './detail-maintenance.component.html',
  styleUrls: ['./detail-maintenance.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class DetailMaintenanceComponent implements OnInit {
  status = false;
  maintain: IMaintenance = {} as IMaintenance;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { maintain: IMaintenance }
  ) { }

  ngOnInit() { }
}
