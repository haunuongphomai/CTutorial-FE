import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7171/api/Users/';
  constructor(private http: HttpClient) {}

  signUp(users: any) {
    return this.http.post<any>(`${this.baseUrl}register`, users);
  }

  signIn(users: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, users);
  }
}
