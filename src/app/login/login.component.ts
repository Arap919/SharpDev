import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AppResponse} from "../models/app-response";
import {LoggedinUser} from "../models/loggedin-user";
import {SnackbarService} from "../services/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  isSubmitted = false;

  constructor(
    private frmBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.formLogin = this.frmBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  login() {
    this.isSubmitted = true;

    this.authService.login(this.formLogin.value)
      .subscribe((data: LoggedinUser) => {
        this.authService.manageSession(data);
        this.authService.loginStatus.emit(true);
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['/']);
        }
      },   (error: AppResponse) => {
        this.snackbarService.show(error.status == 401 ? 'Invalid email or password' : error.status == 400 ? 'You must send email and password' : error.message, 'Close', {duration:99999});
      });
  }

}
