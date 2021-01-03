import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Authors } from '../authors/authors.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private readonly endpoint = 'book';

  books: Books[];
  bookToUpdate: Books;

  showUpdateComponent = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.apiService.get(this.endpoint).subscribe(data => {
      this.books = data.map((book) => {
        return <Books>{
          id: book.id,
          title: book.title,
          publicationDate: book.publicationDate,
          price: book.price,
          authorId: book.authorId,
          author: book.author,
        };
      });
    });
  }

  getBook(id: number) {
    return this.apiService.get(this.endpoint + '/' + id);
  }

  addBook() {
    this.router.navigateByUrl('books/add');
  }

  deleteBook(book: Books) {
    this.apiService.delete(this.endpoint + '/' + book.id).subscribe(() => this.getBooks());
  }

  editBook(book: Books) {
    this.showUpdateComponent = true;
    this.bookToUpdate = book;
  }

  updateBook(book: Books) {
    this.apiService.put(this.endpoint, book).subscribe(() => this.getBooks());
  }

  hideUpdateForm(value: boolean) {
    this.showUpdateComponent = false;
  }
}

export interface Books {
  id: number;
  title: string;
  publicationDate: Date;
  price: number;
  authorId: number;
  author: Authors;
}
