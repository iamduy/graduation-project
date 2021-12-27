import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReceiptReasonService } from 'src/app/core';
@Component({
  selector: 'app-printing-contract',
  templateUrl: './receipt-reason-info.component.html',
  styleUrls: ['./receipt-reason-info.component.css']
})
export class ReceiptReasonInfo implements OnInit, OnDestroy {

  constructor(
    private matRef: MatDialogRef<ReceiptReasonInfo>,
    private api: ReceiptReasonService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
  }
  receiptReasonInfo: any
  data: any
  isLoading: boolean = true

  lastPage: any
  totalItems: number = 0
  page: number
  paginate: FormGroup

  get paging() {
    return this.paginate.controls
  }

  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage });
      this.getReceiptReasonInfo(this.paginate.value);
    }
  }


  ngOnInit() {
    this.getReceiptReasonInfo()
  }

  getReceiptReasonInfo(_value: any = null) {
    this.isLoading = true
    this.api.gets('/receipt_reasons/index', _value).subscribe(value => {
      const { data, current_page, last_page, total } = value?.data
      this.data = data
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.patchValue({ page: current_page })
      this.isLoading = false
    }, (error) => {
      this.toast.error('', error?.message, { timeOut: 4000 })
      this.isLoading = false
    })
  }

  ngOnDestroy() {
    this.matRef.close(this.receiptReasonInfo)
  }
  exportInfo(info) {
    this.receiptReasonInfo = info
  }

  expand = {
    id: null,
    status: false
  }
  expandText(id) {
    this.expand.id = id
    if (id) this.expand.status = !this.expand.status
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

