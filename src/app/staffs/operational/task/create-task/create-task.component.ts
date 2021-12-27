import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService, TaskService } from 'src/app/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  prefixData: any = [];
  taskCreateForm: FormGroup;
  submitted: boolean = false;
  errors: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { prefixData: any },
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.prefixData = this.data.prefixData;
    this.taskCreateForm = this.fb.group({
      title: '',
      desc: '',
      user_undertake_id: this.data?.prefixData?.staffs[0]?.id,
      priority: this.data?.prefixData?.priority_list[0].priority_id,
      date_start: '',
      date_end: '',
      status: 1,
    });
  }
  get f() {
    return this.taskCreateForm.controls;
  }
  ngOnInit(): void {}

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    let data = this.taskCreateForm.value;
    const format = 'yyyy-MM-dd hh:mm:ss';
    const locale = 'en-US';
    if (data.date_start) {
      data.date_start = formatDate(
        this.taskCreateForm.value.date_start,
        format,
        locale
      );
    }
    if (data.date_end) {
      data.date_end = formatDate(
        this.taskCreateForm.value.date_end,
        format,
        locale
      );
    }
    this.taskService.save(data).subscribe(
      (t) => {
        this.toast.success('Tạo công việc thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo công việc thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
