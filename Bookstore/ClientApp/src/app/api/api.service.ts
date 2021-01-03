import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  get<T>(path: string, params = {}): Observable<any> {
    return this.http.get<T>(this.baseUrl + path, params);
  }

  put<T>(path: string, body: object = {}): Observable<any> {
    return this.http.put<T>(this.baseUrl + path, body);
  }

  post<T>(path: string, body: object): Observable<any> {
    return this.http.post<T>(this.baseUrl + path, body);
  }

  delete<T>(path: string): Observable<any> {
    return this.http.delete<T>(this.baseUrl + path);
  }
}
