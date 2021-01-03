import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from './clients.component';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients-create.component.css']
})
export class ClientsCreateComponent implements OnInit {

  public clientForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private apiService: ApiService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  createClient() {
    const client = <Clients>{
      name: this.clientForm.value.name,
      email: this.clientForm.value.email,
    };

    this.apiService.post('client', client)
      .subscribe(result => this.router.navigateByUrl('clients'));
  }
}
