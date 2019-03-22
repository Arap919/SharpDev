import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  show(msg: string, action: string, params: any) {
    let config = new MatSnackBarConfig();
    if (!isNaN(params))
      config.duration = params;
    else {
      Object.keys(params).forEach(name => {
        config[name] = params[name];
      });
    }
    let snackBarRef = this.snackBar.open(msg, action, config);
    return snackBarRef;
  }
}
