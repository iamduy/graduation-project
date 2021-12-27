import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { API, IStudentInteract } from 'src/app/core'
import { Constant } from 'src/app/utils'
import { CreateInteractComponent } from './settings/create-interact/create-interact.component'
import { EditInteractComponent } from './settings/edit-interact/edit-interact.component'

@Component({
  selector: 'app-student-interact',
  templateUrl: './student-interact.component.html',
  styleUrls: ['./student-interact.component.css']
})
export class StudentInteractComponent implements OnInit {

  isLoading: boolean
  requestType: IRequestType[]
  data: IStudentInteract[]
  RequestType = Constant?.RequestType
  Status = Constant?.Status

  lastPage: any
  totalItems: number = 0
  page: number
  paginate: FormGroup
  searchForm: FormGroup
  constructor(
    public dialog: MatDialog,
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
    this.searchForm = this.fb.group({
      request_type: Constant?.RequestType[0]?.value,
      status: Constant?.Status[0]?.value,
      student_name: ''
    })
  }

  get paging() {
    return this.paginate.controls
  }

  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: this.paginate.value.page }
      this.getData(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }
  onSearch() {
    let params = {}
    const { student_name, request_type, status } = this.searchForm.value

    if (request_type) params = { ...params, request_type: request_type }
    if (status) params = { ...params, status: status }
    if (student_name) params = { ...params, student_name: student_name }
    this.getData(params)
    this.RefParams = params
  }

  updateInteract(id: number) {
    let dialogRef = this.dialog.open(EditInteractComponent, { width: '600px', data: id })
    dialogRef.afterClosed().subscribe(res => res && this.getData())
  }

  createInteract() {
    let dialogRef = this.dialog.open(CreateInteractComponent, { width: '600px' })
    dialogRef.afterClosed().subscribe(res => res && this.getData())
  }

  removeInteract(id: number) {
    const Confirm = confirm('Xác nhận xoá tương tác ?')
    if (Confirm) {
      this.api.delete(`/studentInteract/delete/${id}`).subscribe(res => {
        this.isLoading = false
        this.toast.success('', res?.message, { timeOut: 4000 })
        this.getData()
      }, (err) => {
        this.toast.error('', err?.message, { timeOut: 4000 })
        this.isLoading = false
      })
    }

  }



  getData(value: any = {}) {
    this.isLoading = true
    this.api.gets('/studentInteract/index', value).subscribe(res => {
      this.isLoading = false
      const { current_page, data, total, last_page } = res?.data?.studentInteract
      this.data = data?.map(item => {
        return {
          ...item,
          date_send: dayjs(item?.date_send).format('DD-MM-YYYY'),
          request_type: item?.request_type === 0 && 'Rỗng' || item?.request_type === 1 && 'Báo hỏng' || item?.request_type === 2 && 'Thanh lý hợp đồng' || item?.request_type === 3 && 'Khác',
          status: item?.status === 1 && 'Khởi tạo' || item?.status === 2 && 'Đã tiếp nhận' || item?.status === 3 && 'Đang xử lý' || item?.status === 4 && 'Hoàn thành' || item?.status === 5 && 'Từ chối',
          staffName: [item?.staff?.last_name, item?.staff?.first_name].join(' '),
          studentName: [item?.student?.last_name, item?.student?.first_name].join(' '),
        }
      })
      this.lastPage = last_page
      this.totalItems = total
      this.paginate.patchValue({ page: current_page })
      this.requestType = res?.data?.request_type

    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })

  }

  ngOnInit() {
    this.getData()
  }



  expand = {
    id: null,
    status: false
  }
  expandText(id) {
    this.expand.id = id
    if (id) this.expand.status = !this.expand.status
  }



}


export interface IRequestType {
  requestType_id: number
  requestType_name: string
}