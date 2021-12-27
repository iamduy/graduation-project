import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { API } from 'src/app/core'
import { StaffInfo } from 'src/app/shared/StaffInfo/staff-info.component'
import { UserInfo } from 'src/app/shared/UserInfo/user-info.component'
import { Constant } from 'src/app/utils'

@Component({
  selector: 'app-create-interact',
  templateUrl: './create-interact.component.html',
  styleUrls: ['./create-interact.component.css']
})
export class CreateInteractComponent implements OnInit {

  createForm: FormGroup
  studentInfo: any
  staffInfo: any
  RequestType = Constant?.RequestType
  Status = Constant?.Status
  errMess: any
  isLoading: boolean
  constructor(
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private matRef: MatDialogRef<CreateInteractComponent>

  ) {
    this.createForm = this.fb.group({
      request_type: Constant?.RequestType[0].value,
      content: '',
      status: Constant?.Status[0]?.value,
      student_id: '',
      staff_id: ''
    })
  }


  onSubmit() {
    this.isLoading = true
    this.createForm.setValue({
      ...this.createForm.value,
      student_id: this.studentInfo?.id ?? '',
      staff_id: this.staffInfo?.id ?? ''
    })
    this.api.posts('/studentInteract/store', this.createForm.value).subscribe(res => {
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

  ngOnInit() { }
}
