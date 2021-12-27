import { AfterViewInit, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/core'
import { CustomValidationService } from 'src/app/core/services/custom-validate.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  isLoading: boolean
  registerForm: FormGroup
  submitted = false
  errorMessage = ''
  passw = true
  confirmPw = true
  errorMess: any
  constructor(
    private auth: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private customValidate: CustomValidationService,
    private router: Router
  ) { }



  validateForm() {
    this.registerForm = this.fb.group({
      birth: ['', Validators.required],
      gender: ['1'],
      email: ['', [Validators.required, Validators.email]],
      date_range: ['', Validators.required],
      student_object: ['1'],
      first_name: ['', Validators.compose([Validators.required, this.customValidate.regexName()])],
      last_name: ['', Validators.compose([Validators.required, this.customValidate.regexName()])],
      birth_place: ['', Validators.required],
      address: ['', Validators.compose([Validators.required, this.customValidate.regexLocation()])],
      phone: ['', Validators.compose([Validators.required, this.customValidate.regexPhone()])],
      password: ['', Validators.compose([Validators.required, this.customValidate.regexPassword()])],
      password_confirmation: ['', Validators.required],
      student_code: ['', Validators.required],
      department: ['', Validators.required],
      nation: ['', Validators.required],
      religion: ['', Validators.required],
      CCCD: ['', Validators.compose([Validators.required, this.customValidate.regexCCCD()])],
      issued_by: ['', Validators.required],
      school: ['', Validators.required],
      student_year: ['', Validators.compose([Validators.required, this.customValidate.regexNumber(true)])],
      address_relative: ['', Validators.compose([Validators.required, this.customValidate.regexLocation()])],
      fathername: ['', Validators.compose([Validators.required, this.customValidate.regexName()])],
      mothername: ['', Validators.compose([Validators.required, this.customValidate.regexName()])],
      phone_relative: ['', Validators.compose([Validators.required, this.customValidate.regexPhone()])],

    },
      {
        validator: this.customValidate.MatchPassword('password', 'password_confirmation')
      })
  }

  ngOnInit() {
    this.validateForm()
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


  get RFC() {
    return this.registerForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.valid) {
      this.isLoading = true
      this.auth.register(this.registerForm.value).subscribe(
        () => {
          this.isLoading = false
          this.toast.success('', 'Đăng kí thành công', { timeOut: 4000 })
          this.router.navigateByUrl('/dang-nhap')
        },
        () => {
          this.toast.error('', 'Kiểm tra lại các trường đã nhập', { timeOut: 4000 })
          this.isLoading = false
        }
      )
    }
  }
  handleShowPassword() {
    this.passw = !this.passw
  }
  handleShowConfirmPassword() {
    this.confirmPw = !this.confirmPw
  }
}
