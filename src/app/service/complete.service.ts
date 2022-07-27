import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Result = {
  message: string,
  imageSrc?: string,
};

@Injectable({
  providedIn: 'root'
})
export class CompleteService {
  private resultSubject: BehaviorSubject<Result>;

  constructor() {
    this.resultSubject = new BehaviorSubject<Result>({
      message: '',
    });
  }

  complete(result: Result): void {
    this.resultSubject.next(result);
    sessionStorage.setItem('result', JSON.stringify(result));
  }

  refresh(): void {
    const result: Result = this.resultSubject.getValue();
    const resultJson: string | null = sessionStorage.getItem('result');
    if (!result.message && resultJson) {
      const result: Result = JSON.parse(resultJson);
      this.resultSubject.next(result);
    }
  }

  getResult(): Result {
    const result: Result = this.resultSubject.getValue();
    return result;
  }
}
