import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitDataService {
  
  private baseURI = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  
  getUsers(query:string, pageSize:number, page:number){
    return this.http.get<any>(`${this.baseURI}?q=${query}&per_page=${pageSize}&page=${page}`).pipe(
      map(res => {
        return res;
      })
    );
  }


}
