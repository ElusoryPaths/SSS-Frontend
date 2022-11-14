import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import User from './User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = "https://sss-backend.vercel.app"
  constructor(private http: HttpClient) { }

  public getUser(): User {
    let user: User = new User();
    user.name = localStorage.getItem('name') || undefined;
    user.email = localStorage.getItem('email') || undefined;
    user.username = localStorage.getItem('username') || undefined;
    return user;
  }

  public setUser(user: User): void {
    localStorage.setItem('username', user.username || "");
    localStorage.setItem('email', user.email || "");
    localStorage.setItem('name', user.name || "");
  }
}