import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from './Product';
import Review from './Review';

const localStorage = require('local-storage-json');

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://sss-backend.vercel.app";

  constructor(private http: HttpClient) { }

  public getRecentProducts(): Observable<any> {
    return this.http.get<Array<Product>>(`${this.apiUrl}/products/recent`)
  } 

  public getProductById(id: string): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`)
  }

  public addProductById(id: string, review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/product/${id}/addreview`, review)
  }

  public addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/product`, product)
  }

  public addProductToWish(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/add/wishlist`, obj)
  } 

  public deleteProductFromWish(mail: any, id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/wishlist/${mail}/${id}`)
  } 

  public addToView(id: string, numViews = 1): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/${id}/addview/`, {})
  }

  public addToViewCart(id: string, numViews = 1): Observable<any> {
    return this.http.put(`${this.apiUrl}/product/${id}/addviewcart/`, {})
  }

  public getSellerProducts(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/seller/${username}/products/`)
  }

  public removeProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/product/${id}/`)
  }

  public addToCart(product: Product): void {
    let cartArr = this.getCart();
    let productObj = {
      product: product,
      count: 1
    }
    
    if (cartArr) {
      let updated = false

      cartArr.forEach((productInCart: any) => {
        if (productInCart.product.id == product.id) {
          productInCart.count += 1
          this.updateCart(cartArr);
          updated = true
        }
      })

      if (!updated) {
        cartArr.push(productObj)
        this.updateCart(cartArr);
      }
    } else {
      cartArr.push(productObj)
      this.updateCart(cartArr);
    }
    
    console.log(this.getCart());
  }

  public getCart() {
    return localStorage.get('cart') || [];
  }

  public updateCart(products: any) {
    localStorage.set('cart', products);
  }

  public removeItemFromCart(index: number) {
    let cart = this.getCart();
    cart.splice(index, 1);
    this.updateCart(cart);
  }

  
}
