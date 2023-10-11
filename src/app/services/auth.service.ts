import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authUrl } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(users: any) {
    return this.http.post<any>(`${authUrl}register`, users);
  }

  signIn(users: any) {
    return this.http.post<any>(`${authUrl}login`, users);
  }
}
