import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GitDataService } from 'src/services/data/gitData/git-data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private dataService:GitDataService) { }

  getUsers(query:string, page:number, pageSize:number){
    return this.dataService.getUsers(query, page, pageSize)
      .pipe(
        map(res => {
          res['items'].filter(data => data.avatar = data.avatar_url);
          res['items'].filter(data => data.repo = data.repos_url);
          res['items'].filter(data => data.profile = data.html_url);
          res['items'].filter(data => data.username = data.login);
          return res;
        })
      );
    }
}
