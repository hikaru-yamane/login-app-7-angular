import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompleteService } from 'src/app/service/complete.service';
import { HttpService } from 'src/app/service/http.service';

type Body = {
  name: string,
  email: string,
  password: string,
};

@Component({
  selector: 'app-p08-user',
  templateUrl: './p08-user.component.html',
  styleUrls: ['./p08-user.component.scss']
})
export class P08UserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private completeService: CompleteService,
  ) { 
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    }, {
      validators: [
        this.customCrossValidator,
      ],
    });
  }

  ngOnInit(): void {
  }

  customCrossValidator(control: AbstractControl): ValidationErrors | null {
    const name: string = control.get('name')!.value;
    const email: string = control.get('email')!.value;
    const totalLength: number = name.length + email.length;
    if (totalLength < 2 || totalLength > 20) {
      return { 'customCrossError': true }
    }
    return null
  }

  register(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty();
      });
      return;
    }
    const url: string = '/user/register';
    const body: Body = this.form.value;
    this.httpService.postJson(url, body)
      .subscribe({
        next: data => {
          this.completeService.complete({message: 'ユーザを登録しました。'});
          this.router.navigateByUrl('/complete');
        },
        error: err => {
        },
      });
  }

}
