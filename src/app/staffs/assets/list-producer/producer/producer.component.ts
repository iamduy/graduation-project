import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProducer, LoadingService, ProducerService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

import { EditProducerComponent } from '../edit-producer/edit-producer.component';
import { CreateProducerComponent } from '../create-producer/create-producer.component';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css'],
})
export class ProducerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  producers: IProducer[] = [];

  constructor(
    public dialog: MatDialog,
    private producerService: ProducerService,
    private loadingService: LoadingService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.producerService.getAll().subscribe((t) => {
      this.producers = t.data;
      this.loadingService.setLoading(false);
    });
  }
  openDialogEdit(producer: IProducer): void {
    const dialogRef = this.dialog.open(EditProducerComponent, {
      width: '500px',
      disableClose: false,
      data: { producer: producer },
    });
    dialogRef.afterClosed().subscribe((producer: IProducer[] = []) => {
      if (producer[0]?.id) {
        this.producers = producer;
      }
      this.loadingService.setLoading(false);
    });
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateProducerComponent, {
      width: '500px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((producer: IProducer[] = []) => {
      if (producer[0]?.id) {
        this.producers = producer;
      }
      this.loadingService.setLoading(false);
    });
  }

  removeUnitAsset(producer: IProducer) {
    if (window.confirm('Xác nhận xóa')) {
      this.loadingService.setLoading(true);
      this.producerService.delete(producer?.id).subscribe(
        (t) => {
          this.producerService.getAll().subscribe((t) => {
            this.producers = t.data;
            this.loadingService.setLoading(false);
            this.toast.success('Xóa đơn vị tài sản thành công', 'Thông báo', {
              timeOut: 3000,
              closeButton: true,
            });
          });
        },
        (f) => {
          this.loadingService.setLoading(false);
          this.toast.error('Xóa đơn vị tài sản thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      );
    }
  }
}
