import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/core';
import { CalPrice } from 'src/app/utils';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css']
})
export class DetailInvoiceComponent implements OnInit {


  isLoading: boolean
  Invoice: any
  InvoiceDetail: any
  ProjectService: any
  roomFeeInfo: any
  studentInfo: any
  totalMoney: any
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public id: number,
    private api: StudentService,
    private toast: ToastrService
  ) { }





  getData() {
    this.isLoading = true
    this.api.getInvoiceById(this.id).subscribe(res => {
      this.isLoading = false
      const { invoice, invoice_detail } = res?.data
      this.ProjectService = invoice_detail?.project_service_info?.map(item => {
        return { ...item, unit_price: CalPrice(item?.unit_price), total_money: CalPrice(item?.total_money) }
      })
      this.Invoice = invoice
      this.InvoiceDetail = invoice_detail
      this.totalMoney = CalPrice(invoice?.total_money)
      this.studentInfo = invoice_detail?.student_info
      this.roomFeeInfo = {
        ...invoice_detail?.room_fee_info,
        unit_price: CalPrice(invoice_detail?.room_fee_info?.unit_price),
        total_money: CalPrice(invoice_detail?.room_fee_info?.total_money)
      }
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getData()
  }

}
