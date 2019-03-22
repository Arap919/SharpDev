import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoggedinUser} from "../models/loggedin-user";
import {AppResponse} from "../models/app-response";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;
  isSubmitted = false;

  constructor(private frmBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.formSignup = this.frmBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      passwordRepeat: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])]
    });
    this.formSignup.controls['passwordRepeat'].valueChanges.subscribe(next => {
      if (this.formSignup.value.password && next && this.formSignup.value.password != next)
        this.formSignup.controls['passwordRepeat'].setErrors({mismatch: true});
      else if (!next)
        this.formSignup.controls['passwordRepeat'].setErrors({required: true});
      else
        this.formSignup.controls['passwordRepeat'].setErrors(null);
    });
  }

  signup() {
    this.isSubmitted = true;

    this.authService.register(this.formSignup.value).subscribe((data: LoggedinUser) => {
      this.authService.manageSession(data);
      this.authService.loginStatus.emit(true);
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

}
