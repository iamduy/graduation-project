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
  IBuilding,
  BuildingService,
  FloorService,
  LoadingService,
} from 'src/app/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.css'],
})
export class AddFloorComponent implements OnInit {
  submitted = false;
  errors: any;
  listBuildings: IBuilding[];
  floorAddFrom: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { building: IBuilding },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFloorComponent>,
    private toastService: ToastrService,
    private floorService: FloorService,
    private loadingService: LoadingService
  ) {
    this.floorAddFrom = this.fb.group({
      name: '',
      total_area: '',
      building_id: data.building?.id,
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.floorService.save(this.floorAddFrom.value).subscribe(
      (t) => {
        this.dialogRef.close('reload');
        this.toastService.success('Thêm mới tầng mới thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toastService.error('Thêm mới tầng không thành công', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
