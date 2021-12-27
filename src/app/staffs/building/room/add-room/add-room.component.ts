import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IRoomType, LoadingService, RoomService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit {
  public roomAddForm: FormGroup;
  public roomTypes: IRoomType[];
  public errors: any;
  public submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { floor_id: number; roomTypes: IRoomType[] },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRoomComponent>,
    private roomService: RoomService,
    public toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.roomTypes = data.roomTypes;
    this.roomAddForm = this.fb.group({
      name: [null],
      floor_id: [this.data.floor_id],
      room_type_id: data?.roomTypes[0]?.id,
    });
  }

  get f() {
    return this.roomAddForm.controls;
  }

  ngOnInit(): void {}
  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.roomService.save(this.roomAddForm.value).subscribe(
      (t) => {
        this.dialogRef.close('reload');
        this.toast.success('Thêm mới phòng thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Thêm mới phòng thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
