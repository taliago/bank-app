import { Injectable } from '@angular/core';
import { UserCredentials } from './user-credentials';
import * as CryptoJS from 'crypto-js';
import { BankTransaction } from './bank-transaction';
import { BankAccountDetails } from './bank-account-details';


const BANK_TRANSACTIONS_KY : string = "BANK_TRANSACTIONS";
const ENCRPT_DCRPT_PWD : string = "gfytyuy55432dfhj!";
const USER_CREDENTIALS_KY: string = "USER_CREDENTIALS";
const SALT: string = "mko)9Ijn8UhErtb";
const ACCOUNT_DETAILS_KY: string = "ACCOUNT_DETAILS";
@Injectable({
  providedIn: 'root'
})
export class BankDataService {

  currentUser?: UserCredentials;
  theUserCredentials: UserCredentials | null = null;// = new UserCredentials("siteAdmin@bigbank.com", "1234");
  transactionsArray : BankTransaction[] = [];
  balance : number = 0;
  accountDetails: BankAccountDetails;

  constructor() {
    this.loadFillUser();
    this.loadTransactions();
    this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
  }

  private loadFillUser(): void {
    const permanentStr: string | null = localStorage.getItem(USER_CREDENTIALS_KY);// the preferred syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!permanentStr) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitUserCredentialsData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        this.theUserCredentials = JSON.parse(permanentStr);
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitUserCredentialsData();
      }
  }

  isCredentialOk(inVlus: UserCredentials): boolean {
    return (inVlus.eml == this.theUserCredentials?.eml && this.encrptPwd(inVlus.pwd) == this.theUserCredentials.pwd);
  }

  encrptPwd(pwd: string): string {
    return CryptoJS.SHA3(pwd + SALT, { outputLength: 512 }).toString();
  }

  loadInitUserCredentialsData(): void {
    const t: string = JSON.stringify(new UserCredentials("siteAdmin@bigbank.com", this.encrptPwd("1234")));
    this.theUserCredentials = JSON.parse(t);
    this.updateUserStorage();
  }

  updateUserStorage(): void {
    const savedStr = JSON.stringify(this.theUserCredentials);
    try {
      localStorage.setItem(USER_CREDENTIALS_KY, savedStr); // the preferred syntax
      // same as localStorage[this.parmanentKy]=savedStr
    }
    catch (prblm) {
      alert("שמירת הנתונים נכשלה");
    }
  }

  setCurrentUsr(usr: UserCredentials): void {
    this.currentUser = usr;
  }

  userSignedIn(): boolean {
    return this.currentUser != undefined;
  }

  userDisconnect(): void {
    this.currentUser = undefined;
  }

  isPwdOk(typdPwd: string): boolean {
    return (this.theUserCredentials?.pwd + "" == this.encrptPwd(typdPwd));
  }

  changePwd(nwPwd: string): void {
    if (this.theUserCredentials) {
      this.theUserCredentials.pwd = this.encrptPwd(nwPwd);
    }
    localStorage.setItem(USER_CREDENTIALS_KY, JSON.stringify(this.theUserCredentials));
  }

  calculateBalance() : number {
    this.balance = 0;
    for (let i = 0; i < this.transactionsArray.length; i++) {
      if (this.transactionsArray[i].trnTyp == 0) {
        this.balance = this.transactionsArray[i].amount;
      }
      else if (this.transactionsArray[i].trnTyp == 1) {
        this.balance += this.transactionsArray[i].amount;
      }
      else if (this.transactionsArray[i].trnTyp == 2) {
        this.balance -= this.transactionsArray[i].amount;
      }
    }
    return this.balance;
  }

  saveTransactions(): void {
    const encryptedStr = CryptoJS.AES.encrypt(JSON.stringify(this.transactionsArray), ENCRPT_DCRPT_PWD).toString();
    try {
      localStorage.setItem(BANK_TRANSACTIONS_KY, encryptedStr);
    }
    catch (prblm) {
      alert("שמירת הנתונים נכשלה");
    }
  }

  private loadTransactions(): void {
    const permanentStr: string | null = localStorage.getItem(BANK_TRANSACTIONS_KY);// the preferred syntax
    if (!permanentStr) { //אין אחסון של נתונים בלוקל סטורג
      this.transactionsArray = [];
      this.updateUserStorage();    
    }
    else {
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        const decryptedStr = CryptoJS.AES.decrypt(permanentStr, ENCRPT_DCRPT_PWD).toString(CryptoJS.enc.Utf8);
        this.transactionsArray = JSON.parse(decryptedStr);
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.transactionsArray = [];
        this.updateUserStorage();        
      }
    }
  }
  
  getAccountDetails() : BankAccountDetails {
    return this.accountDetails;
  }

  saveAccountDetails(): void {
    try {
      localStorage.setItem(ACCOUNT_DETAILS_KY, JSON.stringify(this.accountDetails));
    }
    catch (prblm) {
      alert("שמירת הנתונים נכשלה");
    }
  }

  loadAccountDetails(): void {
    const permanentStr: string | null = localStorage.getItem(ACCOUNT_DETAILS_KY);
    if (permanentStr) {
      try {
        this.accountDetails = JSON.parse(permanentStr);
      } catch (prblm) {
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
        this.saveAccountDetails();
      }
    } else {
      this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
      this.saveAccountDetails();
    }
  }


}
