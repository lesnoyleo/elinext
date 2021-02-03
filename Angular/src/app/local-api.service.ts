import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalApiService {

  constructor(
    private http: HttpClient
  ) {
    // this.getLocalUserc().subscribe(data=>{
    //   console.log(data);
    // })
   }

  getLocalUserc(): Observable<any>{
    return this.http.get('../assets/localData.json');
  }
}
