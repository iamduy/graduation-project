import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { ProjectService, ReceiptReasonService } from 'src/app/core'
import { UserInfo } from 'src/app/shared/UserInfo/user-info.component'
import { ReceiptReasonInfo } from './ReceiptReasonInfo/receipt-reason-info.component'

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private api: ReceiptReasonService,
    private toast: ToastrService
  ) {
    this.formReceipt = this.fb.group({
      collection_date: '',
      user_id: '',
      amount_of_money: '',
      payment_type: 'Chuyển khoản',
      note: '',
      receipt_reason_id: ''
    })
  }
  userInfo: any
  receiptReasonInfo: any
  formReceipt: FormGroup
  errorMess: any
  isLoading: boolean

  onSubmit() {
    this.isLoading = true
    this.api.posts('/receipt/store', this.formReceipt.value).subscribe(success => {
      this.toast.success('', success?.message, { timeOut: 4000 })
      this.formReceipt.reset()
      this.isLoading = false
    }, (error) => {
      this.errorMess = error?.errors
      this.isLoading = false
    })
  }

  setUser(id) {
    this.formReceipt.setValue({
      ...this.formReceipt.value,
      user_id: id
    })
  }
  setReceiptReason(id) {
    this.formReceipt.setValue({
      ...this.formReceipt.value,
      receipt_reason_id: id
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

  getReceiptReasonById() {
    let dialogRef = this.dialog.open(ReceiptReasonInfo, { height: '100vh', disableClose: true })
    dialogRef.afterClosed().subscribe(e => {
      if (e?.id == undefined) return
      this.receiptReasonInfo = {
        label: e?.title,
        value: e?.id
      }
      this.setReceiptReason(e?.id)
    })
  }


  ngOnInit() { }
}
