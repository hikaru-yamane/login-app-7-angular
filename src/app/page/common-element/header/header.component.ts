import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = '';
  private subscription: Subscription;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private userService: UserService,
  ) {
    this.subscription = this.userService.userObservable.subscribe(user => {
      this.userName = user.name;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  logout(): void {
    const url: string = '/logout';
    this.httpService.post(url)
      .subscribe({
        next: data => {
          this.userService.logout();
          this.router.navigateByUrl('/logout');
        },
        error: err => {
        },
      });
  }

}
