import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BedService, LoadingService, RoomService } from 'src/app/core';
import { BuildingShare } from '../../building-share.service';

@Component({
  selector: 'app-edit-bed',
  templateUrl: './edit-bed.component.html',
  styleUrls: ['./edit-bed.component.css'],
})
export class EditBedComponent implements OnInit {
  editFrom: FormGroup;
  bedNameControl = new FormControl();
  errors: any;
  submitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { bed: any; floor_id: any },
    private bedService: BedService,
    private fb: FormBuilder,
    public toast: ToastrService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<EditBedComponent>
  ) {
    this.editFrom = this.fb.group({
      id: this.data.bed.id,
      room_id: this.data.bed.room_id,
      name: this.data.bed.name,
    });
  }

  get f() {
    return this.editFrom.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.bedService.save(this.editFrom.value).subscribe(
      (t) => {
        this.dialogRef.close('reload');
        this.toast.success('Cập nhật giường thành công', 'Thông báo', {
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
