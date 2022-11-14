import { Component, OnDestroy, OnInit } from '@angular/core';
import User from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router"
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public user: User = new User();
  public warning: string = "";
  querySub: Subscription[] = [];

  constructor(private auth: AuthService, private router: Router, private profile: ProfileService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {

    this.querySub.push(this.auth.login(this.user).subscribe(
      (success) => {
        this.auth.setToken(success.token);
        this.profile.setUser(success.user)
        this.router.navigate(['/']);
        console.log(success)
      },
      (err) => {
        this.warning = err.error.message;
      }
    ))

  }
}