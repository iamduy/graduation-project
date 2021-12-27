import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ContractService, IStudent } from 'src/app/core';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private api: ContractService) { }
  TABLE_SERVICE = []
  data: IContractInfo
  stat_day: string
  end_day: string
  isLoading: boolean = false
  ngOnInit() {
    this.isLoading = true
    this.api.gets(`/contracts/end-contract/edit/${this.id}`).subscribe(e => {
      this.data = e?.data
      this.isLoading = false
      this.TABLE_SERVICE = e?.data?.project_service
      this.stat_day = dayjs(e?.data?.created_at).format('DD-MM-YYYY')
      this.end_day = dayjs(e?.data?.deleted_at).format('DD-MM-YYYY')
    }, () => {
      this.isLoading = false
    })
  }

}

export interface IContractInfo {
  id: number
  stat_day: string
  end_day: string
  price: number
  deposit: number
  note: string
  deposit_state: string
  user: IStudent
  bed: {
    id: number
    name: string
  }
  bed_has_deleted: {
    id: number
    name: string
  }
  room: {
    id: number
    name: string
  }
  room_has_deleted: {
    id: number
    name: string
  }
}
