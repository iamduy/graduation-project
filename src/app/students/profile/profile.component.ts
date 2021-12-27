import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as dayjs from 'dayjs'
import { AuthService } from 'src/app/core'
import { UserService } from 'src/app/core/services/user.service'
import { Routers } from 'src/app/utils'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }
  user: any
  createAt: string
  isLoading: boolean
  Router = this.userService.Router
  birth: string
  dateRange: string
  ngOnInit() {
    this.isLoading = true
    this.auth.currentUser.subscribe((user) => {
      if (user) this.isLoading = false
      this.user = user
      this.createAt = dayjs(user.created_at).format('DD-MM-YYYY hh:mm:ss')
      this.birth = dayjs(user.birth).format('DD-MM-YYYY')
      this.dateRange = dayjs(user?.student_info?.date_range).format('DD-MM-YYYY')


    })
  }
  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl(Routers.LOGIN);
    })
  }
}
