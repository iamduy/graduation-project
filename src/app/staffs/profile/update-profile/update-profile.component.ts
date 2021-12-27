import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService, IUser, LoadingService } from 'src/app/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  formUpdateUser: FormGroup;
  user: IUser = {} as IUser;
  Router = this.userService.Router;

  errors: any = [];
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) { }
  get f() {
    return this.formUpdateUser.controls;
  }
  ngOnInit() {
    this.authService.currentUser.subscribe((data) => {
      if (data?.id) {
        this.user = data;
        this.formUpdateUser = this.fb.group({
          first_name: data.first_name,
          last_name: data.last_name,
          address: data.address,
          phone: data.phone,
        });
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.authService.updateProfile(this.formUpdateUser.value).subscribe(
      (t) => {
        this.loadingService.setLoading(false);
        if (t.data.id) {
          this.authService.setUser;
          this.toast.success(
            'Cập nhật thông tin tài khoản thành công',
            'Thông báo',
            { timeOut: 4000, closeButton: true }
          );
        }
      },
      (f) => {
        this.loadingService.setLoading(false);

        this.errors = f.errors;
        this.toast.error('Cập nhật thông tin tài khoản thất bại', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      }
    );
  }
}
