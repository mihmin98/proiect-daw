import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Authors } from '../authors/authors.component';
import { Books } from './books.component';

@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.css']
})
export class BooksCreateComponent implements OnInit {

  public bookForm = this.fb.group({
    title: ['', Validators.required],
    publicationDate: [null],
    price: ['', Validators.required],
    authorIndex: ['', Validators.required]
  });

  authors: Authors[];

  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Load author list
    this.apiService.get('author').subscribe(data => {
      this.authors = data.map((author) => {
        return <Authors>{ id: author.id, name: author.name };
      });
    });
  }

  createBook() {
    const book = <Books>{
      title: this.bookForm.value.title,
      publicationDate: this.bookForm.value.publicationDate,
      price: this.bookForm.value.price,
      authorId: this.authors[this.bookForm.value.authorIndex].id
    };
    this.apiService.post('book', book)
      .subscribe(result => {
        this.router.navigateByUrl('books');
      });
  }
}
