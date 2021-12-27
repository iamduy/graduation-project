import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BedService, LoadingService, RoomService } from 'src/app/core';
import { BuildingShare } from '../../building-share.service';
@Component({
  selector: 'app-add-bed',
  templateUrl: './add-bed.component.html',
  styleUrls: ['./add-bed.component.css'],
})
export class AddBedComponent implements OnInit {
  bedNameControl = new FormControl('');
  addForm: FormGroup;
  errors: any;
  submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { room_id: any; floor_id: any },
    public dialogRef: MatDialogRef<AddBedComponent>,
    public fb: FormBuilder,
    private bedSerive: BedService,
    public toast: ToastrService,
    private loadingService: LoadingService
  ) {
    this.addForm = this.fb.group({
      name: [''],
      room_id: [this.data.room_id],
    });
  }

  ngOnInit() {}

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.loadingService.setLoading(true);
    this.submitted = true;
    this.bedSerive.save(this.addForm.value).subscribe(
      (t) => {
        this.submitted = true;
        this.dialogRef.close('reload');
        this.toast.success('Thêm mới giường thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Thêm mới giường thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
