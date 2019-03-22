import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/internal/operators";
import {LoggedinUser} from "../models/loggedin-user";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get isLoggedIn() { return !!sessionStorage.getItem('access_token'); }
  public get getToken() { return sessionStorage.getItem('access_token'); }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(params): Observable<LoggedinUser> {
    return this.httpClient.post<LoggedinUser>('http://193.124.114.46:3001/sessions/create', params).pipe(tap(res => {
      sessionStorage.setItem('access_token', res.id_token);
    }));
  }

  register(params): Observable<LoggedinUser> {
    return this.httpClient.post<LoggedinUser>('http://193.124.114.46:3001/users', params).pipe(tap(res => {
      this.login(params);
    }));
  }

  logout() {
    this.redirectUrl = document.location.pathname;
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    this.loginStatus.emit(false);
  }

  public manageSession(data: LoggedinUser) {
    sessionStorage.setItem('access_token', data.id_token);
    sessionStorage.setItem('refresh', data.refresh_token);
    sessionStorage.setItem('user', JSON.stringify(data));
  }
}
