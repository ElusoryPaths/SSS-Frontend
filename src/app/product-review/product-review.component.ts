import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { ProfileService } from '../profile.service';
import Review from '../Review';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit, OnDestroy {
  warning!: string;

  @Input() reviews!: Array<Review>;
  @Input() id!: string;
  newReview: Review = new Review();
  querySub: Subscription[] = [];

  constructor(private profServ: ProfileService, private auth: AuthService, private prodServ: ProductService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.warning = ""
    if (!this.reviews) this.reviews = []
  }

  onSubmit(form: NgForm) {
    if (!this.auth.readToken()) {
      this.warning = "Please log in to continue";
      return;
    }

    let user = this.profServ.getUser()

    for (let review of this.reviews) {
      if (review.user == user.username) {
        this.warning = "You have already added a review";
        return;
      }
    }

   
    let date = new Date()

    this.newReview.user = user.username
    this.newReview.date = date.toISOString().split('T')[0]
    console.log(this.newReview)

    this.querySub.push(
      this.prodServ.addProductById(this.id, this.newReview).subscribe({
        next: (res) => { 
          console.log(res) 
          this.reviews.push(this.newReview)
        },
        error: (err) => { console.log(err) }
      })
    )
  }

}
