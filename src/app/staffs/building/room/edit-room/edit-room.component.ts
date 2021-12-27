import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRoom, IRoomType, LoadingService, RoomService } from 'src/app/core';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit {
  public roomUpdateForm: FormGroup;

  public errors: any;
  public submitted = false;
  public roomTypes: IRoomType[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { room: IRoom; roomTypes: IRoomType[] },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRoomComponent>,
    private roomService: RoomService,
    public toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.roomTypes = data.roomTypes;
    this.roomUpdateForm = this.fb.group({
      id: [data.room.id],
      name: [data.room.name],
      floor_id: [data.room.floor_id],
      room_type_id: [data.room.room_type_id],
    });
  }

  get f() {
    return this.roomUpdateForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    let currentCountBed = this.data.room?.beds?.length;
    let maxBed = this.data.roomTypes.filter(
      (item) => item.id == this.roomUpdateForm.value.room_type_id
    )[0].number_bed;
    if (currentCountBed > maxBed) {
      this.toast.error(
        `Không thể cập nhật loại phòng có số giường tối đa nhỏ hơn số giường hiện có`,
        'Thông báo',
        {
          timeOut: 4000,
          closeButton: true,
        }
      );
    } else {
      this.submitted = true;
      this.loadingService.setLoading(true);
      this.roomService.save(this.roomUpdateForm.value).subscribe(
        (t) => {
          this.dialogRef.close('reload');
          this.toast.success('Cập nhật phòng thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        },
        (f) => {
          this.errors = f.errors;
          this.loadingService.setLoading(false);
          this.toast.error('Cập nhật phòng thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }
}
