import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transactions } from './transactions.component';

@Component({
  selector: 'app-transactions-create',
  templateUrl: './transactions-create.component.html',
  styleUrls: ['./transactions-create.component.css']
})
export class TransactionsCreateComponent implements OnInit {

  public transactionForm = this.fb.group({
    bankAccount: ['', Validators.required],
    amount: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  createTransaction() {
    const transaction = <Transactions>{
      bankAccount: this.transactionForm.value.bankAccount,
      amount: this.transactionForm.value.amount,
    };

    this.apiService.post('transaction', transaction)
      .subscribe(result => { this.router.navigateByUrl('transactions'); });
  }
}
