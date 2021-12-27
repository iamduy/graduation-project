import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTypeUserComponent } from '../create-type-user/create-type-user.component';
import { EditTypeUserComponent } from '../edit-type-user/edit-type-user.component';
import { RoleService } from 'src/app/core/services/specifics/role.service';
import { IRole, LoadingService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-type-user',
  templateUrl: './type-user.component.html',
  styleUrls: ['./type-user.component.css'],
})
export class TypeUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'desc', 'action'];
  roles: IRole[] = [];

  constructor(
    public dialog: MatDialog,
    private roleService: RoleService,
    private loadingService: LoadingService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.roleService.getAllRoles().subscribe((t) => {
      this.roles = t.data;
      this.loadingService.setLoading(false);
    });
  }
  openDialogEdit(role: IRole): void {
    const dialogRef = this.dialog.open(EditTypeUserComponent, {
      width: '500px',
      disableClose: false,
      data: { role: role },
    });
    dialogRef.afterClosed().subscribe((roles: IRole[] = []) => {
      if (roles[0]?.id) {
        this.roles = roles;
      }
      this.loadingService.setLoading(false);
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateTypeUserComponent, {
      width: '500px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((roles: IRole[] = []) => {
      if (roles[0]?.id) {
        this.roles = roles;
      }
      this.loadingService.setLoading(false);
    });
  }

  removeUnitAsset(role: IRole) {
    if (window.confirm('Xác nhận xóa')) {
      this.loadingService.setLoading(true);
      this.roleService.deleteRole(role?.id).subscribe(
        (t) => {
          this.roleService.getAllRoles().subscribe((t) => {
            this.roles = t.data;
            this.loadingService.setLoading(false);
            this.toast.success('Xóa chức vụ thành công', 'Thông báo', {
              timeOut: 3000,
              closeButton: true,
            });
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa chức vụ thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  openDialogDetail(role: IRole) {
    this.loadingService.setLoading(true);
    this.roleService.getDetailById(role?.id).subscribe(
      (t) => {
        this.loadingService.setLoading(false);
        const dialogRef = this.dialog.open(DetailComponent, {
          width: '700px',
          disableClose: false,
          data: { permissions: t.data },
        });
      },
      (f) => {
        this.loadingService.setLoading(false);
      }
    );
  }
}
