import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRole, LoadingService } from 'src/app/core';
import { RoleService } from 'src/app/core/services/specifics/role.service';
@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.css'],
})
export class DelegationComponent implements OnInit {
  prefixData: any = [];
  afterData: any = [];
  roles: IRole[] = [];
  currentRoleId: number;
  controlCheck: FormControl;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.controlCheck = this.fb.control([]);
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.roleService.getAllPositions().subscribe(
      (t) => {
        this.prefixData = t.data;
      },
      (f) => {
        this.loadingService.setLoading(false);
      }
    );
    this.roleService.getAllRoles().subscribe(
      (t) => {
        if (t.data[0]?.id) {
          this.roles = t.data;
          this.getAfterData(t.data[0]?.id);
        } else {
          this.loadingService.setLoading(false);
        }
      },
      (f) => {
        this.loadingService.setLoading(false);
      }
    );
  }

  getAfterData(id: any) {
    this.currentRoleId = id;
    this.roleService.getPositionsByRole(id).subscribe(
      (t) => {
        this.afterData = t.data;
        let checkBoxValues: any = [];
        this.afterData.forEach((module: any) => {
          module.tables.forEach((table: any) => {
            table.permissions.forEach((per: any) => {
              checkBoxValues.push(per.id);
            });
          });
        });
        this.controlCheck.setValue(checkBoxValues);
        this.loadingService.setLoading(false);
      },
      (f) => {
        this.loadingService.setLoading(false);
      }
    );
  }

  checked(permissionID: any) {
    let result = this.controlCheck.value.filter(
      (perId: any) => perId == permissionID
    );
    return result[0] ? true : false;
  }

  changeChecked(event: any) {
    let condition = event.checked;
    let id = event.source.value;
    let permissions = this.controlCheck.value;
    if (condition == true) {
      permissions.push(id);
    } else {
      permissions = permissions.filter((item: any) => item != id);
    }
    this.controlCheck.patchValue(permissions);
  }

  checkAllOfTable(persOfTable: any = [], event: any) {
    let perControl = this.controlCheck.value;

    let perOfTableId: any = [];
    persOfTable.forEach((item: any) => {
      perOfTableId.push(item.id);
    });

    if (event.checked) {
      perControl = Array.from(new Set(perControl.concat(perOfTableId)));
    } else {
      perControl = perControl.filter(
        (item: any) => !perOfTableId.includes(item)
      );
    }
    this.controlCheck.patchValue(perControl);
  }

  changeRole(roleId: any) {
    this.loadingService.setLoading(true);
    this.getAfterData(roleId);
  }

  savePosition() {
    this.loadingService.setLoading(true);
    this.roleService
      .savePerOfRole({
        role_id: this.currentRoleId,
        permission_id: this.controlCheck.value,
      })
      .subscribe(
        (t) => {
          if (t.data[0]?.id) {
            this.afterData = t.data;
            this.loadingService.setLoading(false);
          } else {
            this.loadingService.setLoading(false);
          }
          this.toast.success('Cập nhật thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Cập nhật thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
  }
}
