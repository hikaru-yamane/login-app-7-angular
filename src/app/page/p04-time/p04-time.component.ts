import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

type Body = {
  userId: number,
  workType?: string,
  dateTime?: string,
};
type Time = {
  workType: string,
  dateTime: string,
};

@Component({
  selector: 'app-p04-time',
  templateUrl: './p04-time.component.html',
  styleUrls: ['./p04-time.component.scss']
})
export class P04TimeComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getTime();
  }

  getTime(): void {
    const url: string = '/time/get';
    const userId: number = this.userService.getId();
    const body: Body = {
      userId: userId,
    };
    this.httpService.postJson(url, body)
      .subscribe({
        next: data => {
          if (data.length != 0) {
            const ul = document.createElement('ul');
            data.forEach((time: Time) => {
              const li = document.createElement('li');
              li.textContent = `${time.workType} ${time.dateTime}`;
              ul.insertAdjacentElement('beforeend', li);
            });
            const div = document.getElementById('timeList');
            div!.insertAdjacentElement('beforeend', ul);
          }
        },
        error: err => {
        },
      });
  }

  registerTime(workType: string): void {
    const url: string = '/time/register';
    const userId: number = this.userService.getId();
    const dateTime: string = (() => {
      const d = new Date();
      const yyyy = d.getFullYear();
      const MM = (d.getMonth() + 1).toString().padStart(2, '0');
      const dd = d.getDate().toString().padStart(2, '0');
      const HH = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      const ss = d.getSeconds().toString().padStart(2, '0');
      const dateTime = `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
      return dateTime;
    })();
    const body: Body = {
      userId: userId,
      workType: workType,
      dateTime: dateTime,
    };
    this.httpService.postJson(url, body)
      .subscribe({
        next: data => {
          const div = document.getElementById('timeList');
          if (div!.firstElementChild) {
            const ul = div!.firstElementChild;
            const li = document.createElement('li');
            li.textContent = `${body.workType} ${body.dateTime}`;
            ul.insertAdjacentElement('beforeend', li);
          } else {
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.textContent = `${body.workType} ${body.dateTime}`;
            ul.insertAdjacentElement('beforeend', li);
            div!.insertAdjacentElement('beforeend', ul);
          }
        },
        error: err => {
        },
      });
  }

}
