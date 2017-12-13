import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
@Component({
  selector: 'app-http-status',
  templateUrl: './http-status.component.html',
  styleUrls: ['./http-status.component.scss']
})
export class HttpStatusComponent implements OnInit {

  result: string;

  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  getNoContent() {
    const apiUrl = 'api/HttpStatus/NoContent';
    this.http.get(apiUrl)
    .subscribe(result => {
      this.result = 'OK';
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        console.log(`Backend return code ${err.status}, body was: ${err.error}`);
      }

    });
  }
}
