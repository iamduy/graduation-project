import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ITask, LoadingService, TaskService } from 'src/app/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  prefixData: any = [];
  taskEditForm: FormGroup;
  formStatus: FormGroup;
  task: ITask = {} as ITask;

  submitted: boolean = false;
  submittedStatus: boolean = false;
  errors: any = [];
  statusErrors: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { prefixData: any; task: ITask },
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    private toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.prefixData = data.prefixData;
    this.setForm(data.task);
  }

  setForm(task: ITask) {
    this.task = task;
    this.taskEditForm = this.fb.group({
      id: task.id,
      title: task.title,
      priority: task.priority,
      date_start: new Date(task.date_start).toISOString(),
      date_end: new Date(task.date_end).toISOString(),
      desc: task.desc,
      user_undertake_id: task.user_undertake_id,
    });

    this.formStatus = this.fb.group({
      id: task.id,
      status: task.status,
    });
  }

  get f() {
    return this.taskEditForm.controls;
  }

  get FormStatus() {
    return this.formStatus.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    let data = this.taskEditForm.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    data.date_start = formatDate(data.date_start, format, locale) + ' 00:00:00';
    data.date_end = formatDate(data.date_end, format, locale) + ' 23:59:59';

    this.taskService.save(this.taskEditForm.value).subscribe(
      (t) => {
        this.toast.success('Cập nhật công việc thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật công việc thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }

  onUpdateStatus() {
    this.loadingService.setLoading(true);
    this.submittedStatus = true;
    this.taskService.saveStatus(this.formStatus.value).subscribe(
      (t) => {
        this.setForm(t.data);
        this.toast.success('Cập nhật trạng thái thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
        this.dialogRef.close('isReload');
      },
      (f) => {
        this.statusErrors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật trạng thái thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
