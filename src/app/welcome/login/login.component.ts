import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Routers } from 'src/app/utils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Router = Routers
  isLoading: boolean = false
  errorMessage: string = ''
  submitted: boolean = false
  loginForm: FormGroup
  eye = true
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get LFC() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.isLoading = false;
        },
        (err) => {
          this.toast.error(err.message, 'Thất bại', { timeOut: 4000, closeButton: true });
          this.isLoading = false;
        }
      );
    }
  }
  handleShowPassword() {
    this.eye = !this.eye
  }
}
