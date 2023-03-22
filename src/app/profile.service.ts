import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import User from './User';
import Address from './Address';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = "https://sss-backend.vercel.app"
  constructor(private http: HttpClient) { }

  public getUser(): User {
    let user: User = new User();
    user.address = new Address();

    user.accountType = localStorage.getItem('accountType') || undefined;
    user.firstName = localStorage.getItem('firstName') || undefined;
    user.lastName = localStorage.getItem('lastName') || undefined;
    user.phoneNumber = localStorage.getItem('phoneNumber') || undefined;
    user.name = localStorage.getItem('name') || undefined;
    user.email = localStorage.getItem('email') || undefined;
    user.username = localStorage.getItem('username') || undefined;

    user.address.addressLine1 = localStorage.getItem('addressLine1') || undefined;
    user.address.addressLine2 = localStorage.getItem('addressLine2') || undefined;
    user.address.city = localStorage.getItem('city') || undefined;
    user.address.postalCode = localStorage.getItem('postalCode') || undefined;
    user.address.province = localStorage.getItem('province') || undefined;
    user.address.country = localStorage.getItem('country') || undefined;
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

    localStorage.setItem('nickname', user.address.nickname || "");
    localStorage.setItem('addressLine1', user.address.addressLine1 || "");
    localStorage.setItem('addressLine2', user.address.addressLine2 || "");
    localStorage.setItem('city', user.address.city || "");
    localStorage.setItem('postalCode', user.address.postalCode || "");
    localStorage.setItem('province', user.address.province || "");
    localStorage.setItem('country', user.address.country || "");
  }
}