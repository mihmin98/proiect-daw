import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptors/request-interceptors';
import { RouterModule, CanActivate } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatListModule, MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from './api/api.service';
import { ContentModule } from './content/content.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthorsComponent } from './content/authors/authors.component';
import { AuthorsCreateComponent } from './content/authors/authors-create.component';
import { BooksComponent } from './content/books/books.component';
import { BooksCreateComponent } from './content/books/books-create.component';
import { ClientsComponent } from './content/clients/clients.component';
import { ClientsCreateComponent } from './content/clients/clients-create.component';
import { TransactionsComponent } from './content/transactions/transactions.component';
import { TransactionsCreateComponent } from './content/transactions/transactions-create.component';
import { RentalsComponent } from './content/rentals/rentals.component';
import { RentalsCreateComponent } from './content/rentals/rentals-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthModule,
    ContentModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]  },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
      { path: 'authors/add', component: AuthorsCreateComponent, canActivate: [AuthGuard]  },
      { path: 'books', component: BooksComponent, canActivate: [AuthGuard]  },
      { path: 'books/add', component: BooksCreateComponent, canActivate: [AuthGuard]  },
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]  },
      { path: 'clients/add', component: ClientsCreateComponent, canActivate: [AuthGuard]  },
      { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]  },
      { path: 'transactions/add', component: TransactionsCreateComponent, canActivate: [AuthGuard]  },
      { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard]  },
      { path: 'rentals/add', component: RentalsCreateComponent, canActivate: [AuthGuard]  },
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [ApiService, { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
