import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import User from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User = new User();

  querySub: Subscription[] = [];

  constructor(private profile: ProfileService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.user = this.profile.getUser();
    this.refresh()
  }

  onDelete(id: any) {
    console.log(id)
    let mail: string = this.user.email || ""
    if (this.user) this.querySub.push(this.profile.deleteWish(mail, id).subscribe({
      next: (success) => { this.refresh() },
      error: (error) => { console.error(error) }
    }))
  }

  refresh() {
    let mail: string = this.user.email || ""
    this.querySub.push(this.profile.refreshUser(mail).subscribe({
      next: (success) => { this.user.wishlist = success.wishlist },
      error: (error) => { console.error(error) }
    }))
  }
}