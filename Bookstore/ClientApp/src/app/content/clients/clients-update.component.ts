import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Clients } from './clients.component';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-clients-update',
  templateUrl: './clients-update.component.html',
  styleUrls: ['./clients-update.component.css']
})
export class ClientsUpdateComponent implements OnInit, OnChanges {

  public clientForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.email],
  });

  @Input() clientToUpdate: Clients;
  @Input() showComponent: boolean;
  @Output() updatedClient = new EventEmitter<Clients>();
  @Output() hideForm = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.clientForm.get('id').setValue(this.clientToUpdate.id);
    this.clientForm.get('name').setValue(this.clientToUpdate.name);
    this.clientForm.get('email').setValue(this.clientToUpdate.email);
  }

  updateClient() {
    const result = <Clients>{
      id: this.clientForm.value.id,
      name: this.clientForm.value.name,
      email: this.clientForm.value.email
    };
    this.updatedClient.emit(result);
  }

  close() {
    this.hideForm.emit(false);
  }
}
