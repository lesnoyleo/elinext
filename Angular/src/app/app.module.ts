import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';

import { MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatSelectModule } from '@angular/material';
import { UglifytableComponent } from './uglifytable/uglifytable.component';

const appRoutes: Routes =[
  { path: 'table', component: TableComponent},
  { path: 'uglifytable', component: UglifytableComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    UglifytableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule, MatSelectModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
