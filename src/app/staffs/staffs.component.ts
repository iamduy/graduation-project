import { Component, OnInit } from '@angular/core';
import { AuthService, IUser, LoadingService } from '../core';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css'],
})
export class StaffsComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadingService.loading.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
