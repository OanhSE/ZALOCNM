import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeUserRoutingModule } from './home-user-routing.module';
import { HomeUserComponent } from './home-user.component';


@NgModule({
  declarations: [HomeUserComponent],
  imports: [
    CommonModule,
    HomeUserRoutingModule
  ]
})
export class HomeUserModule { }
