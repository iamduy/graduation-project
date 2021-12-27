import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { API, IStudent } from 'src/app/core'

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  data: IStudent[]
  isLoading: boolean
  searchForm: FormGroup

  paginate: FormGroup
  lastPage: number
  page: number
  totalItems: number
  constructor(
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: '',
      email: ''
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
    const { name, email } = this.searchForm.value
    let params = {}
    if (name) params = { ...params, name: name }
    if (email) params = { ...params, email: email }
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
    this.api.gets('/reports/student-info', value).subscribe(ele => {
      this.isLoading = false
      const { data, current_page, total, last_page } = ele?.data?.students
      this.totalItems = total
      this.lastPage = last_page
      this.paginate.setValue({ page: current_page })
      this.data = data?.map(item => {
        return {
          ...item,
          birth: dayjs(item?.birth).format('DD-MM-YYYY'),
          created_at: dayjs(item?.created_at).format('DD-MM-YYYY hh:mm:ss')
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
