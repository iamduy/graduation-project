import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';

@Component({
  selector: 'app-service-contract',
  templateUrl: './service-contract.component.html',
  styleUrls: ['./service-contract.component.css']
})
export class ServiceContract implements OnInit {

  isLoading: boolean

  data: any
  paginate: FormGroup
  lastPage: number
  totalItems: number
  constructor(private api: API, private toast: ToastrService, private fb: FormBuilder) {
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
    this.api.gets('/reports/report-project-service', value).subscribe(ele => {
      this.isLoading = false
      const { project_services, last_page, total, current_page } = ele?.data
      this.totalItems = total
      this.lastPage = last_page
      this.paginate.setValue({ page: current_page })
      this.data = project_services
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getData()
  }

}
