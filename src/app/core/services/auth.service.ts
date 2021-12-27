import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { ApiService, JwtService } from './commons';
import { Routers } from '../../utils';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>({} as {});
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isStaffSubject = new ReplaySubject<boolean>(1);
  public isStaff = this.isStaffSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  /**
   * Tự động gửi yêu cầu lên server để lấy thông tin user về
   */
  getUser() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth/user-profile').subscribe(
        (res) => {
          this.setUser(res.data);
        },
        (err) => {
          this.clearAuth();
        }
      );
    } else {
      this.clearAuth();
    }
  }

  login(v: any): Observable<any> {
    return this.apiService.post('/auth/login', v).pipe(
      map((user) => {
        this.saveUser(user);
        return user;
      })
    );
  }

  register(v: any): Observable<any> {
    return this.apiService.post('/auth/student/register', v);
  }

  logout(): Observable<any> {
    return this.apiService.post('/auth/logout').pipe(
      map(() => {
        this.clearAuth();
      })
    );
  }

  setUser(user: any) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    this.isStaffSubject.next(user?.user_type == 1 ? true : false);
    this.router.url === '/' && this.navigateByUserType();
  }

  /**
   * Lưu token vào localStorage, user'info vào state
   * Điều hướng có mục đích khi đăng nhập thành công
   *
   * @param res
   */
  saveUser(res: any) {
    this.jwtService.saveToken(res.access_token);
    this.setUser(res.user);
    this.navigateByUserType();
  }

  /**
   * Đưa các state trở về lúc chưa đăng nhập + xóa Token
   * Điều hướng về trang login
   */
  clearAuth() {
    window.localStorage.clear();
    this.currentUserSubject.next({} as '');
    this.isAuthenticatedSubject.next(false);
    this.isStaffSubject.next(false);

  }

  /**
   * Điều hướng theo điều điện isStaff
   */
  navigateByUserType(): void {
    this.isStaff.subscribe((isStaff) => {
      if (isStaff) {
        this.router.navigateByUrl(Routers.STAFF);
      } else {
        this.router.navigateByUrl(Routers.STUDENT);
      }
    });
  }

  /**
   * Điều hướng theo điều kiện isAuthenticated (đã đăng nhập hay chưa)
   */
  navigateAuth() {
    this.isAuthenticated.subscribe((isAuth) => {
      if (isAuth) {
        this.navigateByUserType();
      } else {
        this.router.navigateByUrl(Routers.LOGIN);
      }
    });
  }

  getProfile(): Observable<IUser> {
    return this.apiService.get('/auth/user-profile');
  }

  changePassword(v: any): Observable<any> {
    return this.apiService.post('/auth/change-pass', v);
  }

  updateProfile(data: any): Observable<any> {
    return this.apiService.put('/auth/user-update-profile', data).pipe(
      tap((t) => {
        if (t?.data?.id) {
          this.currentUserSubject.next(t.data);
        }
      })
    );
  }
}
