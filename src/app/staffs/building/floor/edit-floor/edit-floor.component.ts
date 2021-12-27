import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BuildingShare } from '../../building-share.service';
import {
  BuildingService,
  FloorService,
  IFloor,
  LoadingService,
} from 'src/app/core';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.css'],
})
export class EditFloorComponent implements OnInit {
  errors: any;
  submitted = false;
  isLoading = false;
  floorEditFrom: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { floor: IFloor },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditFloorComponent>,
    private toast: ToastrService,
    private floorService: FloorService,
    private loadingService: LoadingService,
    private buildingService: BuildingService
  ) {
    this.floorEditFrom = this.fb.group({
      id: data.floor?.id,
      name: data.floor?.name,
      total_area: data.floor?.total_area,
    });
  }

  get F() {
    return this.floorEditFrom.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.floorService.save(this.floorEditFrom.value).subscribe(
      (t) => {
        this.dialogRef.close('reload');
        this.toast.success('Cập nhật thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật không thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
