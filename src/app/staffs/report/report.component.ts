import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  Router = this.userService.Router;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
