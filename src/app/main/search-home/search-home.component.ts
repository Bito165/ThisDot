import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from 'src/services/business/search/search.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  searchResults: Array<any> = [];
  noResults:boolean = false;
  nextCheck:boolean = true;
  previousCheck:boolean = true;
  totalCount:number = 0;
  minimum:number = 1;
  displayedMinimum:number = 0
  displayedMaximum:number = 0
  maximum:number = 0;
  pageSize:number = 4;
  page:number = 1;
  query:string;
  searched:boolean = false;
  constructor(private searchService:SearchService) { }

  ngOnInit() {
  }

  searchUsers(form:NgForm){
    this.query = form.value.parameter;
    form.reset();
    this.getUsers();
  }

  previous(){
    this.page = +this.page - 1;
    this.maximum = +this.maximum - 4
    this.minimum = +this.minimum - 4
    this.checkUpperLimit();
    this.checkLowerLimit();
    this.getUsers();
  }

  next(){
    this.page = +this.page + 1;
    this.maximum = +this.maximum + 4;
    this.minimum = +this.minimum + 4;
    this.checkUpperLimit();
    this.checkLowerLimit();
    this.getUsers();
  }

  checkUpperLimit(){
    const upperLimit = this.maximum + 4;

    if(upperLimit > this.totalCount || upperLimit == this.totalCount){
      this.nextCheck = true;
    }else{
      this.nextCheck = false;
    }
  }

  checkLowerLimit(){
    const lowerLimit = this.minimum - 4;

    if(lowerLimit < 0 || lowerLimit == 0){
      this.previousCheck = true;
    }else{
      this.previousCheck = false;
    }
  }

  getUsers(){
    this.searchService.getUsers(this.query, this.pageSize, this.page).subscribe(
      res => {
        this.searched = true;
        this.searchResults = res['items'];
        this.totalCount = res['total_count'];
        if(this.page == 1){
          this.checkCount()
        }
      }
    )
  }

  checkCount(){
    if(this.totalCount == 0 || this.searchResults.length == 0){
      this.noResults = true;
    }else{
      this.noResults = false;
      this.checkMax();
    }
  }

  checkMax(){
    if(this.totalCount > 4){
      this.minimum = 1;
      this.maximum = this.pageSize;
      this.checkUpperLimit();
    }else{
      this.minimum = 1;
      this.maximum = this.totalCount; 
    }
  }

}
