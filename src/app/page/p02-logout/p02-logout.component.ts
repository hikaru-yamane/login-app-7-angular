import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p02-logout',
  templateUrl: './p02-logout.component.html',
  styleUrls: ['./p02-logout.component.scss']
})
export class P02LogoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goLogin(): void {
    this.router.navigateByUrl('/login');
  }

}
