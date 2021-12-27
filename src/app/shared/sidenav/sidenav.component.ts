import { Component, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HostListener } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import { AuthService } from 'src/app/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, DoCheck {
  mobileQuery: MediaQueryList;
  scrHeight: any;
  scrWidth: any;
  panelOpenState = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event = null): void {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  username: string;
  status: boolean;
  isStaff: boolean;
  Router = this.userService?.Router;
  currentUrl: string = '';

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private getStatus: StoreService,
    private auth: AuthService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.auth.isStaff.subscribe((res) => {
      this.isStaff = res;
    });
    this.auth.currentUser.subscribe((res) => {
      this.username = [res.last_name, res.first_name].join(' ');
    });
    this.currentUrl = this.router.url;
  }

  activeMenu(url: string) {
    this.currentUrl = url;
  }
  checkArrayUrl(url: string[]) {
    return url.find((item) => item == this.currentUrl);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngDoCheck() {
    this.status = this.getStatus.getStatus();
  }
}
