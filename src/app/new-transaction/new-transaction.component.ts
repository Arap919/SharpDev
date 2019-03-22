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
    this.getUserRecipients();
  }

  getUserRecipients() {
    this.apiService.postJSON('api/protected/users/list', {}).subscribe(data => {
      this.users = data;
    }, error => {
      console.log();
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

}
