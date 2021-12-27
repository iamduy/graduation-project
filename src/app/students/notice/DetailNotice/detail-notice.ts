import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/core';

@Component({
  selector: 'app-detail-notice',
  templateUrl: './detail-notice.html',
  styleUrls: ['./detail-notice.css']
})
export class DetailNotice implements OnInit {

  isLoading: boolean
  data: INoticeDetail
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public id: number,
    private api: StudentService,
    private toast: ToastrService
  ) {

  }


  expand = {
    status: false
  }
  expandText() {
    this.expand.status = !this.expand.status
  }

  getData() {
    this.isLoading = true
    this.api.getNotifyById(this.id).subscribe(res => {
      this.isLoading = false
      const { data } = res
      this.data = {
        student: [data?.user?.last_name, data?.user?.first_name].join(' '),
        content: data?.content,
        start_day: dayjs(data?.date_start).format('DD-MM-YYYY'),
        end_day: dayjs(data?.end_day).format('DD-MM-YYYY'),
        level: data?.level === 0 && 'Cảnh báo' || data?.level === 1 && 'Nghiêm trọng' || data?.level === 2 && 'Bình thường',
        title: data?.title,
        type_announce: data?.typeAnnounce?.name
      }
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getData()
  }

}

export interface INoticeDetail {
  student: string
  content: string
  start_day: string
  end_day: string
  level: string
  title: string
  type_announce: string
}