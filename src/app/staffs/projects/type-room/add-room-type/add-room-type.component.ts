import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { RoomTypeService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.css'],
})
export class AddRoomTypeComponent implements OnInit {
  submitted = false;
  isLoading = false;
  errors: any = [];
  roomTypeAddForm = this.fb.group({
    name: '',
    price: null,
    price_deposit: null,
    number_bed: null,
    project_id: null,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { project_id: any },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRoomTypeComponent>,
    private toastService: ToastrService,
    private roomTypeService: RoomTypeService
  ) {}

  ngOnInit(): void {
    this.roomTypeAddForm.patchValue({ project_id: this.data.project_id });
  }

  get F() {
    return this.roomTypeAddForm.controls;
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    this.roomTypeService.save(this.roomTypeAddForm.value).subscribe(
      (t) => {
        this.roomTypeService
          .getAll({ project_id: this.data.project_id })
          .subscribe((t) => {
            this.dialogRef.close(t.data);
            this.isLoading = false;
          });
        this.toastService.success('Thêm loại phòng thành công', 'Thông báo', {
          timeOut: 4000,
          closeButton: true,
        });
      },
      (f) => {
        this.isLoading = false;
        this.errors = f.errors;
        this.toastService.error(
          'Thêm loại phòng không thành công',
          'Thông báo',
          { timeOut: 4000, closeButton: true }
        );
      }
    );
  }
}
