import { Component, OnInit } from '@angular/core';
import {LocalApiService} from './../local-api.service';
import {ServerApiService} from './../server-api.service';
import {Data, User} from './../data';

@Component({
  selector: 'app-uglifytable',
  templateUrl: './uglifytable.component.html',
  styleUrls: ['./uglifytable.component.css']
})
export class UglifytableComponent implements OnInit {

  pageSizeOptions: number[] = [10, 20, 30, 50];
  countPages: number[] = [1]
  currentPageSize: number = 10;
  tableSource: User[];

  filter = {
    pageIndex: 0,
    pageSize: 10
  };

  test: any;

  dataResponse: Data = {
    data: null,
    total: 100,
    page: 0,
    limit: 10,
    offset: 0
  }

  constructor(
    private localApiService: LocalApiService,
    private serverApiService: ServerApiService,
  ) { }

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers(){
      this.serverApiService.getUsers(this.filter.pageIndex, this.filter.pageSize).subscribe(
        (data: Data) => {
              this.dataResponse = data;
              let calculateCountPages = Math.floor(data.total / data.limit);
              this.countPages = [];
              for (let index = 0; index < calculateCountPages-1; index++) {
                this.countPages.push(index + 1); 
              }
        },
        error => {
          console.log('error');
        }
      )
  }

  pageSizeChoose(){
    console.log(this.filter);
    this.refreshUsers();
  }

  choosePage(index: number){
    this.filter.pageIndex = index;
    this.refreshUsers();
  }

  createXmlReport(){
    this.serverApiService.createXMLReport(this.filter.pageIndex, this.filter.pageSize).subscribe(
      guid => {
      },
      error => {
        console.log('error');

      }
    )
  }

  
  createTxtReport(){
    this.serverApiService.createTxtReport(this.filter.pageIndex, this.filter.pageSize).subscribe(
      guid => {
      },
      error => {
        console.log('error');
      }
    )
  }

  sortByFirsName(){
    this.dataResponse.data.sort((a,b)=> (a.firstName > b.firstName) ? 1: -1);
  }

  sortByLastName(){
    this.dataResponse.data.sort((a,b)=> (a.lastName > b.lastName) ? 1: -1);
  }

  sortByEmail(){
    this.dataResponse.data.sort((a,b)=> (a.email > b.email) ? 1: -1);
  }

}
