import { Component, OnInit, ViewChild } from '@angular/core';

import {LocalApiService} from './../local-api.service';
import {ServerApiService} from './../server-api.service';
import {Data, User} from './../data';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'picture'];
  dataSource: any;

  pageSizeOptions: number[] = [10, 20, 30, 50];

  dataResponse: Data = {
    data: null,
    total: 100,
    page: 0,
    limit: 10,
    offset: 0
  }

  isLoadingResults = true;
  guid = null;

  filter = {
    pageIndex: 0,
    pageSize: 10
  };

  isOnline = true;

  @ViewChild(MatSort, null) sort: MatSort;

  constructor(
    private localApiService: LocalApiService,
    private serverApiService: ServerApiService,
  ){}

  ngOnInit(){
    this.refreshUsers(0, 10);
  }

  refreshFilter(event?:PageEvent){

    this.filter = event;
    console.log(this.filter);
    this.refreshUsers(event.pageIndex, event.pageSize);
  }

  refreshUsers(pageIndex: number, pageSize: number){

    this.isLoadingResults = true;

    if(this.isOnline){
      this.serverApiService.getUsers(pageIndex, pageSize).subscribe(
        (data: Data) => {
              this.dataResponse = data;
              this.dataSource = new MatTableDataSource(data.data);
              this.dataSource.sort = this.sort;
              this.isLoadingResults = false;
            },
        error => {
          console.log('error');
          this.isLoadingResults = false;
          this.isOnline = false;
          this.refreshUsers(this.filter.pageIndex, this.filter.pageSize);
        }
      )
    } else{
      // Offline Mod, делал для себя
      this.localApiService.getLocalUserc().subscribe(
        (data: Data) => {
          this.dataResponse = data;
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.sort = this.sort;
          this.isLoadingResults = false;
        },
        error => {
          console.log('error');
          this.isLoadingResults = false;
        }
      )
    }



  }

  createXmlReport(){
    this.isLoadingResults = true;
    this.serverApiService.createXMLReport(this.filter.pageIndex, this.filter.pageSize).subscribe(
      guid => {
        this.guid = guid;
        this.isLoadingResults = false;
        $(".alert").fadeIn("slow");
        setTimeout(() => {
          $(".alert").fadeOut("slow");
        }, 2000);
      },
      error => {
        console.log('error');
        this.isLoadingResults = false;
      }
    )
  }

  
  createTxtReport(){
    this.isLoadingResults = true;
    this.serverApiService.createTxtReport(this.filter.pageIndex, this.filter.pageSize).subscribe(
      guid => {
        this.guid = guid;
        this.isLoadingResults = false;
        $(".alert").fadeIn("slow");
        setTimeout(() => {
          $(".alert").fadeOut("slow");
        }, 2000);
      },
      error => {
        console.log('error');
        this.isLoadingResults = false;
      }
    )
  }

}
