import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

type Options = {
  headers: HttpHeaders,
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  post(url: string, bodyObj?: any): Observable<any> {
    url = (() => {
      const isDev = location.host === 'localhost:4200';
      const host = isDev ? 'http://localhost:8080' : '';
      return host + url;
    })();
    const body: string = bodyObj ? new HttpParams({ fromObject: bodyObj }).toString() : '';
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options: Options = { headers: headers };
    return this.httpClient.post(url, body, options)
      .pipe(
        catchError(e => {
          let msg: string = 'unknown error';
          if (e.status === 0) {
            msg = 'client error message: ' + e.error.message;
          } else {
            if (e.status === 500) {
              msg = 'server error message: ' + e.error.message;
            } else {
              msg = 'server error message: ' + e.error.error;
            }
          }
          alert(msg);
          console.log(e.error);
          throw msg;
        })
      );
  }

  postJson(url: string, body?: any): Observable<any> {
    url = (() => {
      const isDev = location.host === 'localhost:4200';
      const host = isDev ? 'http://localhost:8080' : '';
      return host + url;
    })();
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    const options: Options = { headers: headers };
    return this.httpClient.post(url, body, options)
      .pipe(
        catchError(e => {
          let msg: string = 'unknown error';
          if (e.status === 0) {
            msg = 'client error message: ' + e.error.message;
          } else {
            if (e.status === 500) {
              msg = 'server error message: ' + e.error.message;
            } else {
              msg = 'server error message: ' + e.error.error;
            }
          }
          alert(msg);
          console.log(e.error);
          throw msg;
        })
      );
  }

}
