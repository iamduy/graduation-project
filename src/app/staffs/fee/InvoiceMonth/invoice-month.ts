import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { InvoiceService } from 'src/app/core'
import { CalPrice } from 'src/app/utils'
@Component({
  selector: 'app-invoice-month',
  templateUrl: './invoice-month.html',
  styleUrls: ['./invoice-month.css']
})
export class InvoiceMonth implements OnInit {

  isLoading: boolean
  roomInfo: any
  notice: string
  noticeStatus: number
  tableService: any
  totalMoney: number


  formPayment: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idInvoiceMonth: number,
    private api: InvoiceService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private matRef: MatDialogRef<InvoiceMonth>
  ) {
    this.formPayment = this.fb.group({
      payment_type: 'Tiền mặt'
    })
  }


  onUpdateInvoice() {
    this.isLoading = true
    if (this.noticeStatus === 0) {
      this.isLoading = false
      this.toast.warning('Bạn cần chốt điện nước trước khi lưu hoá đơn', 'Lưu ý', { timeOut: 4000, closeButton: true })
    }
    else {
      this.api.posts(`/invoices/store/invoice/month/${this.idInvoiceMonth}`, this.formPayment.value).subscribe(mes => {
        this.isLoading = false
        this.toast.success('', mes?.message, { timeOut: 4000 })
        this.matRef.close(mes?.message)
      }, (err) => {
        this.isLoading = false
        this.toast.error('', err?.message, { timeOut: 4000 })
      })
    }

  }

  getInvoice() {
    this.isLoading = true
    this.api.gets(`/invoices/create/invoice/month/${this.idInvoiceMonth}`).subscribe((res) => {
      this.isLoading = false
      const { project_service_info, room_info, service_index_info } = res
      this.tableService = project_service_info?.map(item => {
        return {
          ...item,
          unit_price: CalPrice(item?.unit_price),
          total_money: CalPrice(item?.total_money)
        }
      })
      this.notice = service_index_info[0]
      this.noticeStatus = service_index_info[1]
      this.roomInfo = room_info
      this.totalMoney = CalPrice(project_service_info.reduce((total, item) => total += item.total_money, 0))

    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getInvoice()
  }
}
