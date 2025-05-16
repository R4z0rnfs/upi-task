import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Transaction {
  date: Date;
  amount: number;
  recipientUpi: string;
  status: 'success' | 'failed';
}
@Component({
  selector: 'app-transaction-history',
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  displayedColumns: string[] = ['date', 'amount', 'recipientUpi', 'status'];
  dataSource = new MatTableDataSource<Transaction>();

  filterText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  transactions: Transaction[] = [];
  ngOnInit(): void {
    this.authService.transactionData().subscribe((response: any) => {
      this.transactions = response;
      // console.log(this.transactions);
      this.dataSource.data = this.transactions;
    });

    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.filterText.trim().toLowerCase();
  }

  resetFilters() {
    this.filterText = '';
    this.applyFilter();
  }

  createFilter(): (data: Transaction, filter: string) => boolean {
    return (data: Transaction, filter: string): boolean => {
      const searchTerm = filter.toLowerCase();
      return (
        data.recipientUpi.toLowerCase().includes(searchTerm) ||
        data.status.toLowerCase().includes(searchTerm) ||
        data.amount.toString().includes(searchTerm) ||
        new Date(data.date).toDateString().toLowerCase().includes(searchTerm)
      );
    };
  }

  onClose() {
    this.router.navigate(['/login']);
  }
}
