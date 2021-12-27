import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
import { UserInfo } from 'src/app/shared/UserInfo/user-info.component'
import { Constant } from 'src/app/utils'
@Component({
  selector: 'app-edit-notice',
  templateUrl: './edit-notice.component.html',
  styleUrls: ['./edit-notice.component.css'],
})
export class EditNoticeComponent implements OnInit {

  isLoading: boolean
  userInfo: any
  searchForm: FormGroup
  levelNotice = Constant.Notice

  errMess: any
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idNotice: number,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toast: ToastrService,
    private matRef: MatDialogRef<EditNoticeComponent>,
    private api: API
  ) {
    this.searchForm = this.fb.group({
      title: '',
      level: '',
      content: '',
      type_announce_id: '',
      user_id: '',
      date_start: '',
      date_end: '',
      range: '',
    })

  }

  onSubmit() {
    this.api.puts(`/announcements/${this.idNotice}`, this.searchForm.value).subscribe(res => {
      this.toast.success('', res?.message, { timeOut: 4000 })
      this.matRef.close(res)
    }, (err) => {
      this.toast.error('', 'Kiểm tra lại các trường đã nhập', { timeOut: 4000 })
      this.errMess = err?.errors
    })
  }

  setUser(id) {
    this.searchForm.setValue({
      ...this.searchForm.value,
      user_id: id
    })
  }
  getUserById() {
    let dialogRef = this.dialog.open(UserInfo, { height: '100vh', disableClose: true })
    dialogRef.afterClosed().subscribe(e => {
      if (e?.id == undefined) return
      this.userInfo = {
        id: e?.id,
        name: `${e?.last_name} ${e?.first_name}`
      }
      this.setUser(e?.id)
    })
  }


  data: any
  getData() {
    this.isLoading = true
    this.api.gets(`/announcements/${this.idNotice}`).subscribe(res => {
      this.data = res?.data
      this.isLoading = false
      this.setData(res?.data)
      this.userInfo = {
        id: res?.data?.user?.id,
        name: [res?.data?.user?.last_name, res?.data?.user?.first_name].join(' ')
      }
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  setData(value) {
    this.searchForm.setValue({
      title: value?.title ?? '',
      level: value?.level ?? '',
      content: value?.content ?? '',
      type_announce_id: value?.type_announce_id ?? '',
      user_id: value?.user_id ?? '',
      date_start: dayjs(value?.date_start).format('YYYY-MM-DD') ?? '',
      date_end: dayjs(value?.date_end).format('YYYY-MM-DD') ?? '',
      range: 'chuc nang them'
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
