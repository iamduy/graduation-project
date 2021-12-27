import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-wel',
  templateUrl: './wel.component.html',
  styleUrls: ['./wel.component.css'],
})
export class WelComponent implements OnInit {
  constructor(private authService: AuthService) {}
  hasModule: boolean = false;

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      let module = data.permission_data.module ?? [];
      let permissions = data.permission_data.permissions ?? [];
      let tables = data.permission_data.tables ?? [];
      if (module.length > 0) {
        this.hasModule = true;
      } else {
        this.hasModule = false;
      }
    });
  }
}
