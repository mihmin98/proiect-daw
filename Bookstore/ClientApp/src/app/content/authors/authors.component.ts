import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  private readonly endpoint = 'author';

  authors: Authors[];
  authorToUpdate: Authors;

  showUpdateComponent = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.apiService.get(this.endpoint).subscribe(data => {
      this.authors = data.map((author) => {
        return <Authors>{ id: author.id, name: author.name };
      });
    });
  }

  getAuthor(id: number) {
    return this.apiService.get(this.endpoint + '/' + id);
  }

  addAuthor() {
    this.router.navigateByUrl('authors/add');
  }

  deleteAuthor(author: Authors) {
    this.apiService.delete(this.endpoint + '/' + author.id).subscribe(() => this.getAuthors());
  }

  editAuthor(author: Authors) {
    this.showUpdateComponent = true;
    this.authorToUpdate = author;
  }

  updateAuthor(author: Authors) {
    this.apiService.put(this.endpoint, author)
      .subscribe(() => this.getAuthors());
  }

  hideUpdateForm(value: boolean) {
    this.showUpdateComponent = false;
  }
}

export interface Authors {
  id: number;
  name: string;
}
