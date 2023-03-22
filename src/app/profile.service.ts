import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import User from './User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = "https://sss-backend.vercel.app"
  constructor(private http: HttpClient) { }

  public getUser(): User {
    let user: User = new User();
    user.accountType = localStorage.getItem('accountType') || undefined;
    user.firstName = localStorage.getItem('firstName') || undefined;
    user.lastName = localStorage.getItem('lastName') || undefined;
    user.phoneNumber = localStorage.getItem('phoneNumber') || undefined;
    user.name = localStorage.getItem('name') || undefined;
    user.email = localStorage.getItem('email') || undefined;
    user.username = localStorage.getItem('username') || undefined;
    return user;
  }

  public setUser(user: User): void {
    console.log(user);
    localStorage.setItem('accountType', user.accountType || "");
    localStorage.setItem('firstName', user.firstName || "");
    localStorage.setItem('lastName', user.lastName || "");
    localStorage.setItem('phoneNumber', user.phoneNumber || "");
    localStorage.setItem('username', user.username || "");
    localStorage.setItem('email', user.email || "");
    localStorage.setItem('name', user.firstName + " " + user.lastName || "");
  }
}