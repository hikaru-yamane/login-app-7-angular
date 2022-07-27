import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

type Body = {
  email: string,
  password: string,
};

@Component({
  selector: 'app-p01-login',
  templateUrl: './p01-login.component.html',
  styleUrls: ['./p01-login.component.scss']
})
export class P01LoginComponent implements OnInit {
  form: FormGroup;
  authErrFlg: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private userService: UserService,
  ) {
    // this.form = new FormGroup({
    //   'email': new FormControl('', [
    //     Validators.required,
    //     Validators.email,
    //   ]),
    //   'password': new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(8),
    //   ]),
    // });
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    });
  }

  ngOnInit(): void {
  }

  login(body: Body = this.form.value, autoLoginFlg: boolean = false): void {
    if (!autoLoginFlg && this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty();
      });
      return;
    }
    const url: string = '/authenticate';
    this.httpService.post(url, body)
      .subscribe({
        next: data => {
          this.userService.login(data);
          this.router.navigateByUrl('/home');
        },
        error: err => {
          this.authErrFlg = true;
        },
      });
  }

  loginAsGuest(): void {
    const body: Body = {
      email: 'guest@domain',
      password: '74937484',
    };
    const autoLoginFlg: boolean = true;
    this.login(body, autoLoginFlg);
  }

  loginAsAdmin(): void {
    const body: Body = {
      email: 'admin@domain',
      password: '74937484',
    };
    const autoLoginFlg: boolean = true;
    this.login(body, autoLoginFlg);
  }

}
