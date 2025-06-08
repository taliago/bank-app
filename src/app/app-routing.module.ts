import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DisplayTransactionsComponent } from './display-transactions/display-transactions.component';
import { ChangeBranchComponent } from './change-branch/change-branch.component';

const routes: Routes = [
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component: ChangePasswordComponent },
  { path: 'DisplayTransactions', component: DisplayTransactionsComponent },
  { path: 'ChangeBranch', component: ChangeBranchComponent },
  { path: '', redirectTo: '/AccountLogin', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
