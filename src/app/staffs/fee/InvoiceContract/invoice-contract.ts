import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { InvoiceService } from 'src/app/core'
import { CalPrice } from 'src/app/utils'

@Component({
  selector: 'app-invoice-contract',
  templateUrl: './invoice-contract.html',
  styleUrls: ['./invoice-contract.css']
})
export class InvoiceContract implements OnInit {

  isLoading: boolean
  roomInfo: any
  roomFeeInfo: any
  studentInfo: any
  tableService: any
  totalMoney: number


  formPayment: FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idInvoiceContract: number,
    private api: InvoiceService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private matRef: MatDialogRef<InvoiceContract>
  ) {
    this.formPayment = this.fb.group({
      payment_type: 'Tiền mặt',
      total_money: 0
    })
  }


  onUpdateInvoice() {
    this.isLoading = true
    this.api.posts(`/invoices/store/invoice/contract/${this.idInvoiceContract}`, this.formPayment.value).subscribe(mes => {
      this.isLoading = false
      this.toast.success('', mes?.message, { timeOut: 4000 })
      this.matRef.close(mes?.message)
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  getInvoice() {
    this.isLoading = true
    this.api.gets(`/invoices/create/invoice/contract/${this.idInvoiceContract}`).subscribe((res) => {
      this.isLoading = false
      const { project_service_info, room_info, room_fee_info, student_info } = res
      this.tableService = project_service_info?.map(item => {
        return {
          ...item,
          unit_price: CalPrice(item?.unit_price),
          total_money: CalPrice(item?.total_money),
          date_collect: dayjs(item?.date_collect).format('DD-MM-YYYY')
        }
      })
      this.roomInfo = room_info
      this.studentInfo = student_info
      this.roomFeeInfo = {
        ...room_fee_info,
        date_collect: dayjs(room_fee_info?.date_collect).format('DD-MM-YYYY'),
        unit_price: CalPrice(room_fee_info?.unit_price),
        total_money: CalPrice(room_fee_info?.total_money)
      }

      if (project_service_info != null) this.totalMoney = CalPrice(project_service_info.reduce((total, item) => total += item.total_money, 0) + room_fee_info?.total_money)



    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getInvoice()
  }

}
