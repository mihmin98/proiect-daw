import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from '../books/books.component';
import { Clients } from '../clients/clients.component';
import { Transactions } from '../transactions/transactions.component';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  private readonly endpoint = 'rental';

  rentals: Rentals[];
  rentalToUpdate: Rentals;

  showUpdateComponent = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getRentals();
  }

  getRentals() {
    this.apiService.get(this.endpoint).subscribe(data => {
      this.rentals = data.map((rental) => {
        return <Rentals>{
          id: rental.id,
          rentalDate: rental.rentalDate,
          returnDate: rental.returnDate,
          clientId: rental.clientId,
          client: rental.client,
          transactionId: rental.transactionId,
          transaction: rental.transaction,
          bookRentals: rental.bookRentals,
        };
      });
    });
  }

  getRental(id: number) {
    return this.apiService.get(this.endpoint + '/' + id);
  }

  addRental() {
    this.router.navigateByUrl('rentals/add');
  }

  deleteRental(rental: Rentals) {
    this.apiService.delete(this.endpoint + '/' + rental.id).subscribe(() => this.getRentals());
  }

  editRental(rental: Rentals) {
    this.showUpdateComponent = true;
    this.rentalToUpdate = rental;
  }

  updateRental(rental: Rentals) {
    this.apiService.put(this.endpoint, rental).subscribe(() => this.getRentals());
  }

  hideUpdateForm(value: boolean) {
    this.showUpdateComponent = false;
  }
}

export interface Rentals {
  id: number;
  rentalDate: Date;
  returnDate: Date;
  clientId: number;
  client: Clients;
  transactionId: number;
  transaction: Transactions;
  bookRentals: BookRentals[];
}

export interface BookRentals {
  id: number;
  bookId: number;
  rentalId: number;
}
