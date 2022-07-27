import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-p03-home',
  templateUrl: './p03-home.component.html',
  styleUrls: ['./p03-home.component.scss']
})
export class P03HomeComponent implements OnInit {
  isAdmin: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.isAdmin = this.userService.getRole() === 'ADMIN';
  }

  ngOnInit(): void {
  }

  goUser(): void {
    this.router.navigateByUrl('/user');
  }

  goTime(): void {
    this.router.navigateByUrl('/time');
  }

  goForum(): void {
    this.router.navigateByUrl('/forum');
  }

  goImage(): void {
    this.router.navigateByUrl('/image');
  }

  goMovie(): void {
    this.router.navigateByUrl('/movie');
  }

}
