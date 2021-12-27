import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { ReceiptService } from 'src/app/core';
import { CalPrice } from 'src/app/utils';

@Component({
  selector: 'app-detail-receipts',
  templateUrl: './detail-receipts.component.html',
  styleUrls: ['./detail-receipts.component.css']
})
export class DetailReceiptsComponent implements OnInit {
  isLoading: boolean
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idReceipt: number,
    private api: ReceiptService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getDetail()
  }

  data: any
  getDetail() {
    this.isLoading = true
    this.api.gets(`/receipt/show/${this.idReceipt}`).subscribe(element => {
      this.isLoading = false

      this.data = {
        ...element?.data,
        collection_date: dayjs(element?.data?.collection_date).format('DD-MM-YYYY'),
        amount_of_money: CalPrice(element?.data?.amount_of_money),
        student: [element?.data?.users?.last_name, element?.data?.users?.first_name].join(' ')
      }

    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

}
