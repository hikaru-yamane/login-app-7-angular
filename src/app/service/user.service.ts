import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

type User = {
  id: number,
  name: string,
  email: string,
  roleName: string,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly initUser: User;
  private userSubject: BehaviorSubject<User>;
  userObservable: Observable<User>;

  constructor(
    private router: Router,
  ) {
    this.initUser = {
      id: -1,
      name: '',
      email: '',
      roleName: '',
    };
    this.userSubject = new BehaviorSubject<User>(this.initUser);
    this.userObservable = this.userSubject.asObservable();
  }

  login(user: User): void {
    this.userSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.userSubject.next(this.initUser);
    sessionStorage.removeItem('user');
  }

  refresh(): void {
    const userJson: string | null = sessionStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.userSubject.next(user);
    } else {
      const page: string = location.pathname;
      if (page === '/login' || page === '/logout') {
        return;
      }
      this.router.navigateByUrl('/login');
    }
  }

  getId(): number {
    const user: User = this.userSubject.getValue();
    return user.id;
  }

  getRole(): string {
    const user: User = this.userSubject.getValue();
    return user.roleName;
  }

}
