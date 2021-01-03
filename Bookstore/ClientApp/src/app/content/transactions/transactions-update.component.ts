import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Transactions } from './transactions.component';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-transactions-update',
  templateUrl: './transactions-update.component.html',
  styleUrls: ['./transactions-update.component.css']
})
export class TransactionsUpdateComponent implements OnInit, OnChanges {

  public transactionForm = this.fb.group({
    id: ['', Validators.required],
    bankAccount: ['', Validators.required],
    amount: ['', Validators.required],
  });

  @Input() transactionToUpdate: Transactions;
  @Input() showComponent: boolean;
  @Output() updatedTransaction = new EventEmitter<Transactions>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.transactionForm.get('id').setValue(this.transactionToUpdate.id);
    this.transactionForm.get('bankAccount').setValue(this.transactionToUpdate.bankAccount);
    this.transactionForm.get('amount').setValue(this.transactionToUpdate.amount);
  }

  updateTransaction() {
    const result = <Transactions>{
      id: this.transactionForm.value.id,
      bankAccount: this.transactionForm.value.name,
      amount: this.transactionForm.value.amount,
    };
    this.updatedTransaction.emit(result);
  }

  close() {
    this.hideForm.emit(false);
  }
}
