import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';

import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./models/auth-guard";
import {AuthService} from "./services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {HttpRequestService} from "./services/http-request.service";
import {TokenizedInterceptor} from "./models/tokenized-interceptor";
import {
  MatTableModule, MatToolbarModule, MatButtonModule, MatPaginatorModule,
  MatDialogModule, MatSelectModule, MatOptionModule, MatInputModule, MatAutocompleteModule, MatSnackBarModule,
  MatSortModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import {SnackbarService} from "./services/snackbar.service";

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      SignupComponent,
      NewTransactionComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatToolbarModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      MatSelectModule,
      MatOptionModule,
      MatInputModule,
      MatAutocompleteModule,
      MatSnackBarModule,
      MatSortModule,
      MatPaginatorModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: function tokenGetter() {
                  return sessionStorage.getItem('access_token');
              },
              whitelistedDomains: ['localhost:4200'],
              blacklistedRoutes: ['http://localhost:4200/sessions/create']
          }
      })
  ],
  entryComponents: [
      NewTransactionComponent
  ],
  providers: [
      AuthGuard,
      AuthService,
      HttpRequestService,
      SnackbarService,
      { provide: HTTP_INTERCEPTORS, useClass: TokenizedInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
