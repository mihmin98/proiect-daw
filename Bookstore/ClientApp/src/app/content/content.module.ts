import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatListModule, MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';


import { AuthorsComponent } from './authors/authors.component';
import { AuthorsCreateComponent } from './authors/authors-create.component';
import { AuthorsUpdateComponent } from './authors/authors-update.component';
import { AuthorsViewComponent } from './authors/authors-view.component';
import { BooksComponent } from './books/books.component';
import { BooksCreateComponent } from './books/books-create.component';
import { DatePipe } from '../pipes/date.pipe';
import { BooksUpdateComponent } from './books/books-update.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsCreateComponent } from './clients/clients-create.component';
import { ClientsUpdateComponent } from './clients/clients-update.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsCreateComponent } from './transactions/transactions-create.component';
import { TransactionsUpdateComponent } from './transactions/transactions-update.component';
import { RentalsComponent } from './rentals/rentals.component';
import { RentalsCreateComponent } from './rentals/rentals-create.component';
import { RentalsUpdateComponent } from './rentals/rentals-update.component';
import { HighlightDirective } from '../directives/highlight/highlight.directive';



@NgModule({
  declarations: [AuthorsComponent, AuthorsCreateComponent, AuthorsUpdateComponent, AuthorsViewComponent,
    BooksComponent, BooksCreateComponent, DatePipe, BooksUpdateComponent,
    ClientsComponent, ClientsCreateComponent, ClientsUpdateComponent,
    TransactionsComponent, TransactionsCreateComponent, TransactionsUpdateComponent,
    RentalsComponent, RentalsCreateComponent, RentalsUpdateComponent, HighlightDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule
  ]
})
export class ContentModule { }
