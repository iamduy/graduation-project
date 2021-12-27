import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService, TaskService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DetailTaskComponent } from '../detail-task/detail-task.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask } from 'src/app/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  prefixData: any = {};
  displayedColumns: string[] = [
    'id',
    'title',
    'status',
    'priority',
    'user_undertake_id',
    'action',
  ];
  tasks: ITask[] = [];
  fromSearch: FormGroup;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private loadingService: LoadingService,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.fromSearch = this.fb.group({
      title: '',
      priority: '',
      date_start: '',
      date_end: '',
      page: '',
    });
  }

  get fs() {
    return this.fromSearch.controls;
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.taskService.create().subscribe((t) => {
      this.prefixData = t.data;
    });
    this.getTasks();
  }

  openDialogDetail(task: ITask): void {
    const dialogRef = this.dialog.open(DetailTaskComponent, {
      width: '900px',
      disableClose: false,
      data: { task: task },
    });
  }
  openDialogEdit(task: ITask): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '700px',
      disableClose: false,
      data: { prefixData: this.prefixData, task: task },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getTasks(this.fromSearch.value);
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '700px',
      disableClose: false,
      data: { prefixData: this.prefixData },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == 'isReload') {
        this.getTasks(this.fromSearch.value);
      }
    });
  }
  removeTask(task: ITask) {
    if (window.confirm('Xác nhận xóa?')) {
      this.loadingService.setLoading(true);
      this.taskService.delete(task.id).subscribe(
        (t) => {
          this.getTasks(this.fromSearch.value);
          this.toast.success('Xóa công việc thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa công việc thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }

  lastPage: any = null; // Trang cuối( = tổng số trang)
  totalItems: number = 0; // Số item/page

  getTasks(searchData: any = null) {
    if (searchData !== null) {
      for (let key in searchData) {
        if (!searchData[key]) {
          delete searchData[key];
        }
      }
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      if (searchData.date_start) {
        searchData.date_start = formatDate(
          searchData.date_start,
          format,
          locale
        );
        searchData.date_start = searchData.date_start + ' 00:00:00';
      }
      if (searchData.date_end) {
        searchData.date_end = formatDate(searchData.date_end, format, locale);
        searchData.date_end = searchData.date_end + ' 23:59:59';
      }
    }
    this.loadingService.setLoading(true);
    this.taskService.getAll(searchData).subscribe((t) => {
      this.tasks = t.data?.tasks?.data; // Set data cho table
      this.lastPage = t.data?.tasks?.last_page; // set last_page cho pagination
      this.totalItems = t.data?.tasks?.total; // Set tổng item cho pagination
      this.fromSearch.patchValue({ page: t.data?.tasks?.current_page }); // Set control page
      this.loadingService.setLoading(false);
    });
  }

  changePage(currentPage) {
    if (this.fromSearch.value.page !== currentPage) {
      this.fromSearch.patchValue({ page: currentPage });
      this.getTasks(this.fromSearch.value);
    }
  }

  searchTask() {
    let searchData = this.fromSearch.value;
    delete searchData.page;
    this.getTasks(searchData);
  }
}
