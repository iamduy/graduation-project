import { Component, OnInit, Injector } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { InfoContractModalComponent } from './settings/info-contract/info-contract.component'
import { PrintingContractComponent } from './settings/printing-contract/printing-contract.component'
import { CreateContractComponent } from './settings/create-contract/create-contract.component'
import { ExcelService, BuildingService, IBuilding, IContracts, IFloor, IProject, IRoom, ProjectService, RoomService, API } from 'src/app/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import * as dayjs from 'dayjs'
import { CalPrice } from 'src/app/utils'
import { ChangedBedComponent } from './settings/changed-bed/changed-bed.component'
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  /*********** variable *************/

  projects: IProject[]
  buildings: IBuilding[]
  floors: IFloor[]
  rooms: IRoom[]
  isLoading: boolean

  data: IContracts[]
  dataExport: any[] = []
  searchForm: FormGroup
  searchTerm: string

  lastPage: any
  totalItems: number
  page: number
  paginate: FormGroup

  /************* Service ***********/
  excel: ExcelService
  dialog: MatDialog
  toast: ToastrService
  api: API
  buildingService: BuildingService
  projectsService: ProjectService
  roomsService: RoomService
  fb: FormBuilder
  constructor(private injector: Injector) {
    this.excel = injector.get<ExcelService>(ExcelService)
    this.dialog = injector.get<MatDialog>(MatDialog)
    this.toast = injector.get<ToastrService>(ToastrService)
    this.api = injector.get<API>(API)
    this.buildingService = injector.get<BuildingService>(BuildingService)
    this.projectsService = injector.get<ProjectService>(ProjectService)
    this.roomsService = injector.get<RoomService>(RoomService)
    this.fb = injector.get<FormBuilder>(FormBuilder)
    this.paginate = this.fb.group({ page: '' })

  }

  get paging() {
    return this.paginate.controls
  }

  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      this.RefParams = { ...this.RefParams, page: currentPage }
      this.getData(this.RefParams !== undefined ? this.RefParams : this.paginate.value)
    }
  }

  onSearch() {
    this.isLoading = true
    const { last_name, first_name, email, deposit_state, phone, address, start_day, end_day, room_id, project_id, building_id, floor_id } = this.searchForm.value
    let params = {}
    if (last_name) params = { ...params, last_name: last_name }
    if (first_name) params = { ...params, first_name: first_name }
    if (email) params = { ...params, email: email }
    if (deposit_state) params = { ...params, deposit_state: deposit_state }
    if (phone) params = { ...params, phone: phone }
    if (address) params = { ...params, address: address }
    if (start_day) params = { ...params, start_day: start_day }
    if (end_day) params = { ...params, end_day: end_day }
    if (room_id) params = { ...params, room_id: room_id }
    if (project_id) params = { ...params, project_id: project_id }
    if (building_id) params = { ...params, building_id: building_id }
    if (floor_id) params = { ...params, floor_id: floor_id }
    if (this.exists !== undefined && this.exists !== '') params = { ...params, exists: this.exists }
    if (this.not_exists !== undefined && this.not_exists !== '') params = { ...params, not_exists: this.not_exists }
    this.getData(params)
    this.RefParams = params
  }

  exists: any
  not_exists: any
  changeExists(e) {
    if (e === 'exist') {
      this.exists = 1
      this.not_exists = ''
    }
    if (e === 'not_exist') {
      this.not_exists = 1
      this.exists = ''
    }
    if (e === 'all') {
      this.exists = ''
      this.not_exists = ''
    }
  }

  getProjects() {
    this.projectsService.getAll().subscribe(e => this.projects = e?.data)
  }
  getBuildings(e) {
    let param = e?.target.value
    this.buildingService.getAll({ project_id: param }).subscribe(value => this.buildings = value?.data)
  }
  getRooms(e) {
    let param = e?.target.value
    if (!param) return;
    this.roomsService.getAll({ floor_id: param }).subscribe(value => this.rooms = value?.data)
  }

  handleChangeBuilding(e) {
    let id = e?.target.value
    this.buildings?.forEach(value => {
      if (id == value?.id) this.floors = value?.floors
    })
  }

  reRenderPage(data) {
    this.dataExport = data?.map(_value => {
      let element = {
        Status: _value.contract === null ? 'Còn trống' : 'Đã thuê',
        Building: _value?.room?.floor?.building?.name,
        Floor: _value?.room?.floor?.name,
        RoomType: _value?.room?.room_type?.name,
        Price: CalPrice(_value?.contract?.price),
        Deposit: CalPrice(_value?.contract?.deposit),
        DepositState: _value.contract?.deposit_state,
        StartDate: _value?.contract !== null ? dayjs(_value?.contract?.stat_day).format('DD-MM-YYYY') : '',
        EndDate: _value?.contract !== null ? dayjs(_value?.contract?.end_day).format('DD-MM-YYYY') : '',
        Customer: _value?.nameStudent,
        Gender: _value.contract?.student?.gender,
        PhoneNumber: _value.contract?.student?.phone,
      }
      // this.dataExport.push(element)
      // const templatesNew = [
      //   ...new Map(
      //     this.dataExport.map(_item => [JSON.stringify(_item), _item])
      //   ).values()
      // ]
      // this.dataExport = [...templatesNew]
      return element
    })
  }


  getData(value: any = null) {
    this.isLoading = true
    this.api.gets('/contracts/index', value).subscribe(res => {
      const { data, meta } = res
      if (res) {
        this.isLoading = false
        this.data = data?.map(item => {
          return {
            ...item,
            nameStudent: [item?.contract?.student?.last_name, item?.contract?.student?.first_name].join(' '),
            price: CalPrice(item?.contract?.price),
            price_deposit: CalPrice(item?.contract?.deposit),
          }
        })
        this.reRenderPage(this.data)
        this.lastPage = meta?.last_page
        this.totalItems = meta?.total
        this.paginate.patchValue({ page: meta?.current_page })
      }
    })
  }

  ngOnInit() {
    this.getProjects()
    this.getData()
    this.searchForm = this.fb.group({
      last_name: '',
      first_name: '',
      start_day: '',
      end_day: '',
      address: '',
      phone: '',
      email: '',
      deposit_state: '',
      room_id: '',
      project_id: '',
      floor_id: '',
      building_id: '',
    })
  }

  exportToExcel() {
    this.excel.exportAsExcelFile(this.dataExport, 'danh-sach-hop-dong')
  }
  openContract(id: number) {
    this.dialog.open(InfoContractModalComponent, { width: '1400px', height: '90vh', data: id })
  }
  printContract() {
    this.dialog.open(PrintingContractComponent, { width: '1400px', height: '90vh' })
  }
  createContract(bedId, bedName) {
    let dialogRef = this.dialog.open(CreateContractComponent, { width: '1400px', height: '100vh', data: { id: bedId, name: bedName } })
    dialogRef.afterClosed().subscribe(e => {
      if (e === 'success') this.getData(this.RefParams !== undefined && this.RefParams)
    })
  }
  removeContract(idContract: number, first_name: string, last_name: string) {
    let Confirm = confirm(`Bạn muốn thanh lý hợp đồng với sinh viên ${[first_name, last_name].join(' ')} ?`)
    if (Confirm) {
      this.api.delete(`/contracts/end-contract/${idContract}`).subscribe((mes) => {
        this.toast.success('', mes?.message, { timeOut: 4000 })
        this.getData(this.RefParams !== undefined && this.RefParams)
      }, (error) => {
        this.toast.error('', error?.message, { timeOut: 4000 })

      })
    }
  }

  changedBed(idContract: number, currentBed: string) {
    let dialogRef = this.dialog.open(ChangedBedComponent, { width: '500px', data: { idContract: idContract, currentBed: currentBed } })
    dialogRef.afterClosed().subscribe(e => {
      if (e) this.getData(this.RefParams !== undefined && this.RefParams)
    })
  }
}

export interface Ipaginate {
  url: string;
  status: boolean;
}

