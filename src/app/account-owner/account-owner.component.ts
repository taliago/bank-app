import { Component, Input, OnInit } from '@angular/core';
import { AccountOwner } from '../account-owner';


@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  @Input() owner:AccountOwner=new AccountOwner();
  @Input() edit?:boolean;

  constructor() { 
   }

  ngOnInit(): void {
  }

}
