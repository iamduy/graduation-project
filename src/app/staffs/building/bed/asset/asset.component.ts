import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  type_asset: string;
  volume: number;
  stt:number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { stt: 1, name: 'Hydrogen', volume: 30, type_asset:'abc'},
  { stt: 2, name: 'Helium',   volume: 30, type_asset:'abc' },
  { stt: 3, name: 'Lithium',  volume: 30, type_asset:'abc' },
  { stt: 4, name: 'Beryllium',volume: 30, type_asset:'abc' },

];
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  displayedColumns: string[] = ['stt', 'name', 'volume', 'type_asset'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
