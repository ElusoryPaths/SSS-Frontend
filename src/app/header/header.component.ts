import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  token: any;
  accountType: string | null = "";
  querySub: Subscription[] = [];

  constructor(private router: Router, private auth: AuthService) { }

  ngOnDestroy(): void {
    this.querySub.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.querySub.push(this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    }));
    this.querySub.push(this.router.events.subscribe((event: Event) => { this.accountType = localStorage.getItem('accountType') }))
    this.accountType = localStorage.getItem('accountType')
  }

  onSignout(): void {
    this.auth.clearSession();
    this.router.navigate(['/']);
    console.log('session cleared')
  }
}
