import { Component } from '@angular/core';
import { BankDataService } from '../bank-data.service';

@Component({
  selector: 'app-change-branch',
  templateUrl: './change-branch.component.html',
  styleUrls: ['./change-branch.component.css']
})
export class ChangeBranchComponent {
  bankName : string;
  branchName : string;
  branchNum : number;
  accountNum : number;
  jobDone: boolean = false;

  constructor(private data_svc: BankDataService) {
    this.bankName = this.data_svc.getAccountDetails().bankName;
    this.branchName = this.data_svc.getAccountDetails().branchName;
    this.branchNum = this.data_svc.getAccountDetails().branchNumber;
    this.accountNum = this.data_svc.getAccountDetails().accountNumber;
  }

  update() : void {
    if (this.branchName.trim() == "" || this.branchNum == null) {
      alert("אחד או יותר משדות הקלט ריקים");
      return;
    }
    this.data_svc.accountDetails.branchName = this.branchName;
    this.data_svc.accountDetails.branchNumber = this.branchNum;
    this.jobDone = true;
  }
}
