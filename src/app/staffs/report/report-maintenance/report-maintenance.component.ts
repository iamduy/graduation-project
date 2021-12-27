import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';
@Component({
  selector: 'app-report-maintenance',
  templateUrl: './report-maintenance.component.html',
  styleUrls: ['./report-maintenance.component.css']
})
export class ReportMaintenanceComponent implements OnInit {

  data: any
  isLoading: boolean
  searchForm: FormGroup
  paginate: FormGroup
  lastPage: number
  totalItems: number
  constructor(private api: API, private toast: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({ name: '' })
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
    const { name } = this.searchForm.value
    let params = {}
    if (name) params = { ...params, name: name }
    this.getData(params)
    this.RefParams = params
  }


  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/reports/report-maintence', value).subscribe(ele => {
      this.isLoading = false
      const { data, last_page, total, current_page } = ele?.data?.maintain
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.setValue({ page: current_page })
      this.data = data
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getData()
  }

}
