import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from 'src/app/core';

@Component({
  selector: 'app-changed-bed',
  templateUrl: './changed-bed.component.html',
  styleUrls: ['./changed-bed.component.css']
})
export class ChangedBedComponent implements OnInit {


  form: FormGroup
  data: any
  isLoading: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataParent: { idContract: number, currentBed: string },
    private api: ContractService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private matRef: MatDialogRef<ChangedBedComponent>
  ) {
    this.form = this.fb.group({
      bed_id: ''
    })
  }

  onChangeBed() {
    this.isLoading = true
    this.api.puts(`/contracts/change-bed/${this.dataParent?.idContract}`, this.form.value).subscribe((res) => {
      this.isLoading = false
      this.toast.success('', res?.message, { timeOut: 4000 })
      this.matRef.close(res?.message)
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getGedToChange()
  }

  getGedToChange() {
    this.isLoading = true
    this.api.gets(`/contracts/change-bed/${this.dataParent?.idContract}`).subscribe(e => {
      this.isLoading = false
      this.data = e?.data?.map(item => {
        return {
          label: [item?.room?.floor?.building?.name, item?.room?.floor?.name, item?.room?.name, item?.name].join(' - '),
          value: item?.id
        }
      })
      this.form.setValue({ bed_id: e?.data[0]?.id })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

}
