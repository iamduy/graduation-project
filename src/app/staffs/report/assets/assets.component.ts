import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
import { CalPrice } from 'src/app/utils'

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  data: any
  isLoading: boolean
  TypeAssets: any

  searchForm: FormGroup
  paginate: FormGroup
  lastPage: number
  totalItems: number
  constructor(private api: API, private toast: ToastrService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: '',
      asset_type_id: ''
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
    const { name, asset_type_id } = this.searchForm.value
    let params = {}
    if (name) params = { ...params, name: name }
    if (asset_type_id) params = { ...params, asset_type_id: asset_type_id }
    this.getData(params)
    this.RefParams = params

  }

  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/reports/report-asset', value).subscribe(ele => {
      this.isLoading = false
      const { data, current_page, total, last_page } = ele?.data?.asset
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.setValue({ page: current_page })
      this.data = data?.map(item => {
        return { ...item, price: CalPrice(item?.price) }
      })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  getTypeAssets() {
    this.isLoading = true
    this.api.gets('/type_assets').subscribe(ele => {
      this.isLoading = false
      const { data } = ele
      this.TypeAssets = data?.map(item => {
        return { label: item?.name, value: item?.id }
      })
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getData()
    this.getTypeAssets()
  }

}
