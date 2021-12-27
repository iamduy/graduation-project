import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { API, CustomValidationService } from 'src/app/core'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading: boolean
  constructor(private fb: FormBuilder, private api: API, private toast: ToastrService) {
    this.ForgotPassWForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    })
  }
  ForgotPassWForm: FormGroup
  submitted = false

  get RFC() {
    return this.ForgotPassWForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.ForgotPassWForm.valid) {
      this.isLoading = true
      this.api.posts('/forgot_password', this.ForgotPassWForm.value).subscribe(response => {
        this.isLoading = false
        this.toast.success(response?.message, 'Thành công', { timeOut: 4000, closeButton: true })
      }, (error) => {
        this.isLoading = false
        this.toast.error('', error?.message, { timeOut: 4000 })
      })
    }


  }


  ngOnInit() {


  }

}
