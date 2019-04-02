import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpRequestService} from "../services/http-request.service";

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

  newTransact: FormGroup;
  users: any;
  digitPattern: string = '\\d+(\\.\\d{1,2})?';
  test: string = '^(?=test123)';

  constructor(
    public dialogRef: MatDialogRef<NewTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: HttpRequestService
  ) { }

  ngOnInit() {
    this.newTransact = this.fb.group({
      name: [this.data.transact ? this.data.transact.username : '', Validators.compose([Validators.required, Validators.pattern('((?!' + this.data.userName + ').)*')])],
      amount: [
        this.data.transact ? -(this.data.transact.amount) : '',
        Validators.compose([Validators.required, Validators.min(0), Validators.max(this.data.balance), Validators.pattern(this.digitPattern)])
      ]
    });
    this.newTransact.controls['name'].valueChanges.subscribe(next => {
      this.doFilter(next);
    });
  }

  create() {
    this.apiService.postJSON('api/protected/transactions', this.newTransact.value).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      console.log();
    });
  }

  close() {
    this.dialogRef.close();
  }

  doFilter(val) {
    if (val.length > 0)
      this.apiService.postJSON('api/protected/users/list', {filter: val}).subscribe(searchResult => {
        this.users = this.filter(searchResult);
      });
  }

  filter(values) {
    return values.filter(searchResultItem => {
      return searchResultItem.name.toLowerCase().includes(this.newTransact.value.name.toLocaleLowerCase());
    });
  }

}
