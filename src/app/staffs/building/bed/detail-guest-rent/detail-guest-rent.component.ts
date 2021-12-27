import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBed } from 'src/app/core';
import { BuildingShare } from '../../building-share.service';
@Component({
  selector: 'app-detail-guest-rent',
  templateUrl: './detail-guest-rent.component.html',
  styleUrls: ['./detail-guest-rent.component.css'],
})
export class DetailGuestRentComponent implements OnInit, OnDestroy {
  sub: Subscription;
  public bed: IBed;
  constructor(private buildingShare: BuildingShare) {}

  ngOnInit(): void {
    this.sub = this.buildingShare.bed.subscribe((data) => {
      if (data?.id) {
        this.bed = data;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
