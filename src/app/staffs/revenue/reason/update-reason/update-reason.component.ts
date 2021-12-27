import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReceiptReasonService } from 'src/app/core';

@Component({
  selector: 'app-detail-reason',
  templateUrl: './update-reason.component.html',
  styleUrls: ['./update-reason.component.css']
})
export class UpdateReasonComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: number,
    private api: ReceiptReasonService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private matRef: MatDialogRef<UpdateReasonComponent>
  ) {
    this.form = this.fb.group({
      title: '',
      description: ''
    })
  }

  error: any = []
  form: FormGroup
  submitted: boolean
  data: any
  isLoading: boolean

  onSubmit() {
    this.submitted = true
    this.api.puts(`/receipt_reasons/update/${this.id}`, this.form.value).subscribe(e => {
      this.toast.success('', e?.message, { timeOut: 4000 })
      this.matRef.close(e?.message)
    }, (err) => {
      this.error = err?.errors
    })
  }

  ngOnInit() {
    this.isLoading = true
    this.api.gets(`/receipt_reasons/detail/${this.id}`, false).subscribe(e => {
      this.data = e?.data
      this.setData(e?.data)
      this.isLoading = false
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
      this.isLoading = false
    })
  }
  setData(value) {
    this.form.setValue({
      title: value?.title ?? '',
      description: value?.description ?? ''
    })
  }

}
