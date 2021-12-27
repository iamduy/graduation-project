
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { BuildingService, InvoiceService, ProjectService } from 'src/app/core'
import { InvoiceContract } from './InvoiceContract/invoice-contract'
import { InvoiceMonth } from './InvoiceMonth/invoice-month'
import { ViewInvoiceContract } from './ViewInvoiceContract/ViewInvoice-contract'
import { ViewInvoiceMonth } from './ViewInvoiceMonth/ViewInvoice-month'
@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css'],
  providers: []
})
export class FeeComponent implements OnInit {

  projects: any
  buildings: any
  floors: any

  selectControl = new FormControl('month')
  option = 'month'
  data: Iinvoice[]
  isLoading: boolean
  lastPage: any
  totalItems: number = 0
  page: number
  paginate: FormGroup

  theUrl: string
  searchForm: FormGroup
  constructor(
    private toast: ToastrService,
    public dialog: MatDialog,
    private invoiceAPI: InvoiceService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private buildingService: BuildingService,
  ) {
    this.searchForm = this.fb.group({
      project_id: '',
      building_id: '',
      floor_id: '',
      status: ''
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
      this.getInvoice(this.theUrl, this.RefParams !== undefined ? param : this.paginate.value)
    }
  }


  onSearch() {
    let params = {}
    const { project_id, building_id, floor_id, status } = this.searchForm.value
    if (project_id) params = { ...params, project_id: project_id }
    if (building_id) params = { ...params, building_id: building_id }
    if (floor_id) params = { ...params, floor_id: floor_id }
    if (status) params = { ...params, status: status }
    this.getInvoice(this.theUrl, params)
    this.RefParams = params

  }

  handleChangeOption() {
    this.option = this.selectControl.value
    if (this.option === 'month') {
      this.theUrl = '/invoices/index-based-on-months'
      this.getInvoice('/invoices/index-based-on-months')
    }
    else {
      this.theUrl = '/invoices/index-based-on-contract'
      this.getInvoice('/invoices/index-based-on-contract')
    }

  }

  createInvoiceMonth(id: number) {
    let dialogRef = this.dialog.open(InvoiceMonth, { width: '1200px', data: id })
    dialogRef.afterClosed().subscribe(item => { if (item) this.getInvoice() })
  }

  createInvoiceContract(id: number) {
    let dialogRef = this.dialog.open(InvoiceContract, { width: '1200px', data: id })
    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.getInvoice(this.theUrl)
      }
    })
  }

  viewInvoiceContract(id: number) {
    let dialogRef = this.dialog.open(ViewInvoiceContract, { width: '1200px', data: id })
    dialogRef.afterClosed().subscribe(item => { if (item) this.getInvoice() })
  }

  viewInvoiceMonth(id: number) {
    let dialogRef = this.dialog.open(ViewInvoiceMonth, { width: '1200px', data: id })
    dialogRef.afterClosed().subscribe(item => { if (item) this.getInvoice() })
  }


  getInvoice(url: string = '', value: any = {}) {
    this.isLoading = true
    if (url) {
      this.invoiceAPI.gets(url, value).subscribe(e => {
        this.isLoading = false
        const { data, meta } = e
        this.lastPage = meta?.last_page
        this.totalItems = meta?.total
        this.paginate.patchValue({ page: meta?.current_page })
        this.data = data?.map(item => {
          return {
            ...item,
            projects: item?.room?.floor?.building?.project?.name,
            buildings: item?.room?.floor?.building?.name,
            floors: item?.room?.floor?.name,
            rooms: item?.room?.name,
            created_at: dayjs(item?.created_at).format('DD-MM-YYYY')
          }
        })

      }, () => {
        this.isLoading = false
        this.toast.error('Unknown error')
      })
    }
    else {
      this.invoiceAPI.gets('/invoices/index-based-on-months').subscribe(e => {
        this.theUrl = '/invoices/index-based-on-months'
        this.isLoading = false
        const { data, meta } = e
        this.lastPage = meta?.last_page
        this.totalItems = meta?.total
        this.paginate.patchValue({ page: meta?.current_page })
        this.data = data?.map(item => {
          return {
            ...item,
            projects: item?.room?.floor?.building?.project?.name,
            buildings: item?.room?.floor?.building?.name,
            floors: item?.room?.floor?.name,
            rooms: item?.room?.name,
            created_at: dayjs(item?.created_at).format('DD-MM-YYYY')
          }
        })
      }, () => {
        this.isLoading = false
        this.toast.error('Unknown error')
      }
      )
    }
  }

  getProjects() {
    this.projectService.getAll().subscribe(e => this.projects = e?.data)
  }
  getBuildings(e) {
    let param = e?.target.value
    this.buildingService.getAll({ project_id: param }).subscribe(value => this.buildings = value?.data)
  }

  handleChangeBuilding(e) {
    let id = e?.target.value
    this.buildings?.forEach(value => {
      if (id == value?.id) this.floors = value?.floors
    })
  }

  ngOnInit() {
    this.getProjects()
    this.getInvoice()
  }



}

export interface Iinvoice {
  id: number;
  status: string;
  created_at: string;
  projects: string;
  buildings: string;
  floors: string;
  rooms: string;
}




