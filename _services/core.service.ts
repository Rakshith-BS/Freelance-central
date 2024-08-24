import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';


export class CoreApi {

  constructor(
    protected http: HttpClient
  ) {} 
  
  getHeaders(token: boolean=true): HttpHeaders {
    return new HttpHeaders()
    .set('content-type', 'application/json;')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', token ? this.getToken() : '');
  }

  getApiBaseUrl(): any {
      return environment.apiUrl;
  }

  getToken(): string {
      const userObj =  (JSON.parse(localStorage.getItem('user'))) as User;
      if (userObj) {
          return 'Bearer '  + userObj.accessToken;
      }
      return '';
  }

  // call POST method in core
  post(url: string, body?: any, token?: boolean, header: any=null): Observable<any> {
    let header_ = header
    if (header_ == null) {
      header_ = { 
        headers: header? header : this.getHeaders(token)
      }
    }
    return this.http.post(this.getApiBaseUrl() + url, body, header_);
  }

  // call GET method in core
  get(url: string, token: boolean=true, header: any=null): Observable<any> {
    let header_ = header
    if (header_ == null) {
      header_ = { 
        headers: header? header : this.getHeaders(token)
      }
    }
    return this.http.get(this.getApiBaseUrl() + url, header_);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.getApiBaseUrl() + url, {headers: this.getHeaders()});
  }

  downloadFile(url: string): any{
    return this.http.get(url, { responseType: 'blob'});
  }
}