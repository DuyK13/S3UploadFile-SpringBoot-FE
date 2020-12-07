import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    // "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE",
    // "Access-Control-Allow-Headers": "x-requested-with",
    // "Access-Control-Max-Age": "3600",
    // "Access-Control-Allow-Credentials": "true",
    'Content-type': 'multipart/form-data'
  })
}

interface FileResponse {
  fileName: string,
  fileURL: string
}

@Injectable({
  providedIn: 'root'
})
export class UPLOADAPIService {
  private SERVER = 'http://localhost:8089';

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  uploadFile(file: File) {
    const url = `${this.SERVER}/s3/upload`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<FileResponse>(url, formData, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }
}
