import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Data} from './data'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  private url = "https://localhost:44345/api"; //локальный порт .NetCore приложения

  constructor(
    private http: HttpClient
  ) { }

  getUsers(pageIndex: number, pageSize: number) {
    return this.http.get(this.url + "/users?page=" + pageIndex + "&limit=" + pageSize);
  }

  createXMLReport(pageIndex: number, pageSize: number) {
    return this.http.get(this.url + "/createxmlreport?page=" + pageIndex + "&limit=" + pageSize);
  }

  createTxtReport(pageIndex: number, pageSize: number) {
    return this.http.get(this.url + "/createtxtreport?page=" + pageIndex + "&limit=" + pageSize);
  }
}
