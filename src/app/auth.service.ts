import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";

import User from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://bti425-jacky-blog-api.herokuapp.com"
  constructor(private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public readToken(): User | null {
    const token = localStorage.getItem('access_token');

    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use helper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    // Attempt to login
    //return this.http.post<any>(`${this.apiUrl}/api/login`, user);
  }
}