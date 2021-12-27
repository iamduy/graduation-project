import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfo implements OnInit, OnDestroy {

  userInfo: IUser
  data: IUser[]
  isLoading: boolean = true
  searchForm: FormGroup

  lastPage: any
  totalItems: number = 0
  page: number
  paginate: FormGroup
  constructor(
    private matRef: MatDialogRef<UserInfo>,
    private api: ApiService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
    this.searchForm = this.fb.group({ name: '' })
  }


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

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo(_value: any = null) {
    this.isLoading = true
    this.api.post('/contracts/search-student', _value).subscribe(value => {
      const { data, meta } = value
      this.data = data
      this.lastPage = meta?.last_page
      this.totalItems = meta?.total
      this.paginate.patchValue({ page: meta?.current_page })
      this.isLoading = false
    }, (error) => {
      this.toast.error('', error?.message, { timeOut: 4000 })
      this.isLoading = false
    })
  }



  ngOnDestroy() {
    this.matRef.close(this.userInfo)
  }
  exportUser(info) {
    this.userInfo = info
  }
}

export interface IUser {
  address: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  phone: string;
  status: string;
}

