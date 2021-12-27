import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { BuildingService, ProjectService, API } from 'src/app/core'
import { UpdateBillComponent } from './update-bill/update-bill.component'


@Component({
  selector: 'app-utility-bills',
  templateUrl: './utility-bills.component.html',
  styleUrls: ['./utility-bills.component.css'],
})
export class UtilityBillsComponent implements OnInit {

  data: any
  projects: any
  buildings: any
  floors: any

  isLoading: boolean
  searchForm: FormGroup
  lastPage: any
  totalItems: number = 0
  page: number
  paginate: FormGroup

  constructor(
    private api: API,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toast: ToastrService,
    private projectService: ProjectService,
    private buildingService: BuildingService,
  ) {
    this.searchForm = this.fb.group({
      month: '',
      year: '',
      project_id: '',
      building_id: '',
      floor_id: '',
      status: '',
      room_name: ''
    })
    this.paginate = this.fb.group({ page: '' })
  }

  get paging() {
    return this.paginate.controls
  }

  changeTimes(e) {
    const el = e.target.value
    const month = dayjs(el).format('MMMM')
    const year = dayjs(el).format('YYYY')
    this.searchForm.setValue({
      ...this.searchForm.value,
      month: month ?? '',
      year: year ?? ''
    })
  }



  updateUtilityBills(id: number, status: number) {
    let dialogRef = this.dialog.open(UpdateBillComponent, { data: { id, status }, width: '800px', height: '400px' })
    dialogRef.afterClosed().subscribe(mes => {
      if (mes) this.getUtilityBills(this.RefParams !== undefined && this.RefParams)
    })
  }

  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      this.RefParams = { ...this.RefParams, page: this.paginate.value.page }
      this.getUtilityBills(this.RefParams !== undefined ? this.RefParams : this.paginate.value)
    }
  }

  RefParams: any
  onSearch() {
    let params = {}
    const { month, year, project_id, building_id, floor_id, status, room_name } = this.searchForm.value
    if (month) params = { ...params, month: month }
    if (year) params = { ...params, year: year }
    if (project_id) params = { ...params, project_id: project_id }
    if (building_id) params = { ...params, building_id: building_id }
    if (floor_id) params = { ...params, floor_id: floor_id }
    if (status) params = { ...params, status: status }
    if (room_name) params = { ...params, room_name: room_name }
    this.RefParams = params
    this.getUtilityBills(params)
  }


  getUtilityBills(params: any = {}) {
    this.isLoading = true
    this.api.gets('/service-index/index', params).subscribe(e => {
      this.isLoading = false
      const { data, current_page, last_page, total } = e?.data?.service
      this.data = data?.map(item => {
        return {
          ...item,
          projectName: item?.room?.floor?.building?.project?.name,
          buildingName: item?.room?.floor?.building?.name,
          floorName: item?.room?.floor?.name,
          roomName: item?.room?.name,
          created_at: dayjs(item?.created_at).format('DD-MM-YYYY')
        }

      })
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.patchValue({ page: current_page })

    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
      this.isLoading = false
    })
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
    this.getUtilityBills()
  }

}




