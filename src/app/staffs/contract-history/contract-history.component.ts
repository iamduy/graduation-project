import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { API, IStudent, RoomService } from 'src/app/core'
import { ExcelService } from 'src/app/core/services/excel.service'
import { ViewInfoComponent } from './view-info/view-info.component'
@Component({
  selector: 'app-contract-history',
  templateUrl: './contract-history.component.html',
  styleUrls: ['./contract-history.component.css']
})
export class ContractHistoryComponent implements OnInit {

  constructor(
    private excel: ExcelService,
    private fb: FormBuilder,
    private api: API,
    private roomsService: RoomService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {
    this.paginate = this.fb.group({ page: '' });
  }

  ContractHistory: IContractHistory[]
  rooms: any
  beds: any
  isLoading: boolean
  dataExport: any[] = []
  searchForm: FormGroup
  searchTerm: string
  stat_day: string
  end_day: string
  lastPage: any
  totalItems: number = 0
  paginate: FormGroup


  get paging() {
    return this.paginate.controls
  }


  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: currentPage }
      this.getContractHistory(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }

  onSearch() {
    this.isLoading = true
    const { stat_day, end_day, room_id, bed_id } = this.searchForm.value
    let params = {}
    if (stat_day) params = { ...params, stat_day: stat_day }
    if (end_day) params = { ...params, end_day: end_day }
    if (room_id) params = { ...params, room_id: room_id }
    if (bed_id) params = { ...params, bed_id: bed_id }
    this.getContractHistory(params)
    this.RefParams = params

  }

  handleChangeRoom(e) {
    let id = e?.target.value
    this.rooms?.forEach(value => {
      if (id == value?.id) this.beds = value?.beds
    })
  }

  reRenderPage(data) {
    this.dataExport = data?.map(_value => {
      let element = {
        ID: _value?.id,
        End_day: _value?.end_day,
        Price: _value?.price,
        Deposit: _value?.deposit,
        Room: _value?.contract_room?.name,
        Bed: _value?.contract_bed?.name,
        Student: [_value?.student?.last_name, _value?.student?.first_name].join(' '),
        Gender: _value?.student?.gender,
        Phone: _value?.student?.phone
      }
      return element
    })

  }



  getRooms() {
    this.roomsService.getAll().subscribe(value => this.rooms = value?.data)
  }

  getContractHistory(value: any = null) {
    this.isLoading = true
    this.api.gets('/contracts/end-contract/index', value).subscribe(res => {
      const { data, meta } = res
      if (res) {
        this.ContractHistory = data?.map(item => {
          return {
            ...item,
            deleted_at: dayjs(item?.deleted_at).format('DD-MM-YYYY'),
            stat_day: dayjs(item?.stat_day).format('DD-MM-YYYY'),
            end_day: dayjs(item?.end_day).format('DD-MM-YYYY')
          }
        })
        this.reRenderPage(this.ContractHistory)
        this.lastPage = meta?.last_page
        this.totalItems = meta?.total
        this.paginate.patchValue({ page: meta?.current_page })
        this.isLoading = false
      }
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })

  }


  exportToExcel() {
    this.excel.exportAsExcelFile(this.dataExport, 'danh-sach-hop-dong-thanh-ly')
  }

  viewDetail(id) {
    this.dialog.open(ViewInfoComponent, { width: '1400px', height: '90vh', data: id })
  }

  ngOnInit() {
    this.getRooms()
    this.getContractHistory()
    this.searchForm = this.fb.group({
      stat_day: '',
      end_day: '',
      room_id: '',
      bed_id: ''
    })
  }
}

export interface IContractHistory {
  id: number;
  stat_day: string;
  end_day: string;
  deleted_at: string;
  price: number;
  deposit: number;
  student: IStudent
  contract_bed: {
    id: number;
    name: string;
  }
  contract_room: {
    id: number;
    name: string;
  }
}

export interface Ipaginate {
  url: string;
  status: boolean;
}