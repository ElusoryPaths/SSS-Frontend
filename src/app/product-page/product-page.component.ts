import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import Product from '../Product';
import { ProductService } from '../product.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  querySub: Subscription[] = [];
  id: string = "";
  product!: Product;
  wished: boolean = false;
  success: string = "";

  constructor(private route: ActivatedRoute,
    private productServ: ProductService,
    private router: Router,
    private profServ: ProfileService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.querySub.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id') || ""
      })
    )
    if (this.id) {
      this.querySub.push(
        this.productServ.getProductById(this.id).subscribe({
          next: (success) => {
            if (success.message) {
              this.router.navigate(['**'], { skipLocationChange: true })
            } else {
              this.product = success;
            }

          },
          error: (error) => {
            console.error(error)
          }
        })
      )
    }
    this.querySub.push(
      this.productServ.addToView(this.id).subscribe({
        next: (success) => { 
          console.log(success) 
          console.log('view added')
        },
        error: (error) => { console.error(error) }
      })
    )
    
    let mail = localStorage.getItem('email') || ""
    this.profServ.refreshUser(mail).subscribe({
      next: (success) => { 
        for (let item of success.wishlist) {
          if (item.id == this.product.id) this.wished = true
        }
       },
      error: (error) => { console.error(error) }
    })
  }

  addWish() {
    let mail = localStorage.getItem('email') || ""
    let found = false;
    this.profServ.refreshUser(mail).subscribe({
      next: (success) => { 
        for (let item of success.wishlist) {
          if (item.id == this.product.id) found = true;
        }
       },
      error: (error) => { console.error(error) }
    })
    if (found) return;
    
    let wishItem = {
      email: mail,
      product: this.product
    }
    this.querySub.push(
      this.productServ.addProductToWish(wishItem).subscribe({
        next: (success) => {
          console.log(success)
          let mail = localStorage.getItem('email')
          if (mail) this.querySub.push(
            this.profServ.refreshUser(mail).subscribe({
              next: (success) => { 
                this.profServ.setUser(success) 
                this.wished = true
              },
              error: (error) => { console.error(error) }
            })
          )
        },
        error: (error) => { console.error(error) }
      }))
  }

  removeWish() {
    let mail = localStorage.getItem('email') || ""
    let id = this.product.id
    
    this.querySub.push(
      this.productServ.deleteProductFromWish(mail, id).subscribe({
        next: (success) => {
          console.log(success)
          let mail = localStorage.getItem('email')
          if (mail) this.querySub.push(
            this.profServ.refreshUser(mail).subscribe({
              next: (success) => { 
                this.profServ.setUser(success)
                this.wished = false
              },
              error: (error) => { console.error(error) }
            })
          )
        },
        error: (error) => { console.error(error) }
      }))
  }

  addToCart(product: Product) {
    this.productServ.addToCart(product)
    this.querySub.push(
      this.productServ.addToViewCart(this.id).subscribe({
        next: (success) => { 
          console.log(success) 
          console.log('cart view added')
          this.success = "Successfully Added To Cart!"
          setTimeout(() => {
            this.success = ""
          }, 2000);
        },
        error: (error) => { console.error(error) }
      })
    )
  }
}
