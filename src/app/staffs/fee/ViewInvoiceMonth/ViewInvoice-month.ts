import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { InvoiceService } from 'src/app/core'
import { CalPrice } from 'src/app/utils'
@Component({
  selector: 'app-ViewInvoiceMonth',
  templateUrl: './ViewInvoice-month.html',
  styleUrls: ['./ViewInvoice-month.css']
})
export class ViewInvoiceMonth implements OnInit {

  isLoading: boolean
  Invoice: any
  InvoiceDetail: any
  ProjectService: any
  totalMoney: any
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idInvoiceContract,
    private api: InvoiceService,
    private toast: ToastrService
  ) { }

  handlePayment(id) {
    this.api.puts(`/invoices/update/invoice/status/${id}`).subscribe((res) => {
      this.toast.success('', res?.message, { timeOut: 4000 })
      this.getData()
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.isLoading = true
    this.api.gets(`/invoices/show/invoice/month/${this.idInvoiceContract}`).subscribe(res => {
      const { invoice, invoice_detail } = res?.data
      this.Invoice = {
        ...invoice,
        created_at: dayjs(invoice?.created_at).format('DD-MM-YYYY')
      }
      this.InvoiceDetail = invoice_detail
      this.ProjectService = invoice_detail?.project_service_info?.map(item => {
        return {
          ...item,
          unit_price: CalPrice(item?.unit_price),
          total_money: CalPrice(item?.total_money),
          created_at: dayjs(item?.created_at).format('DD-MM-YYYY'),
          date_collect: dayjs(item?.date_collect).format('DD-MM-YYYY')
        }
      })
      this.totalMoney = CalPrice(invoice?.total_money)
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

}
