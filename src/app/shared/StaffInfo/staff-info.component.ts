import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.css']
})
export class StaffInfo implements OnInit, OnDestroy {

  constructor(
    private matRef: MatDialogRef<StaffInfo>,
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
    this.searchForm = this.fb.group({ name: '' })
  }
  userInfo: IUser
  data: IUser[]
  isLoading: boolean = true
  searchForm: FormGroup

  lastPage: any
  totalItems: number = 0
  page: number
  paginate: FormGroup

  get paging() {
    return this.paginate.controls
  }

  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: currentPage }
      this.getUserInfo(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }

  onSubmit() {
    this.getUserInfo(this.searchForm.value)
    this.RefParams = this.searchForm.value
  }
  exportUser(info) {
    this.userInfo = info
  }


  getUserInfo(_value: any = null) {
    this.isLoading = true
    this.api.gets('/user/getUserStaff', _value).subscribe(value => {
      const { data, current_page, last_page, total } = value?.data?.user
      this.data = data?.map(item => {
        return {
          ...item,
          gender: item?.gender === 0 ? 'Nữ' : 'Nam'
        }
      })
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.patchValue({ page: current_page })
      this.isLoading = false
    }, (error) => {
      this.toast.error('', error?.message, { timeOut: 4000 })
      this.isLoading = false
    })
  }

  ngOnInit() {
    this.getUserInfo()
  }

  ngOnDestroy() {
    this.matRef.close(this.userInfo)
  }

}

export interface IUser {
  address: string
  email: string
  first_name: string
  gender: string
  id: number
  last_name: string
  phone: string
  status: string
}

