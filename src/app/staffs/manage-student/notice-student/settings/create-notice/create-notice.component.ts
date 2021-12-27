import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
import { UserInfo } from 'src/app/shared/UserInfo/user-info.component'
import { Constant } from 'src/app/utils'
@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css'],
})
export class CreateNoticeComponent implements OnInit {

  isLoading: boolean

  userInfo: any
  searchForm: FormGroup
  levelNotice = Constant.Notice

  errMess: any
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toast: ToastrService,
    private matRef: MatDialogRef<CreateNoticeComponent>,
    private api: API
  ) {
    this.searchForm = this.fb.group({
      title: '',
      level: Constant.Notice[0].value,
      content: '',
      type_announce_id: '',
      user_id: '',
      date_start: '',
      date_end: '',
      range: 'chuc nag them',
    })

  }

  onSubmit() {
    this.api.posts(`/announcements`, this.searchForm.value).subscribe(res => {
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

  typeAnnounce: any
  getTypeAnnounce() {
    this.isLoading = true
    this.api.gets('/type_announces').subscribe(ele => {
      this.isLoading = false
      this.typeAnnounce = ele?.data?.map(item => {
        return { label: item?.name, value: item?.id }
      })
      this.searchForm.setValue({
        ...this.searchForm.value,
        type_announce_id: this.typeAnnounce[0].value
      })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getTypeAnnounce()
  }

}
