import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IRole, IUser, LoadingService, UserService } from 'src/app/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoleService } from 'src/app/core/services/specifics/role.service';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DetailUserComponent } from '../detail-user/detail-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  roles: IRole[] = [];
  displayedColumns: string[] = [
    'id',
    'fullname',
    'email',
    'status',
    'role_id',
    'action',
  ];
  staffs: IUser[] = [];
  formSearch: FormGroup;
  lastPage: any = null;
  totalItems: number = 0;

  controlStatus: FormControl;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private roleService: RoleService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.formSearch = this.fb.group({
      name: '',
      role_id: '',
      status: '',
      page: '',
    });
    this.controlStatus = this.fb.control('');
  }

  get f() {
    return this.formSearch.controls;
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.roleService.getAllRoles().subscribe((t) => {
      if (t.data[0]?.id) {
        this.roles = t.data;
      }
    });
    this.getStaffs();
  }

  openDialogEdit(staff: IUser): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '750px',
      disableClose: false,
      data: { roles: this.roles, staff: staff },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getStaffs(this.formSearch.value);
      }
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '750px',
      disableClose: false,
      data: { roles: this.roles },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getStaffs(this.formSearch.value);
      }
    });
  }
  openDialogDetail(staff: IUser) {
    const dialogRef = this.dialog.open(DetailUserComponent, {
      width: '750px',
      disableClose: false,
      data: { roles: this.roles, staff: staff },
    });
  }

  removeStaff(maintain: IUser) {
    if (window.confirm('Xác nhận xóa?')) {
      this.loadingService.setLoading(true);
      this.userService.delete(maintain.id).subscribe(
        (t) => {
          this.getStaffs(this.formSearch.value);
          this.toast.success('Xóa tài khoản thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa tài khoản thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  getStaffs(searchData: any = null) {
    if (searchData !== null) {
      for (let key in searchData) {
        if (!searchData[key]) {
          delete searchData[key];
        }
      }
    }
    this.loadingService.setLoading(true);
    this.userService.getStaffs(searchData).subscribe((t) => {
      this.staffs = t.data.user.data; // Set data cho table
      this.lastPage = t.data.user.last_page; // set last_page cho pagination
      this.totalItems = t.data.user.total; // Set tổng item cho pagination
      this.formSearch.patchValue({ page: t.data.user.current_page }); // Set control page
      this.loadingService.setLoading(false);
    });
  }

  changePage(currentPage) {
    if (this.formSearch.value.page !== currentPage) {
      this.formSearch.patchValue({ page: currentPage });
      this.getStaffs(this.formSearch.value);
    }
  }

  searchStaff() {
    let searchData = this.formSearch.value;
    delete searchData.page;
    this.getStaffs(searchData);
  }

  updateStatus({ status, id }: any, event: MatSlideToggleChange) {
    if (
      window.confirm(
        `${(status ? false : true)
          ? 'Xác nhận kích hoạt tài khoản?'
          : 'Xác nhận vô hiệu hóa khoản?'
        }`
      )
    ) {
      this.userService
        .activeUser({ status: status ? '0' : 1, id: id })
        .subscribe(
          (t) => {
            this.getStaffs(this.formSearch.value);
            this.toast.success(
              `${!status
                ? 'Kích hoạt tài khoản thành công'
                : 'Vô hiệu hóa khoản thành công'
              }`,
              'Thông báo',
              {
                timeOut: 3000,
                closeButton: true,
              }
            );
          },
          (f) => {
            this.loadingService.setLoading(false);
            event.source.checked = status ? true : false;
            this.toast.error(
              `${!status
                ? 'Kích hoạt tài khoản thất bại'
                : 'Vô hiệu hóa khoản thất bại'
              }`,
              'Thông báo',
              {
                timeOut: 3000,
                closeButton: true,
              }
            );
          }
        );
    } else {
      event.source.checked = status ? true : false;
    }
  }
}
