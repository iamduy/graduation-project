import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { ReceiptReasonService } from 'src/app/core'

@Component({
  selector: 'app-create-reason',
  templateUrl: './create-reason.component.html',
  styleUrls: ['./create-reason.component.css']
})
export class CreateReasonComponent implements OnInit {

  constructor(
    private api: ReceiptReasonService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateReasonComponent>
  ) {
    this.form = this.fb.group({
      title: '',
      description: ''
    })
  }
  error: any = []
  form: FormGroup
  submitted: boolean

  onSubmit() {
    this.submitted = true
    this.api.posts('/receipt_reasons/store', this.form.value).subscribe(mes => {
      this.toast.success('', mes?.message, { timeOut: 4000 })
      this.dialogRef.close(mes)
    }, err => {
      this.error = err?.errors
    })
  }

  ngOnInit() { }



}
