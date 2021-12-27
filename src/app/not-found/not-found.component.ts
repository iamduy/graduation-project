import { Component, OnInit } from '@angular/core'
import { AuthService } from '../core'
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private auth: AuthService) { }
  userType: number
  ngOnInit() {
    this.auth.currentUser.subscribe(item => {
      this.userType = item?.user_type
    })
  }

}
