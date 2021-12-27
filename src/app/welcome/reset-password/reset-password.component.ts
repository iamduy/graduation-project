import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API, CustomValidationService } from 'src/app/core';
import { Routers } from 'src/app/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  isLoading: boolean
  passW = true
  confirmNewPassw = true
  Router = Routers
  code: any
  email: any
  submitted: boolean

  resetPassword: FormGroup
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private api: API,
    private toast: ToastrService,
    private customValidate: CustomValidationService
  ) {
    this.resetPassword = this.fb.group({
      code: '',
      password: ['', Validators.compose([Validators.required, this.customValidate.regexPassword()])],
      password_confirmation: ['', Validators.required],
    },
      {
        validator: this.customValidate.MatchPassword('password', 'password_confirmation')
      })
  }

  get RFC() {
    return this.resetPassword.controls
  }


  onSubmit() {
    this.submitted = true
    this.isLoading = true
    this.api.posts(`/forgot_new_password?email=${this.email}`, this.resetPassword.value).subscribe(res => {
      this.toast.success('', res?.message, { timeOut: 4000 })
      this.isLoading = false
      this.router.navigateByUrl(Routers.LOGIN)
    }, (error) => {
      this.isLoading = false
      this.toast.error('', error?.message, { timeOut: 4000 })
    })
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params.email
      this.resetPassword.setValue({
        ...this.resetPassword.value,
        code: params.code
      })
    })

  }
  ngAfterViewInit() {
    const inputFields = document.querySelectorAll('input')
    inputFields.forEach(ele => {
      ele.setAttribute('readonly', 'readonly')
      ele.addEventListener('focus', function () {
        this.removeAttribute('readonly')
      })
    })
  }

  handleShowPassword() {
    this.passW = !this.passW
  }
  handleShowConfirmPassword() {
    this.confirmNewPassw = !this.confirmNewPassw
  }
}
