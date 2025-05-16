import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SendMoneyComponent } from './payment/send-money/send-money.component';
import { TransactionHistoryComponent } from './transactions/transaction-history/transaction-history.component';
import { PayDialogComponent } from './dialog/pay-dialog/pay-dialog.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'send-money',
    loadComponent: () =>
      import('./payment/send-money/send-money.component').then(
        (m) => m.SendMoneyComponent
      ),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import(
        './transactions/transaction-history/transaction-history.component'
      ).then((m) => m.TransactionHistoryComponent),
  },
  {
    path: 'pay-dialog',
    loadComponent: () =>
      import('./dialog/pay-dialog/pay-dialog.component').then(
        (m) => m.PayDialogComponent
      ),
  },
];
