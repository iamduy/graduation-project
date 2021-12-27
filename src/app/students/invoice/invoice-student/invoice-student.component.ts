import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/core';
import { CalPrice } from 'src/app/utils';
import { DetailInvoiceComponent } from '../detail-invoice/detail-invoice.component';
@Component({
  selector: 'app-invoice-student',
  templateUrl: './invoice-student.component.html',
  styleUrls: ['./invoice-student.component.css']
})
export class InvoiceStudentComponent implements OnInit {


  data: any
  isLoading: boolean
  constructor(
    public dialog: MatDialog,
    private api: StudentService,
    private toast: ToastrService
  ) { }

  expand = {
    id: null,
    status: false
  }
  expandText(id) {
    this.expand.id = id
    if (id) this.expand.status = !this.expand.status
  }

  getData() {
    this.isLoading = true
    this.api.getInvoice().subscribe(ele => {
      this.isLoading = false
      const { receipts } = ele?.data
      this.data = receipts?.map(item => {
        return {
          ...item,
          collection_date: dayjs(item?.collection_date).format('DD-MM-YYYY'),
          amount_of_money: CalPrice(item?.amount_of_money)
        }
      })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }



  ngOnInit() {
    this.getData()
  }
  detailInvoice(id: number) {
    this.dialog.open(DetailInvoiceComponent, {
      width: '1200px', data: id
    })

  }
}
