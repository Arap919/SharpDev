import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {HttpRequestService} from "../services/http-request.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserTransactions} from "../models/user-transactions";
import {NewTransactionComponent} from "../new-transaction/new-transaction.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  user: any;
  transactions: any = new MatTableDataSource<UserTransactions>();
  displayedColumns: string[] = ['username', 'date', 'amount', 'balance'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private apiService: HttpRequestService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.getListOfTransactions();
  }

  logout() {
    this.authService.logout();
  }

  getUserInfo() {
    this.apiService.getJSON('api/protected/user-info', {}).subscribe(data => {
      this.user = data['user_info_token'];
    }, error => {
      console.log(error);
    });
  }

  getListOfTransactions() {
    this.apiService.getJSON('api/protected/transactions', {}).subscribe(data => {
      this.transactions = new MatTableDataSource<UserTransactions>(data['trans_token'].sort(this.sortByDate));
      this.transactions.sort = this.sort;
      this.transactions.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }

  createTranzaction(row?: any) {
    const dialogRef = this.dialog.open(NewTransactionComponent, {
      height: '300px',
      width: '300px',
      data: row ? {balance: this.user.balance, transact: row, userName: this.user.name} : {balance: this.user.balance},
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getUserInfo();
      this.getListOfTransactions();
    });
  }

  sortByDate(d1, d2) {
    return new Date(d2.date).getTime() - new Date(d1.date).getTime();
  }

  ngAfterViewInit() {
    this.transactions.sort = this.sort;
  }

}
