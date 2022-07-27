import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompleteService } from './service/complete.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private completeService: CompleteService,
  ) {}

  ngOnInit(): void {
    this.userService.refresh();
    this.completeService.refresh();
  }

  ngOnDestroy(): void {}

}
