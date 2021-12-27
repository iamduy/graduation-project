import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IProject,
  ProjectService,
  IRoomType,
  RoomTypeService,
} from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-room-type',
  templateUrl: './edit-room-type.component.html',
  styleUrls: ['./edit-room-type.component.css'],
})
export class EditRoomTypeComponent implements OnInit {
  submitted = false;
  isLoading = false;
  listProject: IProject[];
  errors: any = [];
  roomTypeUpdateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { roomType: IRoomType },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRoomTypeComponent>,
    private toastService: ToastrService,
    private projectService: ProjectService,
    private roomTypeService: RoomTypeService
  ) {
    this.roomTypeUpdateForm = this.fb.group({
      id: data.roomType.id ?? null,
      name: data.roomType.name,
      price: data.roomType.price,
      price_deposit: data.roomType.price_deposit,
      number_bed: data.roomType.number_bed ?? null,
      project_id: data.roomType.project_id ?? null,
    });
  }

  get F() {
    return this.roomTypeUpdateForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    this.roomTypeService.save(this.roomTypeUpdateForm.value).subscribe(
      (t) => {
        this.roomTypeService
          .getAll({ project_id: this.data.roomType.project_id })
          .subscribe((t) => {
            this.isLoading = false;
            this.dialogRef.close(t.data);
            this.toastService.success(
              'Cập nhật loại phòng thành công',
              'Thông báo',
              { timeOut: 3000, closeButton: true }
            );
          });
      },
      (f) => {
        this.isLoading = false;
        this.errors = f.errors;
        this.toastService.error(
          'Cập nhật loại phòng không thành công',
          'Thông báo',
          { timeOut: 3000, closeButton: true }
        );
      }
    );
  }
}
