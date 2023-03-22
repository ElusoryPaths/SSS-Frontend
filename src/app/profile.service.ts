import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import User from './User';
import Address from './Address';
import { Observable } from 'rxjs';

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


    if (user.accountType == "buyer") {
      user.address = this.getAddress()
    }
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

    if (user.address) this.setAddress(user.address)
  }

  public setAddress(addr: Address) {
    localStorage.setItem('nickname', addr.nickname || "");
    localStorage.setItem('addressLine1', addr.addressLine1 || "");
    localStorage.setItem('addressLine2', addr.addressLine2 || "");
    localStorage.setItem('city', addr.city || "");
    localStorage.setItem('postalCode', addr.postalCode || "");
    localStorage.setItem('province', addr.province || "");
    localStorage.setItem('country', addr.country || "");
  }

  public getAddress(): Address {
    let address = new Address()
    address.addressLine1 = localStorage.getItem('addressLine1') || undefined;
    address.addressLine2 = localStorage.getItem('addressLine2') || undefined;
    address.city = localStorage.getItem('city') || undefined;
    address.postalCode = localStorage.getItem('postalCode') || undefined;
    address.province = localStorage.getItem('province') || undefined;
    address.country = localStorage.getItem('country') || undefined;
    return address
  }


  public refreshUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/fetch/${email}`)
  }

  public deleteWish(email: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/wishlist/${email}/${id}`)
  }

}