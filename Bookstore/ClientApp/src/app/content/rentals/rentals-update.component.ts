import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from '../clients/clients.component';
import { Transactions } from '../transactions/transactions.component';
import { Books } from '../books/books.component';
import { BookRentals, Rentals } from './rentals.component';

@Component({
  selector: 'app-rentals-update',
  templateUrl: './rentals-update.component.html',
  styleUrls: ['./rentals-update.component.css']
})
export class RentalsUpdateComponent implements OnInit, OnChanges {

  public rentalForm = this.fb.group({
    id: ['', Validators.required],
    rentalDate: ['', Validators.required],
    returnDate: ['', Validators.required],
    clientIndex: ['', Validators.required],
    transactionIndex: ['', Validators.required],
    bookIndexes: ['', Validators.required]
  });

  books: Books[];
  clients: Clients[];
  transactions: Transactions[];

  @Input() rentalToUpdate: Rentals;
  @Input() showComponent: boolean;
  @Output() updatedRental = new EventEmitter<Rentals>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
    // Load book list
    this.apiService.get('book').subscribe(data => {
      this.books = data.map((book) => {
        return <Books>{
          id: book.id,
          title: book.title,
          publicationDate: book.publicationDate,
          price: book.price,
          authorId: book.authorId,
        };
      });
    });


    // Load client list
    this.apiService.get('client').subscribe(data => {
      this.clients = data.map((client) => {
        return <Clients>{ id: client.id, name: client.name, email: client.email };
      });
    });

    // Load transaction list
    this.apiService.get('transaction').subscribe(data => {
      this.transactions = data.map((transaction) => {
        return <Transactions>{
          id: transaction.id,
          bankAccount: transaction.bankAccount,
          amount: transaction.amount
        };
      });
    });
  }

  ngOnChanges() {
    let clientIndex: number;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === this.rentalToUpdate.clientId) {
        clientIndex = i;
        break;
      }
    }

    let transactionIndex: number;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.transactions[i].id === this.rentalToUpdate.transactionId) {
        transactionIndex = i;
        break;
      }
    }

    this.rentalForm.get('id').setValue(this.rentalToUpdate.id);
    this.rentalForm.get('rentalDate').setValue(this.rentalToUpdate.rentalDate);
    this.rentalForm.get('returnDate').setValue(this.rentalToUpdate.returnDate);
    this.rentalForm.get('clientIndex').setValue(clientIndex);
    this.rentalForm.get('transactionIndex').setValue(transactionIndex);
  }

  updateRental() {
    const bookRentals = Array<BookRentals>();
    for (const idx of this.rentalForm.value.bookIndexes) {
      bookRentals.push(<BookRentals>{ bookId: this.books[idx].id, rentalId: this.rentalForm.value.id });
    }

    const result = <Rentals>{
      id: this.rentalForm.value.id,
      rentalDate: this.rentalForm.value.rentalDate,
      returnDate: this.rentalForm.value.returnDate,
      clientId: this.clients[this.rentalForm.value.clientIndex].id,
      transactionId: this.transactions[this.rentalForm.value.transactionIndex].id,
      bookRentals: bookRentals
    };

    this.updatedRental.emit(result);
  }

  close() {
    this.hideForm.emit(false);
  }
}
