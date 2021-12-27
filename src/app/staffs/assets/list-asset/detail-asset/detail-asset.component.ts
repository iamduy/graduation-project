import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAssets } from 'src/app/core';

@Component({
  selector: 'app-detail-asset',
  templateUrl: './detail-asset.component.html',
  styleUrls: ['./detail-asset.component.css'],
})
export class DetailAssetComponent implements OnInit {
  asset: IAssets = this.data.asset;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { asset: IAssets }
  ) { }

  ngOnInit() { }
}
