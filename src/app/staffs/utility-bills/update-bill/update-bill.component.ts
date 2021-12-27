import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';

@Component({
  selector: 'app-update-bill',
  templateUrl: './update-bill.component.html',
  styleUrls: ['./update-bill.component.css']
})
export class UpdateBillComponent implements OnInit {

  form: FormGroup
  data: any
  isLoading: boolean
  submitted: boolean = false
  errMess: any
  servicePrev: any
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataParent: { id: number, status: number },
    private api: API,
    private fb: FormBuilder,
    private toast: ToastrService,
    private matRef: MatDialogRef<UpdateBillComponent>
  ) {
    this.form = this.fb.group({
      index_water: [''],
      index_electric: ['']
    })
  }

  get ctrl() {
    return this.form.controls
  }

  showServiceIndex() {
    this.isLoading = true
    this.api.gets(`/service-index/show/${this.dataParent?.id}`).subscribe(e => {
      this.isLoading = false
      this.data = {
        ...e?.data?.service_index,
        created_at: dayjs(e?.data?.service_index?.created_at).format('DD-MM-YYYY')
      }
      this.servicePrev = e?.data?.service_index_prev
      this.setData(e?.data?.service_index)
    }, () => {
      this.isLoading = false
      this.toast.error('', 'Unknown error', { timeOut: 4000 })
    })
  }

  setData(data) {
    this.form.setValue({
      index_water: data?.index_water,
      index_electric: data?.index_electric
    })
  }

  onSubmit() {
    this.submitted = true
    const Confirm = confirm('Sau khi gửi đi sẽ không thể sửa đổi dữ liệu !')
    if (Confirm) {
      this.api.puts(`/service-index/update/${this.dataParent?.id}`, this.form.value).subscribe((e) => {
        this.toast.success('', e?.message, { timeOut: 4000 })
        this.matRef.close(e?.message)
      }, (err) => {
        this.errMess = err?.errors
        this.toast.error('', 'Kiểm tra lại trường dữ liệu !', { timeOut: 4000 })
      })
    }

  }

  ngOnInit() {
    this.dataParent?.status === 1 ? this.form.disable() : this.form.enable()
    this.showServiceIndex()
  }

}
