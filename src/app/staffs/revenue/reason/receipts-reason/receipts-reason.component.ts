import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { IReceiptReason, ReceiptReasonService } from 'src/app/core'
import { CreateReasonComponent } from '../create-reason/create-reason.component'
import { UpdateReasonComponent } from '../update-reason/update-reason.component'

@Component({
  selector: 'app-receipts-reason',
  templateUrl: './receipts-reason.component.html',
  styleUrls: ['./receipts-reason.component.css']
})
export class ReceiptsReasonComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private api: ReceiptReasonService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
  }

  isLoading: boolean
  data: IReceiptReason[]

  lastPage: number
  totalItems: number
  page: number
  paginate: FormGroup

  get paging() {
    return this.paginate.controls
  }


  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage });
      this.getReceiptReason(this.paginate.value);
    }
  }

  getReceiptReason(value: any = null) {
    this.isLoading = true
    this.api.gets('/receipt_reasons/index', value).subscribe(e => {
      const { data, last_page, current_page, total } = e?.data
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
  ngOnInit() {
    this.getReceiptReason()
  }


  updateReceiptReason(id: number) {
    let dialogRef = this.dialog.open(UpdateReasonComponent, { width: '600px', data: id })
    dialogRef.afterClosed().subscribe(mes => {
      if (mes) this.getReceiptReason()
    })
  }
  createReceiptReason() {
    let dialogRef = this.dialog.open(CreateReasonComponent, { width: '600px' })
    dialogRef.afterClosed().subscribe(mes => {
      if (mes) this.getReceiptReason()
    })
  }
  removeReceiptReason(id: number) {
    const Confirm = confirm('Xác nhận xoá ?')
    if (Confirm) {
      this.api.delete(`delete/${id}`).subscribe((e) => {
        this.toast.success('', e?.message, { timeOut: 4000 })
        this.getReceiptReason()
      }, (error) => {
        this.toast.error('', error?.message, { timeOut: 4000 })
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
}


