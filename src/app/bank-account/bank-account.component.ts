import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountOwner } from '../account-owner';
import { BankDataService } from '../bank-data.service';
import { TransactionType, BankTransaction } from '../bank-transaction';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  currentAmount: number = 0;
  currentBalance: number = 0;
  transaction?: BankTransaction = undefined;
  currentTransactionType: TransactionType = 0;
  currentTransactionAsmachta: string = "";
  currentTransactionDateS: string = "";
  currentOwner: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);
  transactionTypeNames: string[] = [];
  lastActionFail: boolean = false
  editAccountOwner: boolean = false;

  constructor(private router_srv: Router, public data_svc: BankDataService) {
    //this.transaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAccount);
    this.currentBalance = data_svc.calculateBalance();

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);
  }

  doTransaction(): void {
    this.lastActionFail = false;
    if (this.currentAmount == null || this.currentAmount < 0) {
      showErrorFocus("סכום חייב להיות מספר לא שלילי", "amount");
      return;
    }
    if (this.currentTransactionType != 0 && this.currentAmount == 0) {
      showErrorFocus("סכום חייב להיות מספר חיובי", "amount");
      return;
    }
    if (this.currentTransactionAsmachta == null || this.currentTransactionAsmachta.trim() == "" || this.currentTransactionAsmachta.trim().length < 4) {
      showErrorFocus("אסמכתא לפחות 4 תוים", "asmachta");
      return;
    }
    if (this.currentTransactionDateS == "") {
      showErrorFocus("תאריך חובה", "taarich");
      return;
    }
    let achshav: Date = new Date();
    let typedDt: Date = new Date(this.currentTransactionDateS);
    if (typedDt > achshav) {
      showErrorFocus("תאריך מאוחר מהיום אסור", "taarich");
      return;
    }
    let index : number = this.data_svc.transactionsArray.length-1;
    if (index >= 0 && typedDt < this.data_svc.transactionsArray[index].trnDate) {
      showErrorFocus("תאריך לפני תאריך הקודם אסור", "taarich");
      return;
    }
    switch (this.currentTransactionType * 1) {
      case TransactionType.openAccount: 
      this.currentBalance = this.currentAmount;
      this.data_svc.transactionsArray = [];
        break;
      case TransactionType.deposit: 
      this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: 
      if ((this.currentBalance - this.currentAmount) < this.data_svc.getAccountDetails().limit) {
        this.lastActionFail = true;
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: alert('לא בחרת סוג פעולה');
        return;

    }
    this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDateS), this.currentTransactionAsmachta.trim(), this.currentTransactionType);
    this.data_svc.transactionsArray.push(this.transaction);
    this.data_svc.saveTransactions();
    console.log(this.data_svc.transactionsArray);
  }

  toString(): string {
    let ezer = `${this.transaction} into ${this.data_svc.getAccountDetails()}`;
    return ezer;
  }

  ngOnInit(): void {
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("PageNotFound");

  }

  logOut(): void {
    this.data_svc.userDisconnect();
    this.router_srv.navigateByUrl("/AccountLogin");
  }

}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}
