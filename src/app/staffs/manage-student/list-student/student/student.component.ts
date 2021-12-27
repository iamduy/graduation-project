import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { ExcelService, UserService } from 'src/app/core'
import { EditStudentComponent } from '../edit-student/edit-student.component'
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  constructor(
    private excel: ExcelService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private api: UserService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '' })
    this.searchForm = this.fb.group({ name: '', status: '', student_code: '' })
  }

  get paging() {
    return this.paginate.controls
  }

  data: any[] = []
  totalItems: number
  lastPage: number
  page: number
  paginate: FormGroup
  searchForm: FormGroup

  dataExport: any[] = []
  isLoading: boolean
  birth: string
  isChecked: boolean


  ngOnInit() {
    this.getStudents()
  }

  RefParams: any
  changePage(currentPage) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage })
      let param = { ...this.RefParams, page: currentPage }
      this.getStudents(this.RefParams !== undefined ? param : this.paginate.value)
    }
  }

  onSearch() {
    const { name, status, student_code } = this.searchForm.value
    let params = {}
    if (name) params = { ...params, name: name }
    if (status) params = { ...params, status: status }
    if (student_code) params = { ...params, student_code: student_code }
    this.getStudents(params)
    this.RefParams = params

  }

  reRenderPage(data) {
    this.dataExport = data?.map(value => {
      let element = {
        ID: value?.id,
        Name: value?.name,
        Email: value?.email,
        Phone: value?.phone,
        Birth: value?.birth,
        Gender: value.gender === 0 ? 'Nam' : 'Nữ',
        School: value?.student_info?.school,
        Father: value?.student_info?.student_relative?.farther_name,
        Mother: value?.student_info?.student_relative?.mother_name,
        ParentPhone: value?.student_info?.student_relative?.phone_relative
      }
      return element
    })
  }

  getStudents(value: any = null) {
    this.isLoading = true
    this.api.gets('/user/getUserStudent', value).subscribe(res => {
      const { data, current_page, last_page, total } = res?.data?.user
      if (res) {
        this.data = data?.map(item => {
          return {
            ...item,
            name: [item?.last_name, item?.first_name].join(' '),
            birth: dayjs(item?.birth).format('DD-MM-YYYY')
          }
        }
        )
        this.reRenderPage(this.data)
        this.lastPage = last_page
        this.totalItems = total
        this.isLoading = false
        this.paginate.patchValue({ page: current_page })
      }
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  toggleStatus(status, id) {
    if (!id) return
    if (status === 0) status = 1
    else status = 0
    this.api.puts(`/user/userActive/${id}`, { status }).subscribe(response => {
      if (response) {
        this.toast.success('', response?.message, { timeOut: 4000 })
        this.getStudents(this.RefParams !== undefined && this.RefParams)
      }
    }, () => {
      this.toast.error('', 'Unknown error', { timeOut: 4000 })
      this.isLoading = false
    })
  }



  updateInfoStudent(id: number) {
    let dialogRef = this.dialog.open(EditStudentComponent, { data: id, width: '1200px', height: '600px' })
    dialogRef.afterClosed().subscribe(key => {
      if (key === 'success') this.getStudents(this.RefParams !== undefined && this.RefParams)
    })
  }

  exportToExcel() {
    this.excel.exportAsExcelFile(this.dataExport, 'danh-sach-sinh-vien')
  }

}
