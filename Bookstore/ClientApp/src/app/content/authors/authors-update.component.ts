import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Authors } from './authors.component';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-authors-update',
  templateUrl: './authors-update.component.html',
  styleUrls: ['./authors-update.component.css']
})
export class AuthorsUpdateComponent implements OnInit, OnChanges {

  public authorForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
  });

  @Input() authorToUpdate: Authors;
  @Input() showComponent: boolean;
  @Output() updatedAuthor = new EventEmitter<Authors>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.authorForm.get('id').setValue(this.authorToUpdate.id);
    this.authorForm.get('name').setValue(this.authorToUpdate.name);
  }

  updateAuthor() {
    const result = <Authors>{
      id: this.authorForm.value.id,
      name: this.authorForm.value.name
    };
    this.updatedAuthor.emit(result);
  }

  close() {
    this.hideForm.emit(false);
  }
}
