import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private readonly endpoint = 'client';

  clients: Clients[];
  clientToUpdate: Clients;

  showUpdateComponent = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.apiService.get(this.endpoint).subscribe(data => {
      this.clients = data.map((client) => {
        return <Clients>{ id: client.id, name: client.name, email: client.email };
      });
    });
  }

  getClient(id: number) {
    return this.apiService.get(this.endpoint + '/' + id);
  }

  viewClient(client: Clients) {
    this.router.navigate(['clientss/view', client.id]);
  }

  addClient() {
    this.router.navigateByUrl('clients/add');
  }

  deleteClient(client: Clients) {
    this.apiService.delete(this.endpoint + '/' + client.id).subscribe(() => this.getClients());
  }

  editClient(client: Clients) {
    this.showUpdateComponent = true;
    this.clientToUpdate = client;
  }

  updateClient(client: Clients) {
    this.apiService.put(this.endpoint, client)
      .subscribe(() => this.getClients());
  }

  hideUpdateForm(value: boolean) {
    this.showUpdateComponent = false;
  }
}

export interface Clients {
  id: number;
  name: string;
  email: string;
}
