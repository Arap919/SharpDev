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

  constructor(
    public dialogRef: MatDialogRef<NewTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: HttpRequestService
  ) { }

  ngOnInit() {
    this.newTransact = this.fb.group({
      name: [this.data.transact ? this.data.transact.username : '', Validators.required],
      amount: [this.data.transact ? -(this.data.transact.amount) : '', Validators.compose([Validators.required, Validators.max(this.data.balance)])]
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
    this.apiService.postJSON('api/protected/users/list', {name: val}).subscribe(searchResult => {
      this.users = this.filter(searchResult);
    });
  }

  filter(values) {
    return values.filter(searchResultItem => {
      return searchResultItem.name.toLowerCase().includes(this.newTransact.value.name.toLocaleLowerCase());
    });
  }

}
