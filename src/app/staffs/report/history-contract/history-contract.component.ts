import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
import { CalPrice } from 'src/app/utils'

@Component({
  selector: 'app-history-contract',
  templateUrl: './history-contract.component.html',
  styleUrls: ['./history-contract.component.css']
})
export class HistoryContractComponent implements OnInit {
  isLoading: boolean
  data: any
  searchForm: FormGroup
  paginate: FormGroup
  totalItems: number
  lastPage: number
  constructor(
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: '',
      phone: '',
      project_id: ''
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
    const { name, phone, project_id } = this.searchForm.value
    if (name) params = { ...params, name: name }
    if (phone) params = { ...params, phone: phone }
    if (project_id) params = { ...params, project_id: project_id }
    this.getData(params)
    this.RefParams = params
  }

  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/reports/history-contract', value).subscribe(ele => {
      this.isLoading = false
      const { data, current_page, total, last_page } = ele?.data?.history
      this.totalItems = total
      this.lastPage = last_page
      this.paginate.setValue({ page: current_page })
      this.data = data?.map(item => {
        return {
          ...item,
          start_day: dayjs(item?.contract?.start_day).format('DD-MM-YYYY'),
          end_day: dayjs(item?.contract?.end_day).format('DD-MM-YYYY'),
          price: CalPrice(item?.contract?.price),
          deposit: CalPrice(item?.contract?.deposit),
          nameStudent: [item?.contract?.user?.last_name, item?.contract?.user?.first_name].join(' ')
        }
      })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  projects: any
  getProjects() {
    this.api.gets('/projects').subscribe(item => {
      this.projects = item?.data?.map(ele => {
        return {
          label: ele?.name,
          value: ele?.id
        }
      })
    })
  }

  ngOnInit() {
    this.getData()
    this.getProjects()
  }

}
