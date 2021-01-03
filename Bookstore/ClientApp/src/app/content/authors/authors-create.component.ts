import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authors-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.css']
})
export class AuthorsCreateComponent implements OnInit {

  public authorForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  createAuthor() {
    this.apiService.post('author', {
      name: this.authorForm.value.name
    })
      .subscribe(result => {
        this.router.navigateByUrl('authors');
      });
  }
}
