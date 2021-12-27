import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string;
  isAuth: boolean;
  isStaff: boolean;

  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.auth.getUser()
  }
}
