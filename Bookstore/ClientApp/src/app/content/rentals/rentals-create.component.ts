import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from '../clients/clients.component';
import { Transactions } from '../transactions/transactions.component';
import { Books } from '../books/books.component';
import { BookRentals, Rentals } from './rentals.component';
import { LoggerService } from '../../logger/logger.service';

@Component({
  selector: 'app-rentals-create',
  templateUrl: './rentals-create.component.html',
  styleUrls: ['./rentals-create.component.css']
})
export class RentalsCreateComponent implements OnInit {

  // book rental o fac cu un multi select
  public rentalForm = this.fb.group({
    rentalDate: ['', Validators.required],
    returnDate: ['', Validators.required],
    clientIndex: ['', Validators.required],
    transactionIndex: ['', Validators.required],
    bookIndexes: ['', Validators.required]
  });

  books: Books[];
  clients: Clients[];
  transactions: Transactions[];

  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router, private route: ActivatedRoute, private loggerService: LoggerService) { }

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

  createRental() {
    // POST rental
    const rental = <Rentals>{
      rentalDate: this.rentalForm.value.rentalDate,
      returnDate: this.rentalForm.value.returnDate,
      clientId: this.clients[this.rentalForm.value.clientIndex].id,
      transactionId: this.transactions[this.rentalForm.value.transactionIndex].id,
    };

    let rentalId: number;
    this.apiService.post('rental/returnId', rental)
      .subscribe(result => {
        rentalId = <number>result;

        // POST BookRentals
        const bookIndexes = <number[]>this.rentalForm.value.bookIndexes;

        for (const idx of bookIndexes) {
          const bookRental = <BookRentals>{
            bookId: this.books[idx].id,
            rentalId: rentalId
          };
          this.apiService.post('rental/addBook', bookRental)
            .subscribe(addresult => this.loggerService.log(addresult));
        }

        this.router.navigateByUrl('rentals');
      });
  }
}
