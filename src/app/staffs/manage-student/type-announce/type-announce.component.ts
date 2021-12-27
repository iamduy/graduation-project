import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';
import { CreateAnnounceComponent } from './create-announce/create-announce.component';
import { UpdateAnnounceComponent } from './update-announce/update-announce.component';

@Component({
  selector: 'app-type-announce',
  templateUrl: './type-announce.component.html',
  styleUrls: ['./type-announce.component.css']
})
export class TypeAnnounceComponent implements OnInit {

  isLoading: boolean
  data: ITypeAnnounce[]
  constructor(
    private api: API,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }



  getData() {
    this.isLoading = true
    this.api.gets('/type_announces').subscribe(ele => {
      this.isLoading = false
      this.data = ele?.data?.map(item => {
        return {
          ...item,
          created_at: dayjs(item?.created_at).format('DD-MM-YYYY'),
          updated_at: dayjs(item?.updated_at).format('DD-MM-YYYY')
        }
      })
    })
  }

  CreateAnnounce() {
    let dialogRef = this.dialog.open(CreateAnnounceComponent, { width: '400px' })
    dialogRef.afterClosed().subscribe(response => response && this.getData())
  }

  UpdateAnnounce(id: number) {
    let dialogRef = this.dialog.open(UpdateAnnounceComponent, { width: '400px', data: id })
    dialogRef.afterClosed().subscribe(response => response && this.getData())
  }

  RemoveAnnounce(id: number) {
    const Confirm = confirm('Xác nhận xoá ?')
    if (Confirm) {
      this.api.delete(`/type_announces/${id}`).subscribe(res => {
        this.toast.success('', res?.message, { timeOut: 4000 })
        this.getData()
      }, (err) => {
        this.toast.error('', err?.message, { timeOut: 4000 })
        this.isLoading = false
      })
    }

  }

  ngOnInit() {
    this.getData()
  }

}


export interface ITypeAnnounce {
  id: number,
  name: number,
  created_at: string,
  updated_at: string
}
