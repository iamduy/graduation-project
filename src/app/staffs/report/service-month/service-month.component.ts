import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';
import { CalPrice } from 'src/app/utils';

@Component({
  selector: 'app-sevice-month',
  templateUrl: './service-month.component.html',
  styleUrls: ['./service-month.component.css']
})
export class ServiceMonth implements OnInit {

  isLoading: boolean
  data: any
  searchForm: FormGroup

  paginate: FormGroup
  lastPage: number
  totalItems: number = 0
  constructor(private api: API, private toast: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
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
    let param = {}
    const { project_id } = this.searchForm.value
    if (project_id) param = { ...param, project_id: project_id }
    this.getData(param)
    this.RefParams = param
  }

  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/reports/report-service-index', value).subscribe(ele => {
      this.isLoading = false
      const { service_index, last_page, total, current_page } = ele?.data
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.patchValue({ page: current_page })
      this.data = service_index?.map(item => {
        return {
          ...item,
          unit_price: CalPrice(item?.unit_price),
          total_money: CalPrice(item?.total_money)
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
