import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';

@Component({
  selector: 'app-create-announce',
  templateUrl: './create-announce.component.html',
  styleUrls: ['./create-announce.component.css']
})
export class CreateAnnounceComponent implements OnInit {


  createForm: FormGroup

  constructor(private api: API, private toast: ToastrService, private fb: FormBuilder, private matRef: MatDialogRef<CreateAnnounceComponent>) {
    this.createForm = this.fb.group({ name: '' })
  }


  onSubmit() {
    this.api.posts('/type_announces', this.createForm.value).subscribe(ele => {
      this.toast.success('', ele?.message, { timeOut: 4000 })
      this.matRef.close(ele?.message)
    }, (err) => {
      this.toast.error('', err?.message, { timeOut: 4000 })
    })

  }
  ngOnInit(): void {
  }

}
