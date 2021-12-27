import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, CustomValidationService } from 'src/app/core';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private customValidate: CustomValidationService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {

  }
  submitted: boolean = false
  changePasswordForm: FormGroup
  passw: boolean = true
  newPassw: boolean = true
  confirmNewPassw: boolean = true
  isLoading: boolean = false
  Router = this.userService.Router



  validateForm() {
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', Validators.compose([Validators.required, this.customValidate.regexPassword()])],
      verify_password: ['', [Validators.required]],
    },
      {
        validator: this.customValidate.MatchPassword('new_password', 'verify_password')
      }
    )
  }
  ngOnInit() {
    this.validateForm()
  }

  get FC() {
    return this.changePasswordForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.changePasswordForm.valid) {
      this.isLoading = true
      this.authService.changePassword(this.changePasswordForm.value).subscribe(
        (m) => {
          this.isLoading = false
          this.toast.success('', m?.message, { timeOut: 4000 })
          this.router.navigateByUrl(this.Router.PROFILE.STAFF.URL)
        },
        (err) => {
          const { old_password, new_password } = err.errors
          if (old_password) this.toast.error('', old_password.join(''), { timeOut: 4000 })
          if (new_password) this.toast.error('', new_password.join(''), { timeOut: 4000 })
          this.isLoading = false
        }
      );
    }
  }

  handleShowPassword() {
    this.passw = !this.passw
  }
  handleShowNewPassword() {
    this.newPassw = !this.newPassw
  }
  handleShowConfirmPassword() {
    this.confirmNewPassw = !this.confirmNewPassw
  }

}
