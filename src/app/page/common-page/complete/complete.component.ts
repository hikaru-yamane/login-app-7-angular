import { Component, OnInit } from '@angular/core';
import { CompleteService } from 'src/app/service/complete.service';

type Result = {
  message: string,
  imageSrc?: string,
};

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  result: Result;

  constructor(
    private completeService: CompleteService,
  ) {
    this.result = this.completeService.getResult();
  }

  ngOnInit(): void {
  }

}
