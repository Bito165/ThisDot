import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SearchHomeComponent } from './search-home/search-home.component';
import { MainComponent } from './main.component';
import { ServicesModule } from 'src/services/services.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [MainComponent, SearchHomeComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServicesModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
