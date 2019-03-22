import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import { throwError } from 'rxjs';
import {SnackbarService} from "./snackbar.service";
import { map } from 'rxjs/operators';

const apiUrl = 'http://193.124.114.46:3001/';

@Injectable()
export class HttpRequestService {

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  public getJSON(url: string, params: any) {
    return this.http.get(apiUrl + url, params)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  postJSON(url: string, params: any) {
    return this.http.post(apiUrl + url, params)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status != 200)
      this.snackbarService.show(error.message, 'Close', {duration: 10000});
    return throwError(error);
  }
}
