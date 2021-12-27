import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';

@Component({
  selector: 'app-update-announce',
  templateUrl: './update-announce.component.html',
  styleUrls: ['./update-announce.component.css']
})
export class UpdateAnnounceComponent implements OnInit {
  isLoading: boolean
  updateForm: FormGroup
  data: any
  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private api: API, private toast: ToastrService, private fb: FormBuilder, private matRef: MatDialogRef<UpdateAnnounceComponent>) {
    this.updateForm = this.fb.group({ name: '' })
  }


  onSubmit() {
    this.api.puts(`/type_announces/${this.id}`, this.updateForm.value).subscribe(ele => {
      this.toast.success('', ele?.message, { timeOut: 4000 })
      this.matRef.close(ele?.message)
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
    })

  }

  ngOnInit() {
    this.isLoading = true
    this.api.gets(`/type_announces/${this.id}`).subscribe(ele => {
      this.isLoading = false
      this.updateForm.setValue({ name: ele?.data?.name })
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

}
