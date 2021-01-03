import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  private readonly endpoint = 'transaction';

  transactions: Transactions[];
  transactionToUpdate: Transactions;

  showUpdateComponent = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.apiService.get(this.endpoint).subscribe(data => {
      this.transactions = data.map((transaction) => {
        return <Transactions>{
          id: transaction.id,
          bankAccount: transaction.bankAccount,
          amount: transaction.amount
        };
      });
    });
  }

  getTransaction(id: number) {
    return this.apiService.get(this.endpoint + '/' + id);
  }

  addTransaction() {
    this.router.navigateByUrl('transactions/add');
  }

  deleteTransaction(transaction: Transactions) {
    this.apiService.delete(this.endpoint + '/' + transaction.id).subscribe(() => this.getTransactions());
  }

  editTransaction(transaction: Transactions) {
    this.showUpdateComponent = true;
    this.transactionToUpdate = transaction;
  }

  updateTransaction(transaction: Transactions) {
    this.apiService.put(this.endpoint, transaction)
      .subscribe(() => this.getTransactions());
  }

  hideUpdateForm(value: boolean) {
    this.showUpdateComponent = false;
  }
}

export interface Transactions {
  id: number;
  bankAccount: string;
  amount: number;
}
