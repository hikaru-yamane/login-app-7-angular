import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteService } from 'src/app/service/complete.service';
import { HttpService } from 'src/app/service/http.service';

type Body = {
  imageSrc: string,
};

@Component({
  selector: 'app-p06-image',
  templateUrl: './p06-image.component.html',
  styleUrls: ['./p06-image.component.scss']
})
export class P06ImageComponent implements OnInit {
  imageSrc: string = '';

  constructor(
    private router: Router,
    private httpService: HttpService,
    private completeService: CompleteService,
  ) { }

  ngOnInit(): void {
  }

  display(event: any): void {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imageSrc = reader.result!.toString();
    };
  }
  
  register(): void {
    if (!this.imageSrc) {
      alert('画像を選択してください。');
      return;
    }
    const url: string = '/image/register';
    const body: Body = {
      imageSrc: this.imageSrc,
    };
    this.httpService.postJson(url, body)
      .subscribe({
        next: data => {
          console.log(data);
          this.completeService.complete({
            message: '画像を登録しました。',
            imageSrc: data.imageSrc,
          });
          this.router.navigateByUrl('/complete');
        },
        error: err => {
        },
      });
  }

}
