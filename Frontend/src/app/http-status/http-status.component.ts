import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private GetRequest(apiUrl: string): void {
    const date = new Date();
    this.http.get(apiUrl)
      .subscribe(result => {
        this.result = `${date}, OK`;
      },
      (err: HttpErrorResponse) => {
        this.result = '';
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend return code ${err.status}, body was: ${err.error}`);
        }
      });
  }
  // Backend return code 200, body was: [object Object]
  // 當HttpStatus為200時, 傳回的資料如果不是Json會算是錯誤
  getOKJson() {
    this.GetRequest('api/HttpStatus/OKJson');
  }
  getOKTextError() {
    this.GetRequest('api/HttpStatus/OKText');
  }
  getOKTextOK() {
    const apiUrl = 'api/HttpStatus/OKText';
    const date = new Date();
    this.http.get(apiUrl, {responseType: 'text'})
      .subscribe(result => {
        this.result = `${date}, OK`;
      },
      (err: HttpErrorResponse) => {
        this.result = '';
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend return code ${err.status}, body was: ${err.error}`);
        }
      });
  }
  getAccepted() {
    this.GetRequest('api/HttpStatus/Accepted');
  }
  // 204, OK
  getNoContent() {
    this.GetRequest('api/HttpStatus/NoContent');
  }
  // Backend return code 404, body was: null
  getNotFound() {
    this.GetRequest('api/HttpStatus/NotFound');
  }
  // Backend return code 400, body was: null
  getBadRequest() {
    this.GetRequest('api/HttpStatus/BadRequest');
  }
  // Backend return code 500, body was: null
  getException() {
    this.GetRequest('api/HttpStatus/Exception');
  }
}
