import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/core'

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idStudent: number,
    private toast: ToastrService,
    private api: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private matRef: MatDialogRef<EditStudentComponent>

  ) {
    this.updateStudentForm = this.fb.group({
      first_name: '',
      last_name: '',
      birth: '',
      birth_place: '',
      gender: 1,
      status: 1,
      address: '',
      phone: '',
      student_code: '',
      department: '',
      student_year: 0,
      nation: '',
      religion: '',
      CCCD: 0,
      date_range: '',
      issued_by: '',
      student_object: 1,
      school: '',
      farther_name: '',
      mother_name: '',
      address_relative: '',
      phone_relative: ''
    })
  }
  data: any
  updateStudentForm: FormGroup
  isLoading: boolean = false
  errorMess: any

  onSubmit() {
    this.api.puts(`/user/student/update/${this.idStudent}`, this.updateStudentForm.value).subscribe((mes) => {
      this.toast.success('', mes?.message, { timeOut: 4000 })
      this.matRef.close('success')
    }, (err) => {
      this.toast.error('Kiểm tra lại các trường đã nhập', 'Thất bại', { timeOut: 4000 })
      this.errorMess = err?.data
    })
  }



  ngOnInit() {
    this.getStudent()
  }

  getStudent() {
    this.isLoading = true
    this.api.gets(`/user/findBy/${this.idStudent}`, false).subscribe(res => {
      this.data = res?.data?.user
      this.setDataForm(res?.data?.user)
      this.isLoading = false

    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  setDataForm(value) {
    const { student_code, department, student_year, nation, religion, CCCD, date_range, issued_by, student_object, school, student_relative } = value?.student_info
    this.updateStudentForm.setValue({
      first_name: value.first_name ?? '', //
      last_name: value.last_name ?? '', //
      birth: dayjs(value?.birth).format('YYYY-MM-DD') ?? '', //
      birth_place: value?.birth_place ?? '', //
      gender: value?.gender ?? '', //
      status: value?.status ?? '', //
      address: value?.address ?? '', //
      phone: value?.phone ?? '', //
      student_code: student_code ?? '', //
      department: department ?? '', //
      student_year: student_year ?? '', //
      nation: nation ?? '', //
      religion: religion ?? '', //
      CCCD: CCCD ?? '', //
      date_range: dayjs(date_range).format('YYYY-MM-DD') ?? '', //
      issued_by: issued_by ?? '', //
      student_object: student_object ?? '', //
      school: school ?? '', //
      farther_name: student_relative?.farther_name ?? '',
      mother_name: student_relative?.mother_name ?? '',
      address_relative: student_relative?.address_relative ?? '',
      phone_relative: student_relative?.phone_relative ?? ''
    })
  }

}
