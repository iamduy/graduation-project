import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMaintenanceComponent } from '../edit-maintenance/edit-maintenance.component';
import { CreateMaintenanceComponent } from '../create-maintenance/create-maintenance.component';
import { DetailMaintenanceComponent } from '../detail-maintenance/detail-maintenance.component';
import { IMaintenance, LoadingService, MaintainService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-maintenance',
  templateUrl: './list-maintenance.component.html',
  styleUrls: ['./list-maintenance.component.css'],
})
export class ListMaintenanceComponent implements OnInit {
  prefixData: any = {};
  displayedColumns: string[] = [
    'id',
    'name',
    'status',
    'type',
    'user_undertake_id',
    'action',
  ];
  maintains: IMaintenance[] = [];
  fromSearch: FormGroup;

  constructor(
    public dialog: MatDialog,
    private maintainService: MaintainService,
    private loadingService: LoadingService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.fromSearch = this.fb.group({
      name: '',
      type: '',
      user_undertake_id: '',
      status: '',
      page: '',
    });
  }

  get fs() {
    return this.fromSearch.controls;
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.maintainService.create().subscribe((t) => {
      this.prefixData = t.data;
    });
    this.getMaintains();
  }

  openDialogDetail(maintain: IMaintenance): void {
    const dialogRef = this.dialog.open(DetailMaintenanceComponent, {
      width: '900px',
      disableClose: false,
      data: { maintain: maintain },
    });
  }
  openDialogEdit(maintain: IMaintenance): void {
    const dialogRef = this.dialog.open(EditMaintenanceComponent, {
      width: '700px',
      disableClose: false,
      data: { prefixData: this.prefixData, maintain: maintain },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getMaintains(this.fromSearch.value);
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateMaintenanceComponent, {
      width: '700px',
      disableClose: false,
      data: { prefixData: this.prefixData },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getMaintains(this.fromSearch.value);
      }
    });
  }
  removeMaintain(maintain: IMaintenance) {
    if (window.confirm('Xác nhận xóa?')) {
      this.loadingService.setLoading(true);
      this.maintainService.delete(maintain.id).subscribe(
        (t) => {
          this.getMaintains(this.fromSearch.value);
          this.toast.success('Xóa nhiệm vụ thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa nhiệm vụ thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  lastPage: any = null; // Trang cuối( = tổng số trang)
  totalItems: number = 0; // Số item/page

  getMaintains(searchData: any = null) {
    if (searchData !== null) {
      for (let key in searchData) {
        if (!searchData[key]) {
          delete searchData[key];
        }
      }
    }
    this.loadingService.setLoading(true);
    this.maintainService.getAll(searchData).subscribe((t) => {
      this.maintains = t.data.data; // Set data cho table
      this.lastPage = t.data.last_page; // set last_page cho pagination
      this.totalItems = t.data.total; // Set tổng item cho pagination
      this.fromSearch.patchValue({ page: t.data.current_page }); // Set control page
      this.loadingService.setLoading(false);
    });
  }

  changePage(currentPage) {
    if (this.fromSearch.value.page !== currentPage) {
      this.fromSearch.patchValue({ page: currentPage });
      this.getMaintains(this.fromSearch.value);
    }
  }

  searchMaintain() {
    let searchData = this.fromSearch.value;
    delete searchData.page;
    this.getMaintains(searchData);
  }
}
