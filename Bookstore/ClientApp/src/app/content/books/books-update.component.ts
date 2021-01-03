import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Authors } from '../authors/authors.component';
import { Books } from './books.component';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.css']
})
export class BooksUpdateComponent implements OnInit, OnChanges {

  public bookForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    publicationDate: [null],
    price: ['', Validators.required],
    authorIndex: ['', Validators.required]
  });

  authors: Authors[];

  @Input() bookToUpdate: Books;
  @Input() showComponent: boolean;
  @Output() updatedBook = new EventEmitter<Books>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getAuthors();
  }

  ngOnChanges() {
    let authorIndex: number;
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].id === this.bookToUpdate.authorId) {
        authorIndex = i;
        break;
      }
    }

    this.bookForm.get('id').setValue(this.bookToUpdate.id);
    this.bookForm.get('title').setValue(this.bookToUpdate.title);
    this.bookForm.get('publicationDate').setValue(this.bookToUpdate.publicationDate);
    this.bookForm.get('price').setValue(this.bookToUpdate.price);
    this.bookForm.get('authorIndex').setValue(authorIndex);
  }

  getAuthors() {
    this.apiService.get('author').subscribe(data => {
      this.authors = data.map((author) => {
        return <Authors>{ id: author.id, name: author.name };
      });
    });
  }

  updateBook() {
    const result = <Books>{
      id: this.bookForm.value.id,
      title: this.bookForm.value.title,
      publicationDate: this.bookForm.value.publicationDate,
      price: this.bookForm.value.price,
      authorId: this.bookForm.value.authorId,
    };
    this.updatedBook.emit(result);
  }

  close() {
    this.hideForm.emit(false);
  }
}
