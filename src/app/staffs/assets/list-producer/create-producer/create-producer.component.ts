import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService, ProducerService } from 'src/app/core';

@Component({
  selector: 'app-create-producer',
  templateUrl: './create-producer.component.html',
  styleUrls: ['./create-producer.component.css'],
})
export class CreateProducerComponent implements OnInit {
  submitted: boolean = false;
  errors: any = [];
  formAdd: FormGroup;

  constructor(
    private producerService: ProducerService,
    private toast: ToastrService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<CreateProducerComponent>
  ) {
    this.formAdd = this.fb.group({
      name: '',
    });
  }

  get f() {
    return this.formAdd.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loadingService.setLoading(true);
    this.producerService.save(this.formAdd.value).subscribe(
      (t) => {
        this.producerService.getAll().subscribe(({ data }) => {
          this.dialog.close(data);
          this.toast.success('Tạo mới nhà sản xuất thành công', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        });
      },
      (f) => {
        this.errors = f.errors;
        this.loadingService.setLoading(false);
        this.toast.error('Tạo mới nhà sản xuất thất bại', 'Thông báo', {
          timeOut: 3000,
          closeButton: true,
        });
      }
    );
  }
}
