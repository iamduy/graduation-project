import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';
import { CalPrice } from 'src/app/utils';
@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {


  data: any
  isLoading: boolean
  searchForm: FormGroup
  paginate: FormGroup
  lastPage: number
  totalItems: number
  constructor(private api: API, private toast: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      payment_type: '',
      collection_date: ''
    })
    this.paginate = this.fb.group({ page: '' })
  }
  get paging() {
    return this.paginate.controls
  }

  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: currentPage }
      this.getData(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }

  onSearch() {
    let params = {}
    const { payment_type, collection_date } = this.searchForm.value
    if (payment_type) params = { ...params, payment_type: payment_type }
    if (collection_date) params = { ...params, collection_date: collection_date }
    this.getData(params)
    this.RefParams = params
  }


  expand = {
    id: null,
    status: false
  }
  expandText(id) {
    this.expand.id = id
    if (id) this.expand.status = !this.expand.status
  }
  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/reports/report-receipt', value).subscribe(ele => {
      this.isLoading = false
      const { data, total, current_page, last_page } = ele?.data?.receipt
      this.totalItems = total
      this.lastPage = last_page
      this.paginate.setValue({ page: current_page })
      this.data = data?.map(item => {
        return {
          ...item,
          amount_of_money: CalPrice(item?.amount_of_money),
          collection_date: dayjs(item?.colection_date).format('DD-MM-YYYY')
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

}
