import { Component } from '@angular/core';
import { BankDataService } from '../bank-data.service';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-transactions',
  templateUrl: './display-transactions.component.html',
  styleUrls: ['./display-transactions.component.css']
})
export class DisplayTransactionsComponent {
  transactionsArr : BankTransaction[] = [];
  transactionTypeNames: string[] = [];
  balance : number = 0;



  constructor(private data_svc: BankDataService, private router_srv: Router) {
    this.transactionsArr = this.data_svc.transactionsArray;

    for (let optn in TransactionType)
          if (isNaN(Number(optn)))
            this.transactionTypeNames.push(optn);
  }

  ngOnInit(): void {
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("PageNotFound");
  }

  calculateCurrentBalance(index:number) : number { 
    this.balance = 0;   
    for (let i = 0; i <= index; i++) {
      if (this.transactionsArr[i].trnTyp == 0) {
        this.balance = this.transactionsArr[i].amount;
      }
      else if (this.transactionsArr[i].trnTyp == 1) {
        this.balance += this.transactionsArr[i].amount;
      }
      else if (this.transactionsArr[i].trnTyp == 2) {
        this.balance -= this.transactionsArr[i].amount;
      }
    }
    return this.balance;
  }

  delete(index:number) {
    this.transactionsArr.splice(index, 1); 
    this.data_svc.transactionsArray = this.transactionsArr;
    this.data_svc.saveTransactions();
  }
}
