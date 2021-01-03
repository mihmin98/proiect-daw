import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpoint = 'authentication';

  constructor(private apiService: ApiService, private router: Router) { }

  login(credentials): Observable<any> {
    return this.apiService.post<any>(`${this.endpoint}/login`, credentials).pipe(
      map((response: any) => {
        if (response != null) {
          localStorage.setItem('username', response.username);
          localStorage.setItem('jwt', response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const jwt = localStorage.getItem('jwt');

    return !!jwt;
  }

  logout(redirect: boolean = false): void {
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
    if (redirect) {
      this.router.navigate(['login']);
    }
  }

  register(user): Observable<any> {
    const registerResult = this.apiService.post<any>(`${this.endpoint}/register`, user);
    // this.router.navigate([`${this.endpoint}/login`]);
    return registerResult;
  }
}
