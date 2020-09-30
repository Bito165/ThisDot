import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { ServicesModule } from 'src/services/services.module';
import { UserCardComponent } from './user-card/user-card.component';



@NgModule({
  declarations: [AlertComponent, LoaderComponent, UserCardComponent],
  imports: [
    CommonModule,
    ServicesModule
  ],
  exports: [AlertComponent, LoaderComponent, UserCardComponent]
})
export class SharedModule { }
