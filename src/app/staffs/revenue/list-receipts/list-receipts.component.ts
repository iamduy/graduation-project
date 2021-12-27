import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { ReceiptService } from 'src/app/core'
import { DetailReceiptsComponent } from '../detail-receipts/detail-receipts.component'

@Component({
  selector: 'app-list-receipts',
  templateUrl: './list-receipts.component.html',
  styleUrls: ['./list-receipts.component.css']
})
export class ListReceiptsComponent implements OnInit {

  isLoading: boolean
  data: any
  searchForm: FormGroup

  lastPage: number
  totalItems: number
  page: number
  paginate: FormGroup


  constructor(
    public dialog: MatDialog,
    private api: ReceiptService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.paginate = this.fb.group({ page: '' })
    this.searchForm = this.fb.group({
      name: '',
      collection_date: ''
    })
  }


  get paging() {
    return this.paginate.controls
  }

  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: currentPage }
      this.getReceipt(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }

  onSearch() {
    let param = {}
    const { collection_date, name } = this.searchForm.value
    if (collection_date) param = { ...param, collection_date: collection_date }
    if (name) param = { ...param, name: name }
    this.getReceipt(param)
    this.RefParams = param

  }


  DetailInfoReceipt(value) {
    let dialogRef = this.dialog.open(DetailReceiptsComponent, {
      width: '800px', data: value
    })
    dialogRef.afterClosed().subscribe(mes => {
      if (mes) this.getReceipt()
    })
  }


  getReceipt(value: any = null) {
    this.isLoading = true
    this.api.gets('/receipt/index', value).subscribe(e => {
      const { last_page, current_page, data, total } = e?.data
      this.data = data?.map(item => {
        return {
          ...item,
          date_time: dayjs(item?.collection_date).format('DD-MM-YYYY'),
          nameStudent: [item?.users?.last_name, item?.users?.first_name].join(' ')
        }
      })
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.patchValue({ page: current_page })
      this.isLoading = false
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }
  ngOnInit() {
    this.getReceipt()
  }
}
