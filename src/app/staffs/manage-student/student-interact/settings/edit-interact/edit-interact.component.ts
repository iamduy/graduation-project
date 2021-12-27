import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
import { StaffInfo } from 'src/app/shared/StaffInfo/staff-info.component'
import { UserInfo } from 'src/app/shared/UserInfo/user-info.component'
import { Constant } from 'src/app/utils'

@Component({
  selector: 'app-edit-interact',
  templateUrl: './edit-interact.component.html',
  styleUrls: ['./edit-interact.component.css']
})
export class EditInteractComponent implements OnInit {

  data: any

  updateForm: FormGroup
  studentInfo: any
  staffInfo: any
  RequestType = Constant?.RequestType
  Status = Constant?.Status
  errMess: any
  isLoading: boolean
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idInteract: number,
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private matRef: MatDialogRef<EditInteractComponent>
  ) {
    this.updateForm = this.fb.group({
      request_type: Constant?.RequestType[0].value,
      content: '',
      status: Constant?.Status[0]?.value,
      student_id: '',
      staff_id: ''
    })
  }

  onSubmit() {
    this.isLoading = true
    this.updateForm.setValue({
      ...this.updateForm.value,
      student_id: this.studentInfo?.id ?? '',
      staff_id: this.staffInfo?.id ?? ''
    })
    this.api.puts(`/studentInteract/update/${this.idInteract}`, this.updateForm.value).subscribe(res => {
      this.isLoading = false
      this.toast.success('', res?.message, { timeOut: 4000 })
      this.matRef.close(res?.message)
    }, (err) => {
      this.errMess = err?.errors
      this.isLoading = false
    })
  }

  getStudentById() {
    let dialogRef = this.dialog.open(UserInfo, { height: '100vh' })
    dialogRef.afterClosed().subscribe(e => {
      if (e?.id == undefined) return
      this.studentInfo = {
        id: e?.id,
        name: `${e?.last_name} ${e?.first_name}`
      }
    })
  }

  getStaffById() {
    let dialogRef = this.dialog.open(StaffInfo, { height: '100vh' })
    dialogRef.afterClosed().subscribe(e => {
      if (e?.id == undefined) return
      this.staffInfo = {
        id: e?.id,
        name: `${e?.last_name} ${e?.first_name}`
      }
    })
  }


  getData() {
    this.isLoading = true
    this.api.gets(`/studentInteract/edit/${this.idInteract}`).subscribe(ele => {
      this.isLoading = false
      const { studentInteract } = ele?.data
      this.studentInfo = {
        id: studentInteract?.student?.id,
        name: studentInteract?.student?.name
      }
      this.staffInfo = {
        id: studentInteract?.staff?.id,
        name: studentInteract?.staff?.name
      }
      this.updateForm.setValue({
        request_type: studentInteract?.request_type ?? '',
        content: studentInteract?.content ?? '',
        status: studentInteract?.status ?? '',
        student_id: studentInteract?.student?.id ?? '',
        staff_id: studentInteract?.staff?.id ?? ''
      })
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
      this.isLoading = false
    })

  }

  ngOnInit() {
    this.getData()
  }


}
