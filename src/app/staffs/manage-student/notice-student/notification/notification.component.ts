import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';
import { Constant } from 'src/app/utils';
import { CreateNoticeComponent } from '../settings/create-notice/create-notice.component';
import { EditNoticeComponent } from '../settings/edit-notice/edit-notice.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  data: any
  isLoading: boolean
  levelNotice = Constant.Notice

  searchForm: FormGroup
  paginate: FormGroup
  lastPage: number
  totalItems: number
  constructor(
    public dialog: MatDialog,
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      type_announce_id: '',
      level: '',
      title: ''
    })
    this.paginate = this.fb.group({ page: '' })
  }


  get paging() {
    return this.paginate.controls
  }

  RefParams: any

  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: currentPage }
      this.getData(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }

  onSearch() {
    const { type_announce_id, level, title } = this.searchForm.value
    let params = {}
    if (type_announce_id) params = { ...params, type_announce_id: type_announce_id }
    if (level) params = { ...params, level: level }
    if (title) params = { ...params, title: title }
    this.getData(params)
    this.RefParams = params
  }


  createNotice() {
    let dialogRef = this.dialog.open(CreateNoticeComponent, { width: '800px' })
    dialogRef.afterClosed().subscribe(res => res && this.getData())
  }

  updateNotice(id: number) {
    let dialogRef = this.dialog.open(EditNoticeComponent, { width: '800px', data: id })
    dialogRef.afterClosed().subscribe(res => res && this.getData())
  }

  removeNotice(id) {
    const Confirm = confirm('Xác nhận xoá ?')
    if (Confirm) {
      this.api.delete(`/announcements/${id}`).subscribe(res => {
        this.toast.success('', res?.message, { timeOut: 4000 })
        this.getData()
      }, (err) => {
        this.toast.error('', err?.message, { timeOut: 4000 })
      })
    }

  }



  expand = {
    id: null,
    status: false
  }
  expandText(id) {
    this.expand.id = id
    if (id) this.expand.status = !this.expand.status
  }


  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/announcements', value).subscribe(ele => {
      this.isLoading = false
      const { data, meta } = ele
      this.lastPage = meta?.last_page
      this.totalItems = meta?.total
      this.paginate.setValue({ page: meta?.current_page })
      this.data = data?.map(item => {
        return {
          ...item,
          level: item?.level === 0 && 'Cảnh báo' || item?.level === 1 && 'Nghiêm trọng' || item?.level === 2 && 'Bình thường',
          date_start: dayjs(item?.date_start).format('DD-MM-YYYY'),
          date_end: dayjs(item?.date_end).format('DD-MM-YYYY')
        }
      })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }


  typeAnnounce: any
  getTypeAnnounce() {
    this.api.gets('/type_announces').subscribe(ele => {
      this.typeAnnounce = ele?.data?.map(item => {
        return { label: item?.name, value: item?.id }
      })
    })
  }
  ngOnInit() {
    this.getData()
    this.getTypeAnnounce()
  }
}

export interface INotice {
  id: number
  title: string
  level: number
  type_announce_id: number
  content: string
}
