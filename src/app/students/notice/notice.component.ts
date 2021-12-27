import { Component, OnInit } from '@angular/core'
import { DetailNotice } from './DetailNotice/detail-notice'
import { MatDialog } from '@angular/material/dialog'
import { API } from 'src/app/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Constant } from 'src/app/utils'
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {


  levelNotice = Constant.Notice
  isLoading: boolean
  data: any

  searchForm: FormGroup
  paginate: FormGroup
  totalItems: number
  lastPage: number

  constructor(
    public dialog: MatDialog,
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
    this.searchForm = this.fb.group({
      title: '',
      level: '',
    })
  }

  get paging() {
    return this.paginate.controls
  }

  onSearch() {
    const { title, level } = this.searchForm.value
    let params = {}
    if (title) params = { ...params, title: title }
    if (level) params = { ...params, level: level }
    this.getData(params)
  }


  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      this.getData(this.paginate.value)
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


  getData(params: any = {}) {
    this.isLoading = true
    this.api.gets('/student/notify', params).subscribe(item => {
      this.isLoading = false
      const { data, meta } = item
      this.data = data?.map(value => {
        return {
          ...value,
          level: value?.level === 0 && 'Cảnh báo' || value?.level === 1 && 'Nghiêm trọng' || value?.level === 2 && 'Bình thường'
        }
      })
      this.totalItems = meta?.total
      this.lastPage = meta?.last_page
      this.paginate.setValue({ page: meta?.current_page })
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
      this.isLoading = false
    })
  }

  ngOnInit() {
    this.getData()
  }
  detailNotice(id: number): void {
    this.dialog.open(DetailNotice, {
      width: '800px', data: id
    })
  }
}
