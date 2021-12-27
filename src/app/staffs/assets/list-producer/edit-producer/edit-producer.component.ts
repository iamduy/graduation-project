import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IProducer, LoadingService, ProducerService } from 'src/app/core';

@Component({
  selector: 'app-edit-producer',
  templateUrl: './edit-producer.component.html',
  styleUrls: ['./edit-producer.component.css'],
})
export class EditProducerComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formEdit: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { producer: IProducer },
    private producerService: ProducerService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<EditProducerComponent>
  ) {
    this.formEdit = this.fb.group({
      id: this.data?.producer?.id ?? null,
      name: this.data?.producer?.name ?? '',
    });
  }

  get f() {
    return this.formEdit.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.producerService.save(this.formEdit.value).subscribe(
      (t) => {
        this.producerService.getAll().subscribe(({ data }) => {
          this.dialog.close(data);
          this.toast.success('Cập nhật nhà sản xuất thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Cập nhật nhà sản xuất thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
